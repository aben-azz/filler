const	Readline = require('readline'),
		Socket = require('socket.io'),
		Argv = process.argv.slice(2),
		Fs = require("fs"),
		_ = require("lodash"),
		Url = require('url'),
		Path = require('path'),
		Express = require("express");
const readLine = Readline.createInterface(
	{input: process.stdin, output: process.stdout, terminal: !1}
);

if (Argv.length < 3)
{
	console.log("\x1b[31m\x1b[1mUsage: ./start [p1] [p2] [maps]\x1b[0m");
	process.exit();
}

readLine.on('line', (line) => {
    //console.log("Nodejs: " + line);
})

console.log(Argv);

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
	socket.emit("connection_ok");
});
