class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => method !== 'constructor' && !method.startsWith('_')) //não retornar o construtor e os metodos privados
    }
}

module.exports = BaseRoute;