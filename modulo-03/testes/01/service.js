const {
    get
} = require('axios');
const url = `https://swapi.dev/api/people`;

async function obterPessoas(nome) {
    const uri = `${url}/?search=${nome}&format=json`;
    const result = await get(uri);
    return result.data.results.map(mapearPessoas);
}

function mapearPessoas(item) {
    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
    obterPessoas
}