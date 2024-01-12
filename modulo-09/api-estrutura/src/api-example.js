const Hapi = require('hapi');

const app = new Hapi.Server({
    port: 5000
})

async function main() {
    app.router([
        {
            path: '/herois',
            method: 'GET',
            hendler: (request, response) => {

            }
        }
    ])
}
main();