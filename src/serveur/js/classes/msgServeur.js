var clients 				= require('./../../../modele/clients.js');

class msgServeur{
	constructor(){
		this.type;
		this.destinataire;
		this.enTete;
		this.bits;	
		this.identifiant; //id pour tracabilité du msg
	} //end constructor
} //end class

var msg = new msgServeur(id);
		
module.exports = {
	build : function(id){
		msg.destinataire = clients.listeClients[id-1].destinataire[0];
		msg.enTete = clients.listeClients[id-1].enTete[0];
		msg.bits = clients.listeClients[id-1].bits[0];
		msg.identifiant = clients.listeClients[id-1].identifiant[0];
		
		clients.listeClients[id-1].destinataire.splice(0,1);
		clients.listeClients[id-1].enTete.splice(0,1);
		clients.listeClients[id-1].bits.splice(0,1);
		clients.listeClients[id-1].identifiant.splice(0,1);
		return msg;
	}//end function addClient
}//end module export