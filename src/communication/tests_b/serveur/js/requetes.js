var fs = require('fs');

module.exports = function(page, req, res){
	console.log(page);
	switch(page){
		case '/' : 
			fs.readFile('../vue/html/index.html', 'utf-8', function(error, content) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(content);})
			break;

		case '/jeu1.js' : 
			fs.readFile('../vue/jeu1.js', 'utf-8', function(error, content) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(content);})
			break;
			
		case '/admin2017' : 
			fs.readFile('../vue/html/admin2017.html', 'utf-8', function(error, content) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(content);})
			break;
			
		case '/client.js' : 
			fs.readFile('../client/client.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;

		case '/require.js' : 
			fs.readFile('../client/js/require.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/Message.js' : 
			fs.readFile('../client/js/classes/Message.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/Ligne.js' : 
			fs.readFile('../vue/classes/Ligne.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;

		case '/Bouton.js' : 
			fs.readFile('../vue/classes/Bouton.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;

		case '/Tableau.js' : 
			fs.readFile('../vue/classes/Tableau.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/Cadre.js' : 
			fs.readFile('../vue/classes/Cadre.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/donneesServeur.js' : 
			fs.readFile('../client/js/classes/donneesServeur.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/socket.io.js' : 
			fs.readFile('../node_modules/socket.io-client/dist/socket.io.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/Sprite.js' : 
			fs.readFile('../vue/anim/Sprite.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/cssFunction.js' : 
			fs.readFile('../vue/cssFunction.js', function(error, content) {
			res.writeHead(200, {"Content-Type": "application/javascript"});
			res.end(content);})
			break;
			
		case '/mail3.png' : 
			fs.readFile('../vue/img/mail3.png', 'binary', function(error, content) {
			res.writeHead(200, {"Content-Type": "image/png"});
			res.write(content, "binary");
			res.end();})
			break;
			
		case '/trash5.png' : 
			fs.readFile('../vue/img/trash5.png', 'binary', function(error, content) {
			res.writeHead(200, {"Content-Type": "image/png"});
			res.write(content, "binary");
			res.end();})
			break;
			
		case '/sablier_sprite.png' : 
			fs.readFile('../vue/anim/sprites/sablier_sprite.png', 'binary', function(error, content) {
			res.writeHead(200, {"Content-Type": "image/png"});
			res.write(content, "binary");
			res.end();})
			break;
			
		}//end switch
}//end function requete

