const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
    let lista = [];
    for (index in this) {
        const item = this[index];
        const result = callback(item, index, this);
        if (!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    try {
        const { results } = await obterPessoas(`a`);

        // const familiaLars = results.filter(function (item) {
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1 //se não for encontrado retorna -1
        //     return result
        // })

        // const familiaLars = results.meuFilter((item, index, lista) => item.name.toLowerCase().indexOf(`lars`) !== -1)

        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length);
            return item.name.toLowerCase().indexOf(`lars`) !== -1
        })

        const names = familiaLars.map((pessoa) => pessoa.name);
        console.log(names);
    } catch (error) {
        console.error(`Deu ruim!`, error.message)
    }
}
main();