"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var communication_1 = require("../../bibliotheque/communication");
var vueClient_1 = require("../../bibliotheque/vueClient");
var client_1 = require("../../bibliotheque/client");
var chat_1 = require("../commun/chat");
function adresseServeur() {
    return vueClient_1.donneeDynamique(document, 'adresseServeur');
}
function emetteur() {
    return vueClient_1.donneeDynamique(document, 'emetteur');
}
function destinataire(i) {
    return vueClient_1.donneeDynamique(document, 'destinataire' + i);
}
function creerMessage(texte, numDestinataire) {
    return new communication_1.Message({
        "emetteur": emetteur(),
        "destinataire": destinataire(numDestinataire),
        "type": chat_1.TypeMessageChat.COM,
        "contenu": texte,
        "date": Date.now()
    });
}
// A initialiser
var canal;
// A exécuter après chargement de la page
function initialisation() {
    canal = new client_1.CanalClient(adresseServeur());
    canal.enregistrerTraitementAReception(function (m) {
        var msg = m.enJSON();
        var d = new Date(msg.date); // TODO à améliorer
        var ds = d.toLocaleTimeString();
        vueClient_1.poster(document, 'logChats', msg.emetteur + " - " + ds + " : " + msg.contenu);
    });
    console.log("Initialisation du canal côté client en liaison avec le serveur : " + adresseServeur());
}
function envoyerMessage(texte, numDestinataire) {
    console.log(texte);
    canal.envoyerMessage(creerMessage(texte, numDestinataire));
}
//# sourceMappingURL=vueClientChat.js.map