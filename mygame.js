// Create Canvas
var canvas    = document.createElement('canvas');
var ctx 	  = canvas.getContext('2d');

canvas.width  = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// BG
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

var heroReady 	= false;
var heroImage  	= new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = 'images/hero.png';


var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
}
monsterImage.src = 'images/monster.png';


// Game objects
var hero = {
	speed: 100,
	width: 60,
	height: 70
};
var monster = {};
var monsterCaught = 0;

// Control
var keysDown = {};

addEventListener('keydown', function (e) {
	keysDown[e.keyCode] = true;
}, false );

addEventListener( 'keyup', function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game
var reset = function(){

	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	
	// Throw the monster somewhere
	monster.x = 32 + ( Math.random() * ( ( canvas.width - 70 ) - 64 ) );
	monster.y = 32 + ( Math.random() * ( ( canvas.height -70 ) - 64 ) );
}

// Update
var update = function ( modifier ) {

	if ( 38 in keysDown ) { // up
		hero.y -= hero.speed * modifier;
		if ( hero.y < 30 ) {
			hero.y = 30;	
		}
	}

	if ( 40 in keysDown ) { // down
		hero.y += hero.speed * modifier;
		if ( Math.round(hero.y) >= 415 ) {
			hero.y = 415;
		}
	}

	if ( 37 in keysDown ) { // Left
		hero.x -= hero.speed * modifier;
		if ( hero.x < 30 ) {
			hero.x = 30;	
		}
	}

	if ( 39 in keysDown ) { // Right
		hero.x += hero.speed * modifier;
		if ( Math.round(hero.x) >= 450 ) {
			hero.x = 450;
		}
	}

	// Colisão
	if ( hero.x <= ( monster.x + 32 ) 
		&& monster.x <= ( hero.x + 32 )
		&& hero.y <= ( monster.y + 32 )
		&& monster.y <= ( hero.y + 32 )
	) {
		++ monsterCaught;
		reset();
	}
}

// Render
	
var downPosition = 0;

var render = function(){

	if ( bgReady ) {
		ctx.drawImage( bgImage, 0 , 0 );
	}

	if ( heroReady ) {
		// Baixo
		if ( 40 in keysDown ) {

			switch( downPosition ){
				
				case 0 :
					ctx.drawImage( heroImage, 0, 0, 60, 70, hero.x, hero.y, 60, 70 );
					downPosition = downPosition + 70;
					console.log("1");
				break;

				case 70 :
					ctx.drawImage( heroImage, downPosition, 0, 60, 70, hero.x, hero.y, 60, 70 );
					downPosition = downPosition + 70;
					console.log("2");
				break;

				case 140 :
					ctx.drawImage( heroImage, downPosition, 0, 60, 70, hero.x, hero.y, 60, 70 );
					downPosition = 190;
					console.log("3");
				break;

				case 190 :
					ctx.drawImage( heroImage, downPosition, 0, 60, 70, hero.x, hero.y, 60, 70 );
					downPosition = downPosition = 0;
					console.log("4");
				break;
			}


		}

		// Boneco Down 1 Step
		// ctx.drawImage( heroImage, 0, 0, 60, 70, hero.x, hero.y, 60, 70 );

		// Boneco Down 2 Step
		// ctx.drawImage( heroImage, 70, 0, 60, 70, hero.x, hero.y, 60, 70 );

		// Boneco Down 3 Step
		// ctx.drawImage( heroImage, 140, 0, 60, 70, hero.x, hero.y, 60, 70 );
		
		// Boneco Down 4 Step
		// ctx.drawImage( heroImage, 190, 0, 60, 70, hero.x, hero.y, 60, 70 );
	}
	
	if ( monsterReady ) {
		ctx.drawImage( monsterImage, monster.x, monster.y );
	}	


	// 9 parameto: Altura do corte
	// 8 parameto: Largura do corte
	// 7 eixo y: Largura do corte
	// 6 eixo x: Largura do corte
	// 5 CANVAS DO CORTE Altura da imagem ( QUE VC QUER CORTAR )
	// 4 CANVAS DO CORTE Largura da imagem ( QUE VC QUER CORTAR )
	// 3 EIXO Y DA POSICAO DA IMAGEM
	// 2 EIXO X DA POSICAO DA IMAGEM
	// 2 IMAGEM


	// Score
	ctx.fillStyle 		= 'rgb( 250, 250, 250 )';
	ctx.font 	  		= '24px Helvetica';
	ctx.textAlign 		= 'left';
	ctx.textBaseline 	= 'top';
	ctx.fillText( 'Goblins caught: ' + monsterCaught, 32, 32 );
}

// Main
var main = function(){

	var now   = Date.now();
	var delta = now - then;

	update( delta / 1000 );
	render();

	then = now;
}

// Lets plays!
reset();
var then = Date.now();
setInterval( main, 1 );
