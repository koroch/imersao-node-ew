const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString())
    }

    async escrevarArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo();

        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const heroiComId = {
            id, ...heroi
        }

        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escrevarArquivo(dadosFinal);

        return resultado;
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? item.id === id : true)) //ou traz array com o item filtrado ou array completo
        return dadosFiltrados;
    }

    async remover(id) {
        if (!id) {
            return await this.escrevarArquivo([]);
        }
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1) {
            throw Error('O heroi informado não existe!');
        }
        dados.splice(indice, 1);
        return await this.escrevarArquivo(dados);
    }

    async atualizar(id, modificacoes) {
        if (!id) {
            throw Error('Heroi sem ID ou não existente!');
        }
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1) {
            throw Error('O heroi informado não existe!');
        }

        let objetoModificar = JSON.stringify(modificacoes);
        const dadosModificar = JSON.parse(objetoModificar);

        let dadosModificadosNaoVazios = modificacoes;
        dadosModificadosNaoVazios = dadosModificar;

        const dadosModificadosCompleto = Object.assign(dados[indice], dadosModificadosNaoVazios);

        dados[indice] = dadosModificadosCompleto

        return await this.escrevarArquivo(dados)
    }
}

module.exports = new Database();