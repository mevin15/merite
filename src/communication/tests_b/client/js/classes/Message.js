class Message {
	constructor(){
		this.type; //jeu1
		this.contenu = function()
		{
			this.enTete;
			this.bits;
		};
		this.emetteur; //qui a créé le message ?
		this.identifiant; //Un numéro de message pour le traçage
		this.destinataire; //suivant precedent
	}
	
	remove(){
		this.type = undefined;
		this.contenu = function()
		{
			this.enTete = undefined;
			this.bits = undefined;
		};
		this.emetteur = undefined; //qui a créé le message ?
		this.identifiant = undefined; //Un numéro de message pour le traçage
		this.destinataire = undefined; //suivant precedent
	}
}