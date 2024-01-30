const assert = require('assert');
const api = require('../api');
const Context = require('../database/strategies/base/contextStrategy');
const Postgres = require('../database/strategies/postgres/postgres');
const UsuarioSchema = require('../database/strategies/postgres/schemas/usuarioSchema');

const USER = {
    username: 'joaoninguem',
    password: '123456'
}

const USER_DB = {
    ...USER,
    password: ''
}

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;
        const connectionPostgres = await Postgres.connect();
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
    })

    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    })

})