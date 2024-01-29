const Joi = require('joi');
const BaseRoute = require('./base/baseRoute');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

const failAction = async (request, response, error) => {
    throw error;
}

const USER = {
    username: 'joaoninguem',
    password: '123456'
}

class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super() //sempre chamar classe pai quando usar herança
        this.secret = secret
    }

    login() {
        return {
            method: 'POST',
            path: '/login',
            options: {
                tags: ['api'],
                description: "Obter token de autenticação",
                notes: 'faz login com username e password do banco',
                validate: {
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required().min(3).max(100),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload;

                if (username.toLowerCase() !== USER.username || password !== USER.password)
                    return Boom.unauthorized();

                const token = Jwt.sign({
                    username: username,
                    id: 1
                }, this.secret)

                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes