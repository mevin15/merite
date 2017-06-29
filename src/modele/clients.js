class Socket_Client{
	constructor(Element){
// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
	// Attributs relatifs à la socket
		this.Element = Element;
		this.nombreMessages = 0;
		this.pseudo = "";
		this.messages = 0;
		this.id = 0;

 //Les messages reçus sont à transmettre de nouveau
		this.destinataire = [];
		this.enTete = [];
		this.bits = [];	
		this.identifiant = []; //id pour tracabilité du msg
		
	} //end constructor
} //end class

module.exports = {
	listeClients: [], //tableau d'objets Socket_Client
	identifiant : 0,
	addClient : function(Element){
		var nouvelleSocket = new Socket_Client(Element);
		this.listeClients.push(nouvelleSocket);
		nouvelleSocket.id = this.listeClients.length;
		return nouvelleSocket.id;
	}//end function addClient
}//end module export