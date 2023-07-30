const { Command } = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    const Commander = new Command();
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', 'Poder do Heroi')
        .option('-i, --id [value]', 'Id do Heroi')
        .option('-c, --cadastrar', 'Cadastrar um Heroi')
        .option('-l, --listar', 'Listar Herois')
        .option('-r, --remover', 'Remover um Heroi pelo id')
        .option('-a, --atualizar [value]', 'Atualizar um Heroi pelo id')
        .parse(process.argv)

    const heroi = new Heroi(Commander.opts());

    try {
        if (Commander.opts().cadastrar) {
            delete heroi.id;
            const resultado = await Database.cadastrar(heroi);
            if (!resultado) {
                console.error('O Heroi não foi cadastrado!');
                return;
            }
            console.log('O Heroi foi cadastrado com sucesso!');
        }
        else if (Commander.opts().listar) {
            const resultado = await Database.listar();
            console.log('Lista:', resultado);
        }
        else if (Commander.opts().remover) {
            const resultado = await Database.remover(heroi.id);
            if (!resultado) {
                console.error('O Heroi não foi removido!');
                return;
            }
            console.log('O Heroi foi removido com sucesso!');
        }
        else if (Commander.opts().atualizar) {
            const idParaAtualizar = Commander.opts().atualizar;
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
            if (!resultado) {
                console.error('O Heroi não foi atualizado!');
                return;
            }
            console.log('O Heroi foi atualizado com sucesso!');
        }
    } catch (error) {
        console.log('Deu ruim!', error);
    }
}

main();