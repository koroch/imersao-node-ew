const Sequelize = require('sequelize');
const ICrud = require('../interfaces/ICrud');

class Postgres extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    async create(item) {
        return await this._schema.create(item);
    }

    async read(item = {}) {
        return this._schema.findAll({ where: item, raw: true });
    }

    async update(id, item, upsert = false) {
        const fn = upsert ? 'upsert' : 'update'
        return await this._schema[fn](item, {
            where: { id }
        });
    }

    async delete(id) {
        const query = id ? { id } : {};
        return await this._schema.destroy({ where: query });
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.error('Fail!', error);
            return false;
        }
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model;
    }

    static async connect() {
        const connection = new Sequelize(process.env.POSTGRES_URL, {
            quoteIdentifiers: false,
            operatorsAliases: 0,
            logging: false,
            dialect: 'postgres',
            ssl: (process.env.SSL_DB == 'true'),
            dialectOptions: {
                ssl: (process.env.SSL_DB == 'true')
            }
        });
        return connection;
    }
}

module.exports = Postgres;