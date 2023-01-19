import '../assets/style/style.scss';

//Arreglo que almacene los colores 
let colors = ['red', 'blue', 'green', 'yellow'];
//patron del juego
let gameP =[];
//patron de clicks
let gameClicksP = [];

//Funcion para iniciar el juego
let start = false;
let level = 0;

//evento para que registre una tecla que inicie el juego
$(document).keydown(() => {
  if(!start) {
    $('#level-title').text('Level' + level);
    start = true;
    nextSequence()
  }
  
});

//Evento al que el usuario le esta dando click
$('.container__row__btn').click(function() { let userColor = $(this).attr('id');
  gameClicksP.push(userColor);
  playSound(userColor);

  animateClick(userColor);

});


//Funcion para crear la secuencia del juego
function nextSequence () {
  //Reiniciar los Clicls
  gameClicksP = [];

  //actualizar el nivel
  level++;
  $('#level-title').text('level' + level);

  //Numero Aleatorio para patron
  let randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);

  //Almacenar el numero en el patron
  gameP.push(randomNumber);

  //Usar numero aleatorio para llamar el boton seleccionado
  let randomColor;
  randomColor = colors[randomNumber];

  $('#' + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor);
}

//Funcion para emular sonidos
function playSound(color) {
  let audio = new Audio('../assets/sounds/' + color + '.mp3');
  audio.play();
}
//Funcion para animar el click
function animateClick(userColor) {
  $('#' + userColor).addClass('pressed');

  //quitar la clase agregada
    setTimeout(() =>{ 
      $('#' + userColor).removeClass('pressed');
  }, 100);
}
