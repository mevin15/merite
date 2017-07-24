"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var communication_1 = require("../../bibliotheque/communication");
var TypeMessageChat;
(function (TypeMessageChat) {
    TypeMessageChat[TypeMessageChat["COM"] = 0] = "COM";
    TypeMessageChat[TypeMessageChat["TRANSIT"] = 1] = "TRANSIT";
    TypeMessageChat[TypeMessageChat["AR"] = 2] = "AR";
    TypeMessageChat[TypeMessageChat["ERREUR_CONNEXION"] = 3] = "ERREUR_CONNEXION";
    TypeMessageChat[TypeMessageChat["ERREUR_EMET"] = 4] = "ERREUR_EMET";
    TypeMessageChat[TypeMessageChat["ERREUR_DEST"] = 5] = "ERREUR_DEST";
    TypeMessageChat[TypeMessageChat["ERREUR_TYPE"] = 6] = "ERREUR_TYPE";
    TypeMessageChat[TypeMessageChat["INTERDICTION"] = 7] = "INTERDICTION";
})(TypeMessageChat = exports.TypeMessageChat || (exports.TypeMessageChat = {}));
var MessageChat = (function (_super) {
    __extends(MessageChat, _super);
    function MessageChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageChat.prototype.net = function () {
        var msg = this.enJSON();
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return JSON.stringify({
            type: TypeMessageChat[msg.type],
            date: (new Date(msg.date)).toLocaleString("fr-FR", options),
            de: msg.emetteur,
            à: msg.destinataire,
            contenu: msg.contenu
        });
    };
    return MessageChat;
}(communication_1.Message));
exports.MessageChat = MessageChat;
function creerMessageErreurConnexion(emetteur, messageErreur) {
    return new MessageChat({
        "emetteur": emetteur,
        "destinataire": emetteur,
        "type": TypeMessageChat.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": new Date()
    });
}
exports.creerMessageErreurConnexion = creerMessageErreurConnexion;
function creerMessageCommunication(emetteur, destinataire, texte) {
    return new MessageChat({
        "emetteur": emetteur,
        "destinataire": destinataire,
        "type": TypeMessageChat.COM,
        "contenu": texte,
        "date": new Date()
    });
}
exports.creerMessageCommunication = creerMessageCommunication;
function creerMessageRetourErreur(original, codeErreur, messageErreur) {
    return new MessageChat({
        "emetteur": original.enJSON().emetteur,
        "destinataire": original.enJSON().destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.enJSON().date
    });
}
exports.creerMessageRetourErreur = creerMessageRetourErreur;
function creerMessageTransit(msg) {
    return new MessageChat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageChat.TRANSIT,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}
exports.creerMessageTransit = creerMessageTransit;
function creerMessageAR(msg) {
    return new MessageChat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageChat.AR,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}
exports.creerMessageAR = creerMessageAR;
var SommetChat = (function (_super) {
    __extends(SommetChat, _super);
    function SommetChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SommetChat.prototype.net = function () {
        var msg = this.enJSON();
        return JSON.stringify({
            nom: msg.pseudo + "(" + msg.id + ")"
        });
    };
    return SommetChat;
}(communication_1.Sommet));
exports.SommetChat = SommetChat;
function fabriqueSommetChat(s) {
    return new SommetChat(s);
}
exports.fabriqueSommetChat = fabriqueSommetChat;
function creerAnneauChat(noms) {
    var assembleur = new communication_1.AssemblageReseauEnAnneau(noms.length);
    noms.forEach(function (nom, i, tab) {
        var s = new SommetChat({ id: "id-" + i, pseudo: tab[i] });
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
exports.creerAnneauChat = creerAnneauChat;
//# sourceMappingURL=chat.js.map