const ICrud = require('./interfaces/ICrud');
const Mongoose = require("mongoose");
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectado'
}
class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null;
        this._driver = null;
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState];
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state;
        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this._driver.readyState];
    }

    defineModel() {
        const heroeSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })

        this._herois = Mongoose.model('heroes', heroeSchema);
    }

    connect() {
        Mongoose.connect('mongodb://koroch:123456@localhost:27017/heroes',
            { serverSelectionTimeoutMS: 5000 }
        ).catch(err => console.log('Falha na conexão!', err));

        const connection = Mongoose.connection;
        this._driver = connection
        connection.once('open', () => console.log("Database rodando!"));
        this.defineModel();
    }

    create(item) {
        return this._herois.create(item);
    }

    read(query, skip=0, limit=10) {
        return this._herois.find(query).skip(skip).limit(limit);
    }

    update(id, item) {
        console.log("")
    }

    delete(id) {
        console.log("")
    }
}

module.exports = MongoDB;