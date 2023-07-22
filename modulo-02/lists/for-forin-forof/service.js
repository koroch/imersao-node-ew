const axios = require('axios');
const url = `https://swapi.dev/api/people`;

async function obterPessoas(nome) {
    const uri = `${url}/?search=${nome}&format=json`;
    const response = await axios.get(uri);
    return response.data;
}

module.exports = {
    obterPessoas
}

// obterPessoas('r2')
//     .then(function (resultado){
//         console.log('resultado:', resultado);
//     })
//     .catch(function (error){
//         console.log('error:', error);
//     })