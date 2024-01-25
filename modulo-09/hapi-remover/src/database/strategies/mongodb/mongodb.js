const ICrud = require('../interfaces/ICrud');
const Mongoose = require("mongoose");
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectado'
}
class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema;
        this._connection = connection;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState];
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state;
        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this._connection.readyState];
    }

    static connect() {
        Mongoose.connect('mongodb://koroch:123456@localhost:27017/herois',
            { serverSelectionTimeoutMS: 5000 }
        ).catch(err => console.log('Falha na conexão!', err));

        const connection = Mongoose.connection;
        connection.once('open', () => console.log("Database rodando!"));
        return connection;
    }

    create(item) {
        return this._schema.create(item);
    }

    read(query, skip = 0, limit = 10) {
        return this._schema.find(query).skip(skip).limit(limit);
    }

    update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item })
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB;