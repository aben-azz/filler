const { exec } = require('child_process'),
	Argv = process.argv.slice(2);
if (Argv.length < 1)
{
	console.log("\x1b[31m\x1b[1mUsage: ./start [p1] [p2] [maps]\x1b[0m");
	process.exit();
}
Argv.forEach(x=>{
	let player = x.split(/[^a-zA-Z]/).filter(x=>x.length);
	player = player[player.length - 2]
	exec(`./filler_vm -p2 ${x} -p1 ./aben-azz.filler -f maps/map00 > results/p1/maps0/${player};
	./filler_vm -p1 ${x} -p2 ./aben-azz.filler -f maps/map00 > results/p2/maps0/${player};
	./filler_vm -p2 ${x} -p1 ./aben-azz.filler -f maps/map01 > results/p1/map1/${player};
	./filler_vm -p1 ${x} -p2 ./aben-azz.filler -f maps/map01 > results/p2/map1/${player};
	./filler_vm -p2 ${x} -p1 ./aben-azz.filler -f maps/map02 > results/p1/map2/${player};
	./filler_vm -p1 ${x} -p2 ./aben-azz.filler -f maps/map02 > results/p2/map2/${player};`, (err, stdout, stderr)=>{
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	})
})
