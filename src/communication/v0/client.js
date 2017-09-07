class Message {
    constructor(enJSON) {
	this._enJSON = enJSON; // JSON
    };
    enJSON(){
	return this._enJSON;
    };
    
    enSerie(){
	return JSON.stringify(this.enJSON());
    };
};

class Canal {
    constructor(adresse){
	this.adresse = adresse;
	this.lienServeur = new WebSocket('ws://' + this.adresse, 'echo-protocol');
    };

    // Message -> void(effet : send(String))
    envoyerMessage(msg){
	lienServeur.send(msg.enSerie());
    };

    // (Message -> void(effet ?)) -> void(effet: enregistrement comme écouteur)
    enregistrerTraitementAReception(traitement){
	this.lienServeur.addEventListener("message", function(e) {
	    var msg = JSON.parse(e.data);
	    traitement(new Message(msg));
	});
    };
};

class Noeud {
    constructor(listeVoisins){
	this.listeVoisins = listeVoisins;
    };

    nombreVoisins(){
	return this.listeVoisins.length;
    };

    obtenirVoisin(i){
	return this.listeVoisins[i];
    };

};
