const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || "dev";
ok(env==="prod" || env === "dev", "A env é unválida. Deve ser dev ou prod");

const configPath = join(__dirname, '../config', `.env.${env}`)
config({
    path: configPath
})

const Hapi = require('@hapi/hapi');
const Context = require('./database/strategies/base/contextStrategy');
const MongoDB = require('./database/strategies/mongodb/mongodb');
const HeroiSchema = require('./database/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const Postgres = require('./database/strategies/postgres/postgres');
const UsuarioSchema = require('./database/strategies/postgres/schemas/usuarioSchema');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const HapiJwt = require('hapi-auth-jwt2');
const JWT_SECRET = process.env.JWT_KEY;

const app = new Hapi.Server({
    port: process.env.PORT
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect();
    const context = new Context(new MongoDB(connection, HeroiSchema));

    const connectionPostgres = await Postgres.connect();
    const usuarioSchema = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
    const contextPostgres = new Context(new Postgres(connectionPostgres, usuarioSchema));

    const swaggerOptions = {
        info: {
            title: 'API Herois - #NodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: async (dado, request) => {

            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase()
            })

            if (!result) {
                return {
                    isValid: false
                }
            }

            return {
                isValid: true
            }
        }
    })
    app.auth.default('jwt');

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods())
    ])

    await app.start()
    console.log("Servidor rodando na porta ", app.info.port);

    return app;
}
module.exports = main();