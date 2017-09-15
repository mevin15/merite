var maSocket = new Nsocket();

const adresseServeur = 'http://127.0.0.1:8080';

//var socket = io.connect('http://192.168.1.11:8080');
//var socket = io.connect('http://172.22.161.15:8080');
var socket = io.connect(adresseServeur);

    socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    })
	
	var pseudo = prompt('Quel est votre pseudo ?');
	socket.emit('nouveau_client', pseudo);
	maSocket.pseudo = pseudo;
	
//Recevoir un message
    socket.on('rec_en_tete', function(Mrec_en_tete) {
        maSocket.rec_en_tete.push(Mrec_en_tete);
		maSocket.nombreMessages += 1;
		Message_recu.changerTitre("Message reçus("+maSocket.nombreMessages+")");
		rec_en_tete.afficherMessage(Mrec_en_tete);
    })
	
    socket.on('rec_contenu', function(Mrec_contenu) {
        maSocket.rec_contenu.push(Mrec_contenu);
		rec_contenu.afficherMessage(Mrec_contenu);
    })

// Envoyer un message reçu
	var rec_cliquer_envoyer_s = function(){
		socket.emit('rec_cible', "suivant");
		socket.emit('rec_en_tete', rec_en_tete.stringEtats);
		socket.emit('rec_contenu', rec_contenu.stringEtats);
		rec_en_tete.fill_0(); //la ligne à 0
		rec_contenu.fill_0(); //la ligne à 0
		maSocket.rec_en_tete.splice(0,1); //on supprime le message envoyé
		maSocket.rec_contenu.splice(0,1); //on supprime le message envoyé
		maSocket.nombreMessages -= 1;
		Message_recu.changerTitre("Message reçus("+maSocket.nombreMessages+")");
		};
	
	rec_bouton_envoyer_s.addFunctionOnclick(rec_cliquer_envoyer_s);
	
	var rec_cliquer_envoyer_p = function(){
		socket.emit('rec_cible', "precedent");
		socket.emit('rec_en_tete', rec_en_tete.stringEtats);
		socket.emit('rec_contenu', rec_contenu.stringEtats);
		rec_en_tete.fill_0(); //la ligne à 0
		rec_contenu.fill_0(); //la ligne à 0
		maSocket.rec_en_tete.splice(0,1); //on supprime le message envoyé
		maSocket.rec_contenu.splice(0,1); //on supprime le message envoyé
		maSocket.nombreMessages -= 1;
		Message_recu.changerTitre("Message reçus("+maSocket.nombreMessages+")");
		};
	
	rec_bouton_envoyer_p.addFunctionOnclick(rec_cliquer_envoyer_p);

// Envoyer un message crée
	var creer_cliquer_envoyer_s = function(){
		socket.emit('creer_cible', "suivant");
		socket.emit('creer_en_tete', new_en_tete.stringEtats);
		socket.emit('creer_contenu', new_contenu.stringEtats);
		new_en_tete.fill_0(); //la ligne à 0
		new_contenu.fill_0(); //la ligne à 0
		maSocket.new_en_tete.splice(0,1); //on supprime le message envoyé
		maSocket.new_contenu.splice(0,1); //on supprime le message envoyé
		

		};
	
	creer_bouton_envoyer_s.addFunctionOnclick(creer_cliquer_envoyer_s);
	
	var creer_cliquer_envoyer_p = function(){
		socket.emit('creer_cible', "precedent");
		socket.emit('creer_en_tete', new_en_tete.stringEtats);
		socket.emit('creer_contenu', new_contenu.stringEtats);
		new_en_tete.fill_0(); //la ligne à 0
		new_contenu.fill_0(); //la ligne à 0
		maSocket.new_en_tete.splice(0,1); //on supprime le message envoyé
		maSocket.new_contenu.splice(0,1); //on supprime le message envoyé
		
		};
	
	creer_bouton_envoyer_p.addFunctionOnclick(creer_cliquer_envoyer_p);
	
	
