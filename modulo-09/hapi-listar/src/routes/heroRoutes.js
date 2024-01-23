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

                    let query = {};
                    if(nome){
                        query.nome = nome;
                    }

                    if(isNaN(skip))
                        throw Error("O tipo do skip é incorreto!");
                    if(isNaN(limit))
                        throw Error("O tipo do limit é incorreto!");

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                }catch(err){
                    console.error("Deu ruim! ")
                }
            }
        }
    }
}

module.exports = HeroRoutes