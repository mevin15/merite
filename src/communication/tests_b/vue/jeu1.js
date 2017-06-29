//Charge les élements du jeu1
var a = 5;
require('Sprite.js', function() {
require('cssFunction.js', function() {
require('Ligne.js', function() {
require('Tableau.js', function() {
require('Cadre.js', function() {
require('Bouton.js', function() {
require('donneesServeur.js', function(){
	require('Message.js', function(){
require('client.js', function() {



alert(donnees + "jeu1");
document.body.style.backgroundColor = '#D1D12C';

// Cadre message reçu
			var ligneRecuEnTete = new Ligne(13);
			var ligneRecuBits= new Ligne(13);
			
			var tableauMessageRecu = new Tableau("Message recu()");
			tableauMessageRecu.addLigne(ligneRecuEnTete.Element);
			tableauMessageRecu.addLigne(ligneRecuBits.Element);
			
			var cadreMessageRecu = new Cadre(null, null, null, "20px","20px");
			cadreMessageRecu.addTableau(tableauMessageRecu.Element);

			var rec_bouton_envoyer_s = new Bouton("Envoyer au suivant", "-170px", "0px", "bas-droite", "160px", "27px");
			var rec_bouton_envoyer_p = new Bouton("Envoyer au précédent", "10px", "0px", "bas-gauche", "160px", "27px");
			

			
			cadreMessageRecu.addBouton(rec_bouton_envoyer_s);
			cadreMessageRecu.addBouton(rec_bouton_envoyer_p);
		
// Cadre créer un message
			var ligneCreerEnTete = new Ligne(13);
			var ligneCreerBits = new Ligne(13);
			var creer_message = new Tableau("Créer un message()");
			creer_message.addLigne(ligneCreerEnTete.Element);
			creer_message.addLigne(ligneCreerBits.Element);
			var cadreMessageCree = new Cadre(null, null, null, "20px","200px");
			cadreMessageCree.addTableau(creer_message.Element);

			var creer_bouton_envoyer_s = new Bouton("Envoyer au suivant", "-170px", "0px", "bas-droite", "160px", "27px");
			var creer_bouton_envoyer_p = new Bouton("Envoyer au précédent", "10px", "0px", "bas-gauche", "160px", "27px");


			cadreMessageCree.addBouton(creer_bouton_envoyer_s);
			cadreMessageCree.addBouton(creer_bouton_envoyer_p);
			
// Créer sablier animé
			var sablier = new Sprite('sablier_sprite.png', 13, 1000, 30, 40, null, 500, 50);
			sablier.jouer();

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		var eventMessageRecuSuivant = function(){
		donnees.recus.destinataire[0] = "suivant";
		envoyerR();
		ligneRecuEnTete.fill_0(); //la ligne à 0
		ligneRecuBits.fill_0(); //la ligne à 0
		ligneRecuEnTete.afficherMessage(donnees.recus.enTete[0]);
		ligneRecuBits.afficherMessage(donnees.recus.Bits[0]);
		};//end function eventMessageRecuSuivant
		
		var eventMessageRecuPrecedent = function(){
		donnees.recus.destinataire[0] = "precedent";
		envoyerR();
		ligneRecuEnTete.fill_0(); //la ligne à 0
		ligneRecuBits.fill_0(); //la ligne à 0
		ligneRecuEnTete.afficherMessage(donnees.recus.enTete[0]);
		ligneRecuBits.afficherMessage(donnees.recus.Bits[0]);
		};//end function eventMessageRecuSuivant

	
		var eventMessageCreeSuivant = function(){
		donnees.creer.destinataire = "suivant";
		envoyerC();
		ligneCreerEnTete.fill_0(); //la ligne à 0
		ligneCreerBits.fill_0(); //la ligne à 0
		};//end function eventMessageRecuSuivant
		
		var eventMessageCreePrecedent = function(){
		donnees.recus.destinataire = "precedent";
		envoyerC();
		ligneRecuEnTete.fill_0(); //la ligne à 0
		ligneCreerBits.fill_0(); //la ligne à 0
		};//end function eventMessageRecuSuivant
		
// Envoyer un message reçu
	var envoyerR = function(){
		MessagePourServeur.remove();
		MessagePourServeur.type = "jeu1";
		MessagePourServeur.enTete = donnees.recus.enTete[0];
		MessagePourServeur.bits = donnees.recus.bits[0];
		MessagePourServeur.identifiant = donnees.recus.identifiant[0];
		MessagePourServeur.destinataire = donnees.recus.destinataire[0];
		
		var myJSON = MessagePourServeur.stringify(MessagePourServeur);
		ws.send(myJSON);

		donnees.recus.enTete.splice(0,1); //on supprime le message envoyé
		donnees.recus.bits.splice(0,1); //on supprime le message envoyé
		donnees.recus.identifiant.splice(0,1); //on supprime le message envoyé
		donnees.recus.destinataire.splice(0,1); //on supprime le message envoyé
		
		//maSocket.nombreMessages -= 1;
		//Message_recu.changerTitre("Message reçus("+maSocket.nombreMessages+")");
		};

// Envoyer un message cree
	var envoyerC = function(){
			alert('8');
		MessagePourServeur.remove();
		MessagePourServeur.type = "jeu1";
		MessagePourServeur.enTete = ligneCreerEnTete.stringEtats;
		MessagePourServeur.bits = ligneCreerBits.stringEtats;
		MessagePourServeur.destinataire = donnees.recus.destinataire[0];
		
		var myJSON = MessagePourServeur.stringify(MessagePourServeur);
		alert('ws.send(myJSON);');
		ws.send(myJSON);
		
		//maSocket.nombreMessages -= 1;
		//Message_recu.changerTitre("Message reçus("+maSocket.nombreMessages+")");
		};
		
			creer_bouton_envoyer_s.addFunctionOnclick(eventMessageCreeSuivant);
			creer_bouton_envoyer_p.addFunctionOnclick(eventMessageCreePrecedent);
			rec_bouton_envoyer_s.addFunctionOnclick(eventMessageRecuSuivant);
			rec_bouton_envoyer_p.addFunctionOnclick(eventMessageRecuPrecedent);
});// donneesServeur.js
});// Message.js
			
}); //cssFunction.js
}); //Nsocket.js
}); //Ligne.js
}); //Tableau.js
}); //Cadre.js
}); //Bouton.js
}); //client.js