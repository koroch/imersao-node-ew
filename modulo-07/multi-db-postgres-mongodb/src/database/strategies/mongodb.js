const ICrud = require('./interfaces/ICrud');

class MongoDB extends ICrud {
    constructor() {
        super() //chama a classe mãe
    }

    create(item) {
        console.log("O item foi salvo no MongoDB")
    }

    read(query) {
        console.log("")
    }

    update(id, item) {
        console.log("")
    }

    delete(id) {
        console.log("")
    }
}

module.exports = MongoDB;