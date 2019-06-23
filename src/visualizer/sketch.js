let Socket = io();

Socket.on("connection_ok", () => console.log("Connexion ok !"));

function setup() {
	createCanvas(1920, 1080)
	background(50);
}
function rand(x,y){
	return Math.ceil(random(x,y))
}

let string = (str, position, taille, color) =>{
	push()
	textSize(taille);
	text(str, ...position);
	fill(...color);
	pop();
}

function draw() {
	//background(50);
	string("filler", [500,500], 50, [255,0,0])
}

function keyPressed(e) {
	// console.log(e)
  if (e.code === "Space") {

  } else if(e.code == "KeyQ"){

  }
}
