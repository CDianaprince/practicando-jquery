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
  checkAnswer(gameClicksP.length - 1);
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

  //Usar numero aleatorio para llamar el boton seleccionado
  let randomColor;
  randomColor = colors[randomNumber];

  //Almacenar el numero en el patron
  gameP.push(randomColor);

  $('#' + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor);
}

//Funcion para confirmar los clicks del usuario
function checkAnswer(currentLevel) {
  if(gameP[currentLevel] === gameClicksP[currentLevel]) {
    if(gameP.length === gameClicksP
      .length) {
      setTimeout(() => {nextSequence();
      }, 1000);
    }

  } else {
    //Mostrar sonido de error
    playSound('wrong');
    //clase para finalizar el juego
    $('body').addClass('game-over');

    //cambiar titulo para poder reiniciarlo
    $('#level-title').text('Game Over, please restart!');

    //quitar la clases agregadas
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 400);
    //llamar  funcion para reiniciar el juego
    startOver();
  }
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

//funcion para reiniciar el juego
function startOver() {
  level = 0;
  gameP = [];
  start = false;
}
