let Socket = io();

Socket.on("connection_ok", () =>{
	Socket.emit("getPlayers");
	Socket.emit("getMap");
	console.log("Connexion ok !")
});
Socket.on("Players", players=>console.log("players", players))
Socket.on("Map", map=>{
	console.log("map", map)
})
Socket.on("finish", ()=>{
	console.log("retentative")
	Socket.emit("getMap");
})

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
