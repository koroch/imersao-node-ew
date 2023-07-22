const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (const indice in this) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado;
}

async function main(){
    try{
        const result = await service.obterPessoas('a');
        
        // const names = [];
        // console.time('foreach')
        // result.results.forEach(function (item){
        //     names.push(item.name);
        // })
        // console.timeEnd('foreach')
        
        // console.time('map1')
        // const names = result.results.map(function (pessoa){
        //     return pessoa.name
        // })
        // console.timeEnd('map1')
            
        // console.time('map2')
        // const names = result.results.map((pessoa) => pessoa.name);
        // console.timeEnd('map2')
        
        console.time('mapProprio') 
        const names = result.results.meuMap(function (pessoa, indice) {
            return `[${indice}] ${pessoa.name}`
        });
        console.timeEnd('mapProprio')


        console.log('names', names)

    }catch(error){
        console.error("Deu ruim:", error.message);
    }
}
main()