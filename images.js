var personagemFlag  = false;
var personagemImage = new Image();
personagemImage.onload = function(){
	personagemFlag = true;
};
personagemImage.src = "images/hero.png";

var flagBg  = false;
var bgImage = new Image();
bgImage.onload = function(){
	flagBg = true;
};
bgImage.src = "images/background.png";