class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}

class ICrud {
    connected() {
        throw new NotImplementedException();
    }

    isConnected() {
        throw new NotImplementedException();
    }

    create(item) {
        throw new NotImplementedException();
    }

    read(query) {
        throw new NotImplementedException();
    }

    update(id, item, upsert) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }

    isConnected() {
        throw new NotImplementedException();
    }
}

module.exports = ICrud;