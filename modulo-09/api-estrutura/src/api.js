const Hapi = require('hapi');
const Context = require('./database/strategies/base/contextStrategy');
const MongoDB = require('./database/strategies/mongodb/mongodb');
const HeroiSchema = require('./database/strategies/mongodb/schemas/heroisSchema');

const app = new Hapi.Server({
    port: 5000
})

async function main() {
    const connection = MongoDB.connect();
    const context = new Context(new MongoDB(connection, HeroiSchema));

    app.route([
        {
            path: '/herois',
            method: 'GET',
            handler: (request, response) => {
                return context.read()
            }
        }
    ])

    await app.start()
    console.log("Servidor rodando na porta ", app.info.port);

    return app;
}
module.exports = main();