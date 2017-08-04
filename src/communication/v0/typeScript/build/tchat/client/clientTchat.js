"use strict";
exports.__esModule = true;
var types_1 = require("../../bibliotheque/types");
var vueClient_1 = require("../../bibliotheque/vueClient");
var client_1 = require("../../bibliotheque/client");
var tchat_1 = require("../commun/tchat");
console.log("* Chargement du script");
var adresseServeur = tchat_1.hote + ":" + tchat_1.port2;
// A initialiser
var canal;
var noeud;
function envoyerMessage(texte, ID_destinataire) {
    var msg = tchat_1.creerMessageCommunication(noeud.ex().centre.ID, ID_destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + msg.representer());
    canal.envoyerMessage(msg);
}
// A exécuter après chargement de la page
// - pas d'interruption de la fonction
function initialisation() {
    console.log("* Initialisation après chargement du DOM");
    console.log("- du canal de communication avec le serveur d'adresse " + adresseServeur);
    canal = client_1.creerCanalClient(adresseServeur);
    console.log("- du traitement des messages");
    canal.enregistrerTraitementMessageRecu(function (m) {
        var msg = new tchat_1.MessageTchat(m);
        console.log("* Réception");
        console.log("- du message brut : " + msg.brut());
        console.log("- du message net : " + msg.representer());
        vueClient_1.posterNL('logChats', msg.representer());
    });
    console.log("- du traitement de la configuration");
    canal.enregistrerTraitementConfigurationRecue(function (c) {
        var config = tchat_1.creerConfigurationTchat(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.representer());
        console.log("* Initialisation du noeud du réseau");
        noeud = tchat_1.creerNoeudTchatEX(tchat_1.decomposerConfiguration(config));
        voir();
    });
    console.log("- du traitement d'une erreur rédhibitoire");
    canal.enregistrerTraitementErreurRecue(function (err) {
        var erreur = tchat_1.creerErreurTchat(err);
        console.log("* Réception");
        console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
        console.log("- de l'erreur rédhibitoire nette : " + erreur.representer());
        console.log("* Initialisation du document");
        vueClient_1.initialiserDocument(erreur.representer());
    });
}
function voir() {
    console.log("* Consolidation de la vue");
    console.log("- adresse, centre, voisins");
    vueClient_1.poster("adresseServeur", adresseServeur);
    vueClient_1.poster("centre", tchat_1.creerSommetTchat(noeud.ex().centre).representer());
    vueClient_1.poster("voisins", types_1.creerTableImmutable(noeud.ex().voisins).representer());
    console.log("- formulaire");
    var contenuFormulaire = "";
    noeud.foncteurProceduralSurVoisins(function (v) {
        var ID_v = v.ID;
        vueClient_1.poster("formulaire", vueClient_1.elementSaisieEnvoi("message_" + ID_v.val, "boutonEnvoi_" + ID_v.val, "Envoyer un message à " + tchat_1.creerSommetTchat(v).representer() + "."));
    });
    var type = "click";
    noeud.foncteurProceduralSurVoisins(function (v) {
        var ID_v = v.ID;
        console.log("- Element " + ID_v.val + " : enregistrement d'un gestionnaire pour l'événement " + type);
        vueClient_1.gererEvenementElement("boutonEnvoi_" + ID_v.val, type, function (e) {
            var entree = vueClient_1.recupererEntree("message_" + ID_v.val);
            vueClient_1.initialiserEntree("message_" + ID_v.val, "");
            console.log("* Entree : " + entree);
            envoyerMessage(entree, ID_v);
        });
    });
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