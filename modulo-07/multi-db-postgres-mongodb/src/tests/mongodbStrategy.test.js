const assert = require('assert');
const MongoDb = require('../database/strategies/mongodb');
const Context = require('../database/strategies/base/contextStrategy');

const context = new Context(new MongoDb());
describe('MongoDB Suite de testes', function () {
    this.beforeAll(async function () {
        await context.connect();
    })

    it('MongoDB Connection', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado'
        assert.deepEqual(result, expected);
    })
})