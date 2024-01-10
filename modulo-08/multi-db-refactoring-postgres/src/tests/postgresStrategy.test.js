// npm i --save-dev mocha

const assert = require('assert');
const Postgres = require('../database/strategies/postgres/postgres');
const HeroiSchema = require('../database/strategies/postgres/schemas/heroiSchema');
const Context = require('../database/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: "Flash",
    poder: "Velocidade"
}
const MOCK_HEROI_ATUALIZAR = {
    nome: "Homem de Ferro",
    poder: "Tecnologia"
}
let context = {}

describe('Postgres Strategy', function () {
    this.timeout(Infinity);
    this.beforeAll(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema);
        context = new Context(new Postgres(connection, model));
        await context.delete(); //limpa a base
        await context.create(MOCK_HEROI_ATUALIZAR);
    })

    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected();
        assert.equal(result, true);
    })
    it('deve cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.dataValues.id;
        assert.deepEqual(result.dataValues, MOCK_HEROI_CADASTRAR);
    })
    it('deve listar', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    })
    it('deve atualizar', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
        const novoItem = { //rest / spread
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        await context.update(itemAtualizar.id, novoItem);
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
        delete itemAtualizado.id;
        assert.deepEqual(novoItem, itemAtualizado);
    })
    it('deve remover por id', async function () {
        const [item] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        const result = await context.delete(item.id);
        assert.deepEqual(result, 1);
    })
})