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
exports.port1 = 3000; // port de la essource 1 (serveur d'applications)
exports.port2 = 1110; // port de la ressouce 2 (serveur de connexions)
function conversionFormatSommet(s) {
    return { ID: s.ID, pseudo: s.pseudo };
}
// La structure JSON décrivant le sommet est en lecture seulement. 
var SommetTchat = (function (_super) {
    __extends(SommetTchat, _super);
    function SommetTchat(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    SommetTchat.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'nom': return s.pseudo;
            case 'ID': return s.ID.sommet;
        }
        return undefined; // impossible
    };
    SommetTchat.prototype.representer = function () {
        return this.net('nom') + " (" + this.net('ID') + ")";
    };
    return SommetTchat;
}(communication_1.Sommet));
exports.SommetTchat = SommetTchat;
function creerSommetTchat(s) {
    return new SommetTchat(s);
}
exports.creerSommetTchat = creerSommetTchat;
var NoeudTchatIN = (function (_super) {
    __extends(NoeudTchatIN, _super);
    function NoeudTchatIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoeudTchatIN.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(s.centre).representer();
            case 'voisins':
                return types_1.creerTableImmutable(s.voisins).representer();
        }
        return undefined; // impossible
    };
    NoeudTchatIN.prototype.representer = function () {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    };
    return NoeudTchatIN;
}(communication_1.NoeudIN));
exports.NoeudTchatIN = NoeudTchatIN;
function creerNoeudTchatIN(n) {
    return new NoeudTchatIN(n);
}
exports.creerNoeudTchatIN = creerNoeudTchatIN;
var NoeudTchatEX = (function (_super) {
    __extends(NoeudTchatEX, _super);
    function NoeudTchatEX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoeudTchatEX.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(s.centre).representer();
            case 'voisins':
                return types_1.creerTableImmutable(s.voisins).representer();
        }
        return undefined; // impossible
    };
    NoeudTchatEX.prototype.representer = function () {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    };
    return NoeudTchatEX;
}(communication_1.NoeudEX));
exports.NoeudTchatEX = NoeudTchatEX;
function creerNoeudTchatEX(n) {
    return new NoeudTchatEX(n);
}
exports.creerNoeudTchatEX = creerNoeudTchatEX;
var ReseauTchat = (function (_super) {
    __extends(ReseauTchat, _super);
    function ReseauTchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReseauTchat;
}(communication_1.Reseau));
exports.ReseauTchat = ReseauTchat;
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
// Structure immutable
var MessageTchat = (function (_super) {
    __extends(MessageTchat, _super);
    function MessageTchat(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    MessageTchat.prototype.net = function (e) {
        var msg = this.ex();
        switch (e) {
            case 'type': return TypeMessageTchat[msg.type];
            case 'date': return outils_1.dateFr(msg.date);
            case 'ID_de': return msg.ID_emetteur.sommet;
            case 'ID_à': return msg.ID_destinataire.sommet;
            case 'contenu': return msg.contenu;
        }
        return undefined; // impossible
    };
    MessageTchat.prototype.representer = function () {
        var dem = this.net('ID_de');
        var am = this.net('ID_à');
        var typem = this.net('type');
        var datem = this.net('date');
        var cm = this.net('contenu');
        return datem + ", de " + dem + " à " + am + " (" + typem + ") - " + cm;
    };
    MessageTchat.prototype.transit = function () {
        var msg = this.ex();
        return new MessageTchat({
            "ID_emetteur": msg.ID_emetteur,
            "ID_destinataire": msg.ID_destinataire,
            "type": TypeMessageTchat.TRANSIT,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    MessageTchat.prototype.avecAccuseReception = function () {
        var msg = this.ex();
        return new MessageTchat({
            "ID_emetteur": msg.ID_emetteur,
            "ID_destinataire": msg.ID_destinataire,
            "type": TypeMessageTchat.AR,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    return MessageTchat;
}(communication_1.Message));
exports.MessageTchat = MessageTchat;
function creerMessageErreurConnexion(idEmetteur, messageErreur) {
    return new MessageTchat({
        "ID_emetteur": idEmetteur,
        "ID_destinataire": idEmetteur,
        "type": TypeMessageTchat.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": new Date()
    });
}
exports.creerMessageErreurConnexion = creerMessageErreurConnexion;
function creerMessageCommunication(idEmetteur, idDestinataire, texte) {
    return new MessageTchat({
        "ID_emetteur": idEmetteur,
        "ID_destinataire": idDestinataire,
        "type": TypeMessageTchat.COM,
        "contenu": texte,
        "date": new Date()
    });
}
exports.creerMessageCommunication = creerMessageCommunication;
function creerMessageRetourErreur(original, codeErreur, messageErreur) {
    return new MessageTchat({
        "ID_emetteur": original.ex().ID_emetteur,
        "ID_destinataire": original.ex().ID_destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.ex().date
    });
}
exports.creerMessageRetourErreur = creerMessageRetourErreur;
var ConfigurationTchat = (function (_super) {
    __extends(ConfigurationTchat, _super);
    function ConfigurationTchat(c) {
        return _super.call(this, function (x) { return x; }, c) || this;
    }
    ConfigurationTchat.prototype.net = function (e) {
        var config = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(config.centre).representer();
            case 'voisins': return types_1.creerTableImmutable(config.voisins).representer();
            case 'date': return outils_1.dateFr(config.date);
        }
        return undefined; // impossible
    };
    ConfigurationTchat.prototype.representer = function () {
        var cc = this.net('centre');
        var vc = this.net('voisins');
        var dc = this.net('date');
        return "(centre : " + cc + " ; voisins : " + vc + ") créée " + dc;
    };
    return ConfigurationTchat;
}(communication_1.Configuration));
exports.ConfigurationTchat = ConfigurationTchat;
function creerConfigurationTchat(c) {
    return new ConfigurationTchat(c);
}
exports.creerConfigurationTchat = creerConfigurationTchat;
function composerConfigurationJeu1(n, date) {
    return new ConfigurationTchat({
        "configurationInitiale": types_1.Unite.un,
        "centre": n.centre,
        "voisins": n.voisins,
        "date": date
    });
}
exports.composerConfigurationJeu1 = composerConfigurationJeu1;
function decomposerConfiguration(c) {
    var centre = c.ex().centre;
    var voisins = c.ex().voisins;
    return { "centre": centre, "voisins": voisins };
}
exports.decomposerConfiguration = decomposerConfiguration;
var ErreurTchat = (function (_super) {
    __extends(ErreurTchat, _super);
    function ErreurTchat(err) {
        return _super.call(this, function (x) { return x; }, err) || this;
    }
    ErreurTchat.prototype.net = function (e) {
        var erreur = this.ex();
        switch (e) {
            case 'messageErreur': return erreur.messageErreur;
            case 'date': return outils_1.dateFr(erreur.date);
        }
        return undefined; // impossible
    };
    ErreurTchat.prototype.representer = function () {
        return "[" + this.net('date') + " : " + this.net('messageErreur') + "]";
    };
    return ErreurTchat;
}(communication_1.ErreurRedhibitoire));
exports.ErreurTchat = ErreurTchat;
function creerErreurTchat(err) {
    return new ErreurTchat(err);
}
exports.creerErreurTchat = creerErreurTchat;
function composerErreurTchat(msg, date) {
    return new ErreurTchat({
        "erreurRedhibitoire": types_1.Unite.un,
        "messageErreur": msg,
        "date": date
    });
}
exports.composerErreurTchat = composerErreurTchat;
function creerAnneauTchat(noms) {
    var assembleur = communication_1.creerAssemblageReseauEnAnneau(noms.length, creerNoeudTchatIN);
    var identification = types_1.creerIdentificationParCompteur("S-");
    noms.forEach(function (nom, i, tab) {
        var s = { ID: undefined, pseudo: tab[i], mutable: undefined };
        identification.identifier(s, function (i) { return { sommet: i }; });
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
exports.creerAnneauTchat = creerAnneauTchat;
//# sourceMappingURL=tchat.js.map