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
var types_1 = require("../../bibliotheque/types");
var outils_1 = require("../../bibliotheque/outils");
exports.hote = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
exports.port1 = 3001; // port de la essource 1 (serveur d'applications)
exports.port2 = 1111; // port de la ressouce 2 (serveur de connexions)
var TypeMessageTchat;
(function (TypeMessageTchat) {
    TypeMessageTchat[TypeMessageTchat["COM"] = 0] = "COM";
    TypeMessageTchat[TypeMessageTchat["TRANSIT"] = 1] = "TRANSIT";
    TypeMessageTchat[TypeMessageTchat["AR"] = 2] = "AR";
    TypeMessageTchat[TypeMessageTchat["ERREUR_CONNEXION"] = 3] = "ERREUR_CONNEXION";
    TypeMessageTchat[TypeMessageTchat["ERREUR_EMET"] = 4] = "ERREUR_EMET";
    TypeMessageTchat[TypeMessageTchat["ERREUR_DEST"] = 5] = "ERREUR_DEST";
    TypeMessageTchat[TypeMessageTchat["ERREUR_TYPE"] = 6] = "ERREUR_TYPE";
    TypeMessageTchat[TypeMessageTchat["INTERDICTION"] = 7] = "INTERDICTION";
})(TypeMessageTchat = exports.TypeMessageTchat || (exports.TypeMessageTchat = {}));
var MessageTchat = (function (_super) {
    __extends(MessageTchat, _super);
    function MessageTchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageTchat.prototype.net = function () {
        var msg = this.enJSON();
        return JSON.stringify({
            type: TypeMessageTchat[msg.type],
            date: outils_1.dateFr(msg.date),
            de: msg.emetteur,
            à: msg.destinataire,
            contenu: msg.contenu
        });
    };
    return MessageTchat;
}(communication_1.Message));
exports.MessageTchat = MessageTchat;
function creerMessageErreurConnexion(emetteur, messageErreur) {
    return new MessageTchat({
        "emetteur": emetteur,
        "destinataire": emetteur,
        "type": TypeMessageTchat.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": new Date()
    });
}
exports.creerMessageErreurConnexion = creerMessageErreurConnexion;
function creerMessageCommunication(emetteur, destinataire, texte) {
    return new MessageTchat({
        "emetteur": emetteur,
        "destinataire": destinataire,
        "type": TypeMessageTchat.COM,
        "contenu": texte,
        "date": new Date()
    });
}
exports.creerMessageCommunication = creerMessageCommunication;
function creerMessageRetourErreur(original, codeErreur, messageErreur) {
    return new MessageTchat({
        "emetteur": original.enJSON().emetteur,
        "destinataire": original.enJSON().destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.enJSON().date
    });
}
exports.creerMessageRetourErreur = creerMessageRetourErreur;
function creerMessageTransit(msg) {
    return new MessageTchat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageTchat.TRANSIT,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}
exports.creerMessageTransit = creerMessageTransit;
function creerMessageAR(msg) {
    return new MessageTchat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageTchat.AR,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}
exports.creerMessageAR = creerMessageAR;
var ConfigurationTchat = (function (_super) {
    __extends(ConfigurationTchat, _super);
    function ConfigurationTchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigurationTchat.prototype.net = function () {
        var config = this.enJSON();
        return JSON.stringify({
            centre: config.centre,
            voisins: config.voisins,
            date: outils_1.dateFr(config.date)
        });
    };
    return ConfigurationTchat;
}(communication_1.Configuration));
exports.ConfigurationTchat = ConfigurationTchat;
function creerConfiguration(n, date) {
    return new ConfigurationTchat({
        "configurationInitiale": types_1.Unite.un,
        "centre": n.centre().enJSON(),
        voisins: n.voisinsEnJSON(),
        "date": date
    });
}
exports.creerConfiguration = creerConfiguration;
function creerNoeudDeConfiguration(c) {
    var centre = c.enJSON().centre;
    var voisins = c.enJSON().voisins;
    return communication_1.creerNoeud(centre, voisins, creerSommetTchat);
}
exports.creerNoeudDeConfiguration = creerNoeudDeConfiguration;
var ErreurTchat = (function (_super) {
    __extends(ErreurTchat, _super);
    function ErreurTchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErreurTchat.prototype.net = function () {
        var erreur = this.enJSON();
        return JSON.stringify({
            messageErreur: erreur.messageErreur,
            date: outils_1.dateFr(erreur.date)
        });
    };
    return ErreurTchat;
}(communication_1.ErreurRedhibitoire));
exports.ErreurTchat = ErreurTchat;
function creerMessageErreur(msg, date) {
    return new ErreurTchat({
        "erreurRedhibitoire": types_1.Unite.un,
        "messageErreur": msg,
        "date": date
    });
}
exports.creerMessageErreur = creerMessageErreur;
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
function creerSommetTchat(s) {
    return new SommetChat(s);
}
exports.creerSommetTchat = creerSommetTchat;
function creerAnneauTchat(noms) {
    var assembleur = new communication_1.AssemblageReseauEnAnneau(noms.length);
    noms.forEach(function (nom, i, tab) {
        var s = new SommetChat({ id: "id-" + i, pseudo: tab[i] });
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
exports.creerAnneauTchat = creerAnneauTchat;
//# sourceMappingURL=tchat.js.map