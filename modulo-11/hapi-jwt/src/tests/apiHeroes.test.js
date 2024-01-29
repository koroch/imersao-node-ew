const assert = require('assert');
const api = require('../api');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Popye',
    poder: 'Espinafre'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Arqueiro',
    poder: 'Flechada'
}

let MOCK_ID = '';
//usar function para poder usar o this
describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
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
        const NOME = MOCK_HEROI_INICIAL.nome;
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
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        const statusCode = result.statusCode;
        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })

    it('atualizar PATCH - /herois/:id', async () => {
        const id = MOCK_ID;
        const expected = {
            poder: 'Super Mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${id}`,
            payload: JSON.stringify(expected)
        })

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, "Heroi atualizado com sucesso!")
    })

    it('atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () => {
        const id = `5bfdb6e83f66ad3c32939fb1`;

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${id}`,
            payload: JSON.stringify({
                poder: 'Super Mira'
            })
        })

        const dados = JSON.parse(result.payload);
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco!'
        }
        const statusCode = result.statusCode;
        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected)
    })

    it('remover DELETE - /herois/:id', async () => {
        const id = MOCK_ID;

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${id}`
        })

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, "Heroi removido com sucesso!")
    })

    it('remover DELETE - /herois/:id - não deve remover', async () => {
        const id = `5bfdb6e83f66ad3c32939fb1`;

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${id}`
        })

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco!'
        }

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected)
    })

    it('remover DELETE - /herois/:id - não deve remover com ID inválido', async () => {
        const id = `Id_inválido`;

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${id}`
        })

        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        }

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.ok(statusCode === 500);
        assert.deepEqual(dados, expected)
    })
})