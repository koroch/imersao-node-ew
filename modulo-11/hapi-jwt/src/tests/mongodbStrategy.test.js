const assert = require('assert');
const MongoDb = require('../database/strategies/mongodb/mongodb');
const HeroiSchema = require('../database/strategies/mongodb/schemas/heroisSchema');
const Context = require('../database/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: "Flash",
    poder: "Velocidade"
}
const MOCK_HEROI_DEFAULT = {
    nome: `Homem de Ferro - ${Date.now()}`,
    poder: "Tecnologia"
}
const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino - ${Date.now()}`,
    poder: "Chatice"
}
let MOCK_HEROI_ID = '';

let context = {};
describe('MongoDB Suite de testes', function () {
    this.beforeAll(async function () {
        const connection = MongoDb.connect();
        context = new Context(new MongoDb(connection, HeroiSchema));
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result._id;
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
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome });
        const result = { nome, poder };
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('update', async () => {
        const result = await context.update(MOCK_HEROI_ID.toString(), {
            nome: 'pernalonga'
        });
        assert.deepEqual(result.modifiedCount, 1);
    })

    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID.toString());
        assert.deepEqual(result.deletedCount, 1);
    })
})