const Joi = require('joi');
const BaseRoute = require('./base/baseRoute');
const Boom = require('boom');

const failAction = async (request, response, error) => {
    throw error;
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super() //sempre chamar classe pai quando usar herança
        this.db = db
    }

    list() {
        return {
            method: 'GET',
            path: '/herois',
            options: {
                tags: ['api'],
                description: 'Deve listar herois',
                notes: 'pode paginar resultados e filtrar por nome',
                validate: {
                    //payload->body
                    //headers->header
                    //params->na url :id
                    //query->?skip=0$limit=10
                    failAction,
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }),
                    headers
                }
            },
            handler: (request, response) => {
                try {
                    const { skip, limit, nome } = request.query;
                    const query = { nome: { $regex: `.*${nome}*.` } };
                    return this.db.read(nome ? query : {}, skip, limit)
                } catch (err) {
                    console.error("Deu ruim! ", err.message);
                    return Boom.internal();
                }
            }
        }
    }

    create() {
        return {
            method: 'POST',
            path: '/herois',
            options: {
                tags: ['api'],
                description: 'Deve cadastrar herois',
                notes: 'pode criar um heroi com nome e poder',
                validate: {
                    failAction,
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(20)
                    }),
                    headers
                }
            },
            handler: async (request, response) => {
                try {
                    const { nome, poder } = request.payload;
                    const result = await this.db.create({ nome, poder });
                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }
                } catch (error) {
                    console.log("Deu ruim", error);
                    return Boom.internal();
                }
            }
        }
    }

    update() {
        return {
            method: 'PATCH',
            path: '/herois/{id}',
            options: {
                tags: ['api'],
                description: 'Deve atualizar herois',
                notes: 'pode atualizar o heroi, filtrando por id e modificando o nome ou poder',
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(20)
                    }),
                    headers
                }
            },
            handler: async (request, response) => {
                try {
                    const { id } = request.params;
                    const { payload } = request;
                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString);

                    const result = await this.db.update(id, dados);

                    if (result.modifiedCount !== 1) return Boom.preconditionFailed("ID não encontrado no banco!");

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }
                } catch (error) {
                    console.error("Deu ruim", error.message);
                    return Boom.internal();
                }
            }
        }
    }

    delete() {
        return {
            method: 'DELETE',
            path: '/herois/{id}',
            options: {
                tags: ['api'],
                description: 'Deve remover herois',
                notes: 'pode remover um heroi pelo ID',
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    headers
                }
            },
            handler: async (request, response) => {
                try {
                    const { id } = request.params;
                    const result = await this.db.delete(id);

                    if (result.deletedCount !== 1) return Boom.preconditionFailed("ID não encontrado no banco!");

                    return {
                        message: 'Heroi removido com sucesso!'
                    }
                } catch (error) {
                    console.error("Deu ruim", error.message);
                    return Boom.internal()
                }
            }
        }
    }
}

module.exports = HeroRoutes