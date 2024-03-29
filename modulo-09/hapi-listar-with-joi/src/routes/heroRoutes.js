const Joi = require('joi');
const BaseRoute = require('./base/baseRoute');
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super() //sempre chamar classe pai quando usar herança
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    //payload->body
                    //headers->header
                    //params->na url :id
                    //query->?skip=0$limit=10
                    failAction: async (request, response, error) => {
                        throw error;
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, response) => {
                try {
                    const { skip, limit, nome } = request.query;
                    const query = { nome: { $regex: `.*${nome}*.` } };
                    return this.db.read(nome ? query : {}, skip, limit)
                } catch (err) {
                    console.error("Deu ruim! ", err.message)
                    return "Erro interno no servidor"
                }
            }
        }
    }
}

module.exports = HeroRoutes