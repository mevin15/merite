/* **** MODULES INCLUS **** */
var vm = require('vm');
var fs = require('fs');

/* **** FICHIERS JS INCLUS **** */
var clients 				= require('./../../../modele/clients.js');
var msgServeur 				= require('./../../../serveur/js/classes/msgServeur.js');

module.exports = function(clients){
	//Si le serveur reçoit un message, il vérifie sur touz les objets sockets les messages
	//à envoyer et il les transmet
		for(var i=0; i<clients.listeClients.length; i++){
		//console.log("liste des clients :" + clients + "Nombre :  " + clients.length);
		
		
		//console.log("le client i="+i+" fait passer un message existant au " + clients[i].rec_cible[0]);
			//Si un message est disponible
			if (clients.listeClients[i].destinataire[0] !== undefined){
								var nvlCible = i+1;
								if(nvlCible >= clients.listeClients.length){nvlCible=0;}
								if(nvlCible < 0){nvlCible=clients.listeClients.length-1;}
								console.log("Le client "+clients.listeClients[i].pseudo+" transmet un message au " + clients.listeClients[i].destinataire +" donc le client " + clients.listeClients[nvlCible].pseudo + " le message " + clients.listeClients[i].enTete[0] + "  " + clients.listeClients[i].bits[0]);
								clients.listeClients[nvlCible].Element.sendUTF(msgServeur(i).stringify);
			}//end if
		}//end for
	
	
	
	
	
	
	} //end function