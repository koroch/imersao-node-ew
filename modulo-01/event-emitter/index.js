const EventEmitter = require('events');

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuarioClick';

meuEmissor.on(nomeEvento, function (click) {
  console.log('Um user clicou', click)
})

//simulando eventos
// meuEmissor.emit(nomeEvento, 'na barra de rolagem');
// meuEmissor.emit(nomeEvento, 'no ok');
// let count = 0;
// setInterval(function() {
//   meuEmissor.emit(nomeEvento, 'no ok ' + (count++))
// }, 1000)

const stdin = process.openStdin();  //Não transformar em Promise! Promise funciona só uma única vez. Se quiser checar eventos siga sem Promise
stdin.addListener('data', function (value) {
  console.log(`Você digitou: ${value.toString().trim()}` );
})
