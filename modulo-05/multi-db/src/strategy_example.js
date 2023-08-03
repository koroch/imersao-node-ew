class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedException();
    }

    read(query) {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }
}

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

class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }

    read(query) {
        return this._database.read(query)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }
}

const ContextMongo = new ContextStrategy(new MongoDB());
ContextMongo.create();

const ContextPostgres = new ContextStrategy(new Postgres());
ContextPostgres.create();