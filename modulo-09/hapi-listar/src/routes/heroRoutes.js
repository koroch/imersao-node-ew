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
                try{
                    const { skip, limit, nome } = request.query;
                    return this.db.read()
                }catch(err){
                    console.error("Deu ruim! ",err.message)
                }
            }
        }
    }
}

module.exports = HeroRoutes