const BaseRoute = require('./base/baseRoute'); 
class HeroRoutes extends BaseRoute{
    constructor(db) {
        super() //sempre chamar classe pai quando usar herança
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, response) => {
                return this.db.read()
            }
        }
    }
}

module.exports = HeroRoutes