function Socket_Client(){
// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
	// Attributs relatifs à la socket
		this.Element;
		this.nombreMessages = 0;
		this.pseudo = "";
		this.messages = 0;
		this.position = 0;

 //Les messages reçus sont à transmettre de nouveau
		this.rec_cible = [];
		this.rec_en_tete = [];
		this.rec_contenu = [];
		
 //Le client a créé un nouveau message, il veut l'envoyer
		this.creer_cible = [];
		this.creer_en_tete = []
		this.creer_contenu = [];		

		
// -------------------------------------------- METHODES --------------------------------------------------------------

// -------------------------------------------- FONCTIONS --------------------------------------------------------------
	
} //end objet
