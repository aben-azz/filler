const	Readline = require('readline'),
		Socket = require('socket.io'),
		Argv = process.argv.slice(2),
		Fs = require("fs"),
		_ = require("lodash"),
		Url = require('url'),
		Path = require('path'),
		Express = require("express"),
		{ Exec } = require('child_process');
exec('cat *.js bad_file | wc -l', (err, stdout, stderr) => {
	if (err) {
		// node couldn't execute the command
		return;
	}
const readLine = Readline.createInterface(
	{input: process.stdin, output: process.stdout, terminal: !1}
);

if (Argv.length < 3)
{
	console.log("\x1b[31m\x1b[1mUsage: ./start [p1] [p2] [maps]\x1b[0m");
	process.exit();
}

let main = {
	socket: [],
	p1: "",
	p2: "",
	in_map: 0,
	map_i_index: 0,
	map_index: 0,
	map: [[]],
	finish: 0
}

let server = Express().use((req, res) => {
	const parsedUrl = Url.parse(req.url);
	let pathname = `./src/visualizer/${parsedUrl.pathname}`;
	const mimeType = {
		'.ico': 'image/x-icon',
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.json': 'application/json',
		'.css': 'text/css',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.wav': 'audio/wav',
		'.mp3': 'audio/mpeg',
		'.pdf': 'application/pdf',
	};
	Fs.exists(pathname, function (exist) {
		if(!exist) {
			res.statusCode = 404;
			res.end(`File ${pathname} not found!`);
			return;
		}
		if (Fs.statSync(pathname).isDirectory()) {
			pathname += 'index.html';
		}
		Fs.readFile(pathname, function(err, data){
			if(err){
				res.statusCode = 500;
				res.end(`Error getting the file: ${err}.`);
			} else {
				const ext = Path.parse(pathname).ext;
				res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
				res.end(data);
			}
		});
	});
}).listen(8080);

let io = Socket(server).on("connection", socket => {
	main.socket.push(socket);
	socket.emit("connection_ok");
	socket.on("getPlayers", ()=>{
		socket.emit("Players", [main.p1, main.p2])
	}).on("getMap", ()=>{
		if (main.finish)
			socket.emit("Map", main.map);
		else {
			socket.emit("finish");
		}
	})
});

function broadcast(event, ...data){
	main.socket.forEach(socket=>{
		socket.emit(event, ...data);
	})
}

readLine.on('line', (line) => {
	if (line[0] == '#' || !line.indexOf("    "))
		return ;
	if (!line.indexOf("$$$ exec"))
	{
		let pos = line.split(" ")[2];
		let player = line.split(" ").splice(4)[0].split(/[^a-zA-Z]/).filter(x=>x.length);
		main[pos] = player[player.length - 2]
	}
	else if (!line.indexOf("Piece "))
	{
		main.in_map = 0;
		main.map[++main.map_index] = [];
	}
	else if (!line.indexOf("Plateau "))
	{
		let size = line.split(" ").splice(1);
		main.in_map = 1;
		main.map_i_index = 0;
	}
	else if (!isNaN(line[0]) && main.in_map)
			main.map[main.map_index][main.map_i_index++] = line.substr(3);
	else if (!line.indexOf("== X"))
		readLine.close();
})

readLine.on('close', (line) => {
	main.finish = 1;
	console.log("fin");
})

setInterval(()=>{1+1}, 10000)
