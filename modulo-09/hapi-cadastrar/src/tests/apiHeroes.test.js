const assert = require('assert');
const api = require('../api');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Popye',
    poder: 'Espinafre'
}

//usar function para poder usar o this
describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    })

    it('listar /herois deve retornar somente 3 registros', async () => {
        const TAMANHO_LIMITE = 3;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    })

    it('listar /herois deve retornar erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEE';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = { "statusCode": 400, "error": "Bad Request", "message": "child \"limit\" fails because [\"limit\" must be a number]", "validation": { "source": "query", "keys": ["limit"] } };
        assert.deepEqual(result.statusCode, 400);
        assert.deepEqual(result.payload, JSON.stringify(errorResult));
    })

    it('listar /herois deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 1000;
        const NOME = "Homem de Ferro - 1706049743310";
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NOME}`
        })
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome === NOME);
    })

    it('cadastrar POST - /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_CADASTRAR
        })

        const statusCode = result.statusCode;
        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })
})