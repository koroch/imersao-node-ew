const assert = require('assert');
const MongoDb = require('../database/strategies/mongodb');
const Context = require('../database/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: "Flash",
    poder: "Velocidade"
}
const MOCK_HEROI_ATUALIZAR = {
    nome: "Homem de Ferro",
    poder: "Tecnologia"
}

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

    it('create', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
    })

    it('list', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        const result = { nome, poder };
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})