const ICrud = require('./interfaces/ICrud');

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log("O item foi salvo no Postgres")
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

module.exports = Postgres;