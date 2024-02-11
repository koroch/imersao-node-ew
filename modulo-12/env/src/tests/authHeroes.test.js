const assert = require('assert');
const api = require('../api');
const Context = require('../database/strategies/base/contextStrategy');
const Postgres = require('../database/strategies/postgres/postgres');
const UsuarioSchema = require('../database/strategies/postgres/schemas/usuarioSchema');

const USER = {
    username: 'joaoninguem',
    password: '123'
}

const USER_DB = {
    ...USER,
    password: '$2b$04$MTA7DaWijT9dm95RRMtwgeZKiXj3z0HD1H/5GwM7IuftuqNjWLPOy'
}

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;
        const connectionPostgres = await Postgres.connect();
        const usuarioSchema = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
        const contextPostgres = new Context(new Postgres(connectionPostgres, usuarioSchema));
        await contextPostgres.update(null, USER_DB, true);
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

    it('deve retornar não autorizado ao tentar obter um login errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'teste',
                password: '132'
            }
        })

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 401);
        assert.deepEqual(dados.error, "Unauthorized");
    })

})