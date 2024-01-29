const Hapi = require('@hapi/hapi');
const Context = require('./database/strategies/base/contextStrategy');
const MongoDB = require('./database/strategies/mongodb/mongodb');
const HeroiSchema = require('./database/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const JWT_SECRET = "68066723814071c12c9a561df38e5b84";

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect();
    const context = new Context(new MongoDB(connection, HeroiSchema));

    const swaggerOptions = {
        info: {
            title: 'API Herois - #NodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ])

    await app.start()
    console.log("Servidor rodando na porta ", app.info.port);

    return app;
}
module.exports = main();