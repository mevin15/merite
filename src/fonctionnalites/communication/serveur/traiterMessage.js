/* **** MODULES INCLUS **** */
var vm = require('vm');
var fs = require('fs');

/* **** FICHIERS JS INCLUS **** */
var clients 				= require('./../../../modele/clients.js');

module.exports = function(JSONmsg, id){
	var obj_JSON = JSON.parse(JSONmsg);
	console.log(obj_JSON);
	
	//On regarde le type de message
	switch(obj_JSON.type){
		case 'pseudo' :
		console.log("Nouveau pseudo sur le client " + id + " : " + obj_JSON.contenu)
		clients.listeClients[id-1].pseudo = obj_JSON.contenu;
		break;
		
		case 'jeu1' :
		clients.listeClients[id-1].enTete.push(obj_JSON.contenu.enTete);
		clients.listeClients[id-1].bits.push(obj_JSON.contenu.bits);
		if (obj_JSON.emetteur !== true){//il n'y a pas d'emetteur, c'est un msg crée
			clients.listeClients[id-1].emetteur.push(id);
		}
		else {
			clients.listeClients[id-1].emetteur.push(obj_JSON.emetteur);
		}
			if (obj_JSON.identifiant !== true){//il n'y a pas d'identifiant, on en crée un
			clients.identifiant += 1;
			clients.listeClients[id-1].identifiant.push(clients.identifiant);
		}
		else {
			clients.listeClients[id-1].identifiant.push(obj_JSON.identifiant);
		}
		clients.listeClients[id-1].destinataire.push(obj_JSON.destinataire);
		Message_a_transmettre();
		break;
		
	}//end switch
}// end module export