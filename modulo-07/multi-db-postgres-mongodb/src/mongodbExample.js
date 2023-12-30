const Mongoose = require("mongoose");
// Mongoose.connect('mongodb://koroch:123456@localhost:27017/heroes',
//     { useNewUrlParser: true },
//     function (error) {
//         if (!error) return;
//         console.log('Falha na conexão!', error);
//     })

Mongoose.connect('mongodb://koroch:123456@localhost:27017/heroes',
    { serverSelectionTimeoutMS: 5000 }
).catch(err => console.log(err));

const connection = Mongoose.connection;
connection.once('open', () => console.log("Database rodando!"));

// setTimeout(() => {
//     const state = connection.readyState;
//     console.log('state', state);
// }, 1000)
/*
    0: Disconectado
    1: Conectado
    2: Conectando
    3: Disconectado
*/

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

const model = Mongoose.model('heroes', heroeSchema);

async function main() {
    const resultCadastrar = await model.create({
        nome: "Batman",
        poder: "Dinheiro"
    })
    console.log("result cadastrar", resultCadastrar);

    const listItens = await model.find();
    console.log('itens', listItens);

}
main()