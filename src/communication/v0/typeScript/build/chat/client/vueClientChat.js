"use strict";
exports.__esModule = true;
var vueClient_1 = require("../../bibliotheque/vueClient");
var client_1 = require("../../bibliotheque/client");
var chat_1 = require("../commun/chat");
console.log("* Chargement du script");
function adresseServeur() {
    return vueClient_1.contenuBalise(document, 'adresseServeur');
}
function emetteur() {
    return vueClient_1.contenuBalise(document, 'emetteur');
}
function destinataire(i) {
    return vueClient_1.contenuBalise(document, 'destinataire' + i);
}
// A initialiser
var canal;
function envoyerMessage(texte, numDestinataire) {
    var msg = chat_1.creerMessageInitial(emetteur(), destinataire(numDestinataire), texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + msg.net());
    canal.envoyerMessage(msg);
}
// A exécuter après chargement de la page
function initialisation() {
    console.log("* Initialisation après chargement du DOM ...");
    canal = new client_1.CanalClient(adresseServeur());
    canal.enregistrerTraitementAReception(function (m) {
        var msg = new chat_1.MessageChat(m);
        console.log("- Réception du message brut : " + msg.brut());
        console.log("- Réception du message net : " + msg.net());
        vueClient_1.poster(document, 'logChats', msg.net());
    });
    console.log("* ... du canal côté client en liaison avec le serveur : " + adresseServeur());
    // Gestion des événements pour les éléments du document.
    //document.getElementById("boutonEnvoi").addEventListener("onclick", <EventListenerOrEventListenerObject>(e => {alert("click!");}), true);
    vueClient_1.gererEvenementElement("boutonEnvoi", "click", function (e) {
        envoyerMessage(vueClient_1.entreeParId("message").value, 1);
    });
    /*
    <form id="envoi">
    
      <input type="text" id="message">
          
      <input class="button" type="button" id="boutonEnvoi" value="Envoyer un message."
         onClick="envoyerMessage(this.form.message.value, 1)">
    </form>
        
    */
    console.log("* ... et des gestionnaires d'événements sur des éléments du document.");
}
// Gestion des événements pour le document
console.log("* Enregistrement de l'initialisation");
vueClient_1.gererEvenementDocument('DOMContentLoaded', initialisation);
/*
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', initialisation());
</script>

*/
//# sourceMappingURL=vueClientChat.js.map