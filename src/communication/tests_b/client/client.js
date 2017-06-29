/* **** FICHIERS JS INCLUS **** */


var donnees = new donneesServeur();
alert(donnees + "donnesServeur");
var MessagePourServeur = new Message();
var ws = new WebSocket('ws://localhost:8080', 'echo-protocol');


	
// Envoie du pseudo	
	var pseudo = prompt('Quel est votre pseudo ?');
	MessagePourServeur.remove();
	MessagePourServeur.type = "pseudo";
	MessagePourServeur.contenu = pseudo;
	var myJSON = JSON.stringify(MessagePourServeur);
	ws.send(myJSON);

	//Recevoir un message
	ws.addEventListener("message", function(JSONmsg) {
	var obj_JSON = JSON.parse(JSONmsg.data);
	console.log(JSONmsg.data);
	
		//On regarde le type de message	//On regarde le type de message
		switch(obj_JSON.type){
			case 'jeu1' :
			donnees.jeu1.recus.destinataire.push(obj_JSON.destinataire);
			donnees.jeu1.recus.jeu1.enTete.push(obj_JSON.enTete)
			donnees.jeu1.recus.jeu1.bits.push(obj_JSON.bits);
			donnees.jeu1.recus.jeu1.identifiant.push(obj_JSON.identifiant);	//id pour tracabilité du msg
			break;
			
		}//end switch
	});
	
alert(donnees + "client.js bascule");
			
/***************************************************************************************/


