/*
Obter user
Obter telefone por id
Obter endereço por id
*/


function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, { //erro, sucesso
      id: 1,
      nome: "Aladin",
      dataNascimento: new Date(),
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      Telefone: "41984746789",
      DDD: 41,
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0,
    });
  }, 2000);
}

obterUsuario(function resolverUsuario(error, Usuario) {
  if (error) {
    console.log("DEU RUIM em USUARIO", error);
    return;
  }
  obterTelefone(Usuario.id, function resolverTelefone(error1, Telefone) {
    if (error1) {
      console.log("DEU RUIM em Telefone", error);
      return;
    }

    obterEndereco(Usuario.id, function resolverEndereco(error2, Endereco) {
      if (error2) {
        console.log("DEU RUIM em Endereço", error);
        return;
      }

      console.log(`
            Nome: ${Usuario.nome},
            Endereco: ${Endereco.rua}, ${Endereco.numero}
            Telefone: (${Telefone.DDD})${Telefone.Telefone}
            `);
    });
  });
});
