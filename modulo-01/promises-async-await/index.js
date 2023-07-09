/*
Obter user
Obter telefone por id
Obter endereço por id
*/
//import modulo interno do node.js
const util = require('util');

const obterEnderecoAsync = util.promisify(obterEndereco) //só funciona se o callback seguir o padrão fielmente, caso o parametro de erro receber valor ou a ordem estiver errada, não será possível usar essa função!

function obterUsuario() {
  //der erro vai para o reject, se der certo vai para o resolve
  return new Promise(function resolveProvise(resolve, reject) {
    setTimeout(function () {
        //return reject(new Error("DEU RUIM MESMO!"));
        return resolve({
            id: 1,
            nome: "Aladin",
            dataNascimento: new Date(),
        });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolveProvise(resolve, reject){
      setTimeout(() => {
      return resolve({
        telefone: "41984746789",
        ddd: 41,
      });
    }, 2000);
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0,
    });
  }, 2000);
}

const usuarioPromise = obterUsuario();

//1- async na função -> retorna promise
async function main() {
  try{
    console.time('medida-promise');
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([ //roda simultaneamente as duas funções que não possuem relação
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const telefone = resultado[0];
    const endereco = resultado[1];

    console.log(`
    Nome: ${usuario.nome}
    Telefone: (${telefone.ddd}) ${telefone.telefone}
    Endereço: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise');
  }catch(error){  
    console.log("Deu ruim:", error)
  }
}
main()