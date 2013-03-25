// Cria o elemento canvas
var canvas    = document.createElement('canvas');
var context   = canvas.getContext( '2d' );
canvas.width  = 1000; 
canvas.height = 500;
document.body.appendChild(canvas);

// Objeto personagem
var personagem = [];
personagem['actual'] = {
	xbgPosition : 0,
	ybgPosition : 128,
	width : 64,
	height : 64,
	x: 0,
	y: 436,
	speed: 6
};
personagem['cache'] = {
	xbgPosition : 0,
	ybgPosition : 128,
	width : 64,
	height : 64,
	x: 0,
	y: 436,
	speed: 6
};


// Evento de key
var keydown = [];
keydown.keycode = undefined;

addEventListener( 'keydown', function(e){
	keydown.keycode = e.keyCode;
});

// Update nos objetos e valores do jogo
var update  = function(){
	
	// Se houve evento
	if ( keydown.keycode != undefined ) {

		personagem = incrementActual(
			64, // Largura frame
			personagem, // Objeto
			256, // Limite maximo
			personagem['actual'].speed , // Speed
			keydown.keycode // Key code
		);
	}
	

	keydown.keycode = undefined;
	render();
};

// Renderizacao do jogo
var render = function(){

	// Render BG
	if ( flagBg ) {
		context.drawImage(bgImage, 0, 0);
	}

	// Render personagem
	if ( personagemFlag ) {
		context.drawImage( 
			personagemImage, 
			personagem['actual'].xbgPosition, 
			personagem['actual'].ybgPosition, 
			personagem['actual'].width, 
			personagem['actual'].height, 
			personagem['actual'].x, 
			personagem['actual'].y, 
			personagem['actual'].width, 
			personagem['actual'].height 
		);
	}

};

// Main function
var main = function(){
	update();
}

// Executa o main
setInterval( main, 1 );