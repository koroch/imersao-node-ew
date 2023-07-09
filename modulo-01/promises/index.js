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

usuarioPromise
    .then(function (resultado){
        return obterTelefone(resultado.id)
            .then(function resolveTelefone(result){
                return {
                    usuario: {
                        nome: resultado.nome,
                        id: resultado.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco
            .then(function resolveEndereco(resultEndereco){
                return {
                    usuario: resultado.usuario,
                    telefone: resultado.telefone,
                    endereco: resultEndereco
                }
            })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error){
        console.log("Deu ruim:", error)
    })

//ou
// usuarioPromise.then(function (resultado){
// }, function (error){
// })