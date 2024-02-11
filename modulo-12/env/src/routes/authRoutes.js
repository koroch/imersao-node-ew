const Joi = require('joi');
const BaseRoute = require('./base/baseRoute');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const PasswordHelper = require('../helpers/passwordHelper');

const failAction = async (request, response, error) => {
    throw error;
}

const USER = {
    username: 'joaoninguem',
    password: '123456'
}

class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super() //sempre chamar classe pai quando usar herança
        this.secret = secret;
        this.db = db;
    }

    login() {
        return {
            method: 'POST',
            path: '/login',
            options: {
                auth: false,
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

                const [usuario] = await this.db.read({
                    username: username.toLowerCase()
                })
                if(!usuario)
                    return Boom.unauthorized("O usuário informado não existe!");
                
                const math = await PasswordHelper.comparePassword(password, usuario.password);
                if(!math)
                    return Boom.unauthorized("Usuário ou Senha inválidos!");

                const token = Jwt.sign({
                    username: username,
                    id: usuario.id
                }, this.secret)

                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes