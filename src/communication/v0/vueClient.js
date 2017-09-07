function adresseServeur(doc){
    return donneeDynamique(doc, 'adresseServeur');
}

function emetteur(doc){
    return donneeDynamique(doc, 'emetteur');
}

function destinataire(doc){

function creerMessage(doc, texte){
    return new Message({
	"emetteur" : emetteur(doc)
	"destinataire" : destinataire
       "type": "message",
       "contenu": texte,
       
       "date": Date.now()
   });
}




// Document -> String
function donneeDynamique(doc, champ){
    return document.getElementById(champ).innerHTML;
}


