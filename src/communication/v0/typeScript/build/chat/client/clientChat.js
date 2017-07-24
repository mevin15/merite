"use strict";
exports.__esModule = true;
var communication_1 = require("../../bibliotheque/communication");
var vueClient_1 = require("../../bibliotheque/vueClient");
var client_1 = require("../../bibliotheque/client");
var chat_1 = require("../commun/chat");
console.log("* Chargement du script");
/* Test - déclaration d'une variable externe - Possible
cf. declare
*/
function centreNoeud() {
    return JSON.parse(vueClient_1.contenuBalise(document, 'centre'));
}
function voisinsNoeud() {
    var v = JSON.parse(vueClient_1.contenuBalise(document, 'voisins'));
    var r = [];
    var id;
    for (id in v) {
        r.push(v[id]);
    }
    return r;
}
function adresseServeur() {
    return vueClient_1.contenuBalise(document, 'adresseServeur');
}
// A initialiser
var canal;
var noeud;
function envoyerMessage(texte, destinataire) {
    var msg = chat_1.creerMessageCommunication(noeud.centre().enJSON().id, destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + msg.net());
    canal.envoyerMessage(msg);
    vueClient_1.initialiserEntree('message_' + destinataire, "");
}
// A exécuter après chargement de la page
function initialisation() {
    console.log("* Initialisation après chargement du DOM ...");
    noeud = communication_1.creerNoeud(centreNoeud(), voisinsNoeud(), chat_1.fabriqueSommetChat);
    canal = new client_1.CanalClient(adresseServeur());
    canal.enregistrerTraitementAReception(function (m) {
        var msg = new chat_1.MessageChat(m);
        console.log("- Réception du message brut : " + msg.brut());
        console.log("- Réception du message net : " + msg.net());
        vueClient_1.posterNL('logChats', msg.net());
    });
    console.log("* ... du noeud et du canal côté client en liaison avec le serveur : " + adresseServeur());
    // Gestion des événements pour les éléments du document.
    //document.getElementById("boutonEnvoi").addEventListener("click", <EventListenerOrEventListenerObject>(e => {alert("click!");}), true);
    var id;
    var v = noeud.voisins();
    var _loop_1 = function () {
        console.log("id : " + id);
        var idVal = id;
        vueClient_1.gererEvenementElement("boutonEnvoi_" + idVal, "click", function (e) {
            console.log("id message_" + idVal);
            console.log("entree : " + vueClient_1.recupererEntree("message_" + idVal));
            envoyerMessage(vueClient_1.recupererEntree("message_" + idVal), idVal);
        });
    };
    for (id in v) {
        _loop_1();
    }
    /*
    <form id="envoi">
    
      <input type="text" id="message_id1">
          
      <input class="button" type="button" id="boutonEnvoi_id1" value="Envoyer un message à {{nom id1}}."
         onClick="envoyerMessage(this.form.message.value, "id1")">
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
//# sourceMappingURL=clientChat.js.map