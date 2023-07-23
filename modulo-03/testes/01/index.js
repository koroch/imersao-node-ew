//Mocha instalado globalmente para testes
//Instalamos o nock para simular requisições 
const assert = require('assert');
const nock = require('nock');

const { obterPessoas } = require('./service');

describe(`Star Wars Tests`, function () {
    this.beforeAll(() => {  //antes de cada uma das funções executa uma tarefa
        const response = {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
                {
                    "name": "Owen Lars",
                    "height": "178",
                    "mass": "120",
                    "hair_color": "brown, grey",
                    "skin_color": "light",
                    "eye_color": "blue",
                    "birth_year": "52BBY",
                    "gender": "male",
                    "homeworld": "https://swapi.dev/api/planets/1/",
                    "films": [
                        "https://swapi.dev/api/films/1/",
                        "https://swapi.dev/api/films/5/",
                        "https://swapi.dev/api/films/6/"
                    ],
                    "species": [],
                    "vehicles": [],
                    "starships": [],
                    "created": "2014-12-10T15:52:14.024000Z",
                    "edited": "2014-12-20T21:17:50.317000Z",
                    "url": "https://swapi.dev/api/people/6/"
                }
            ]
        }

        nock(`https://swapi.dev/api/people`)
            .get('/?search=Owen&format=json')
            .reply(200, response)
    })

    it(`deve buscar o Owen com o formato correto`, async () => {
        const expected = [{ nome: 'Owen Lars', peso: '178' }];
        const nomeBase = 'Owen';
        const resultado = await obterPessoas(nomeBase);
        assert.deepEqual(resultado, expected)
    })
})