"use strict";
exports.__esModule = true;
var vueClient_1 = require("../../bibliotheque/vueClient");
var client_1 = require("../../bibliotheque/client");
var tchat_1 = require("../commun/tchat");
var outils_1 = require("../../bibliotheque/outils");
console.log("* Chargement du script");
/* Test - déclaration d'une variable externe - Possible
cf. declare
*/
var adresseServeur = tchat_1.hote + ":" + tchat_1.port2;
// A initialiser
var canal;
var noeud;
function envoyerMessage(texte, destinataire) {
    var msg = tchat_1.creerMessageCommunication(noeud.centre().enJSON().id, destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + msg.net());
    canal.envoyerMessage(msg);
}
// A exécuter après chargement de la page
// - pas d'interruption de la fonction
function initialisation() {
    console.log("* Initialisation après chargement du DOM");
    console.log("- du canal de communication avec le serveur d'adresse " + adresseServeur);
    canal = new client_1.CanalClient(adresseServeur);
    console.log("- du traitement des messages");
    canal.enregistrerTraitementMessageRecu(function (m) {
        var msg = new tchat_1.MessageTchat(m);
        console.log("* Réception");
        console.log("- du message brut : " + msg.brut());
        console.log("- du message net : " + msg.net());
        vueClient_1.posterNL('logChats', msg.net());
    });
    console.log("- du traitement de la configuration");
    canal.enregistrerTraitementConfigurationRecue(function (c) {
        var config = new tchat_1.ConfigurationTchat(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.net());
        console.log("* Initialisation du noeud du réseau");
        noeud = tchat_1.creerNoeudDeConfiguration(config);
        voir();
    });
    console.log("- du traitement d'une erreur rédhibitoire");
    canal.enregistrerTraitementErreurRecue(function (err) {
        var erreur = new tchat_1.ErreurTchat(err);
        console.log("* Réception");
        console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
        console.log("- de l'erreur rédhibitoire nette : " + erreur.net());
        console.log("* Initialisation du document");
        vueClient_1.initialiserDocument(outils_1.dateFr(erreur.enJSON().date) + " : " + erreur.enJSON().messageErreur);
    });
}
function voir() {
    console.log("* Consolidation de la vue");
    console.log("- adresse, centre, voisins");
    vueClient_1.poster("adresseServeur", adresseServeur);
    vueClient_1.poster("centre", noeud.centre().net());
    vueClient_1.poster("voisins", JSON.stringify(noeud.voisinsEnJSON()));
    console.log("- formulaire");
    var voisinsNoeud = noeud.voisinsEnJSON();
    var repVoisinsNoeud = JSON.stringify(voisinsNoeud);
    var contenuFormulaire = "";
    for (var idV in voisinsNoeud) {
        vueClient_1.poster("formulaire", vueClient_1.elementSaisieEnvoi("message_" + idV, "boutonEnvoi_" + idV, "Envoyer un message à " + noeud.voisin(idV).enJSON().pseudo + "."));
    }
    var type = "click";
    var _loop_1 = function (idV) {
        console.log("- Element " + idV + " : enregistrement d'un gestionnaire pour l'événement " + type);
        vueClient_1.gererEvenementElement("boutonEnvoi_" + idV, type, function (e) {
            var entree = vueClient_1.recupererEntree("message_" + idV);
            vueClient_1.initialiserEntree("message_" + idV, "");
            console.log("* Entree : " + entree);
            envoyerMessage(entree, idV);
        });
    };
    for (var idV in voisinsNoeud) {
        _loop_1(idV);
    }
    /*
      <input type="text" id="message_id1">
      <input class="button" type="button" id="boutonEnvoi_id1" value="Envoyer un message à {{nom id1}}."
         onClick="envoyerMessage(this.form.message.value, "id1")">
    */
}
// Gestion des événements pour le document
console.log("* Enregistrement de l'initialisation au chargement");
vueClient_1.gererEvenementDocument('DOMContentLoaded', initialisation);
/*
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', initialisation());
</script>

*/
//# sourceMappingURL=clientTchat.js.map