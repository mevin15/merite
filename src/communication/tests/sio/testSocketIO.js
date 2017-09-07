var http = require('http');

var fs = require('fs');

// Chargement du fichier index.html affiché au client

var server = http.createServer(function(req, res) {

    fs.readFile('./testSocketIO.html', 'utf-8', function(error, content) {

        res.writeHead(200, {"Content-Type": "text/html"});

        res.end(content);

    });

});


// Chargement de socket.io

var io = require('socket.io').listen(server);


// Quand un client se connecte, on le note dans la console

var index = 0;
var clients = {};


io.sockets.on('connection', function (socket) {

    var ind = index;
    clients[ind] = socket; 
    console.log((new Date()) + "Connexion acceptée [" + ind + "]");

    
    socket.on('chat message', function(msg){
	// Parcours des clients
	for(var i in clients){
            // Transmission du message aux autres clients

	    if(i == ind){
		
	    }else{
		console.log("Diffusion de " + ind + " vers " + i);
		clients[i].send(msg);
	    }
	}
    });

    socket.on('disconnect', function(){
	console.log("utilisateur " + ind + " déconnecté.");
    });

    
    index++;
});

server.listen(1234);



