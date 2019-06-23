let Socket = io();

Socket.on("connection_ok", () => console.log("Connexion ok !"));

function setup() {
	createCanvas(1920, 1080)
	background(50);
}
function rand(x,y){
	return Math.ceil(random(x,y))
}

function draw() {
	background(50);

}

function keyPressed(e) {
	// console.log(e)
  if (e.code === "Space") {

  } else if(e.code == "KeyQ"){

  }
}
