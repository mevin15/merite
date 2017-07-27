/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var vueClient_1 = __webpack_require__(1);
var client_1 = __webpack_require__(2);
var tchat_1 = __webpack_require__(3);
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
    console.log("- du noeud du réseau");
    canal.enregistrerTraitementConfigurationRecue(function (c) {
        var config = new tchat_1.ConfigurationTchat(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.net());
        noeud = tchat_1.creerNoeudDeConfiguration(config);
        voir();
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function elementParId(id) {
    return document.getElementById(id);
}
exports.elementParId = elementParId;
function entreeParId(id) {
    return document.getElementById(id);
}
exports.entreeParId = entreeParId;
function recupererEntree(id) {
    return entreeParId(id).value;
}
exports.recupererEntree = recupererEntree;
function initialiserEntree(id, val) {
    entreeParId(id).value = val;
}
exports.initialiserEntree = initialiserEntree;
function contenuBalise(doc, champ) {
    return doc.getElementById(champ).innerHTML;
}
exports.contenuBalise = contenuBalise;
function poster(id, val) {
    document.getElementById(id).innerHTML += val;
}
exports.poster = poster;
function posterNL(id, val) {
    poster(id, val + "<br>");
}
exports.posterNL = posterNL;
function gererEvenementDocument(type, gestionnaire) {
    console.log("- Document : enregistrement d'un gestionnaire pour l'événement " + type);
    document.addEventListener(type, gestionnaire);
}
exports.gererEvenementDocument = gererEvenementDocument;
function gererEvenementElement(id, type, gestionnaire) {
    document.getElementById(id).addEventListener(type, gestionnaire);
}
exports.gererEvenementElement = gererEvenementElement;
function elementSaisieEnvoi(idSaisie, idBoutonEnvoi, msg) {
    return '<input type="text" id="' + idSaisie + '">'
        + '<input class="button" type="button" id="' + idBoutonEnvoi + '" value="' + msg + '" >';
}
exports.elementSaisieEnvoi = elementSaisieEnvoi;
//# sourceMappingURL=vueClient.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CanalClient = (function () {
    function CanalClient(adresse) {
        this.adresse = adresse;
        this.lienServeur = new WebSocket('ws://' + this.adresse, 'echo-protocol');
    }
    ;
    // Effet : send(String)
    CanalClient.prototype.envoyerMessage = function (msg) {
        this.lienServeur.send(msg.brut());
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementMessageRecu = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var msg = JSON.parse(e.data);
            if (msg.configurationInitiale !== undefined) {
                return;
            }
            if (msg.erreurRedhibitoire !== undefined) {
                return;
            }
            traitement(msg);
        });
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementConfigurationRecue = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var contenuJSON = JSON.parse(e.data);
            if (contenuJSON.configurationInitiale === undefined) {
                return;
            }
            traitement(contenuJSON);
        });
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementErreurRecue = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var contenuJSON = JSON.parse(e.data);
            if (contenuJSON.erreurRedhibitoire === undefined) {
                return;
            }
            traitement(contenuJSON);
        });
    };
    ;
    return CanalClient;
}());
exports.CanalClient = CanalClient;
;
//# sourceMappingURL=client.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
var communication_1 = __webpack_require__(4);
var types_1 = __webpack_require__(5);
var outils_1 = __webpack_require__(6);
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
var ErreurChat = (function (_super) {
    __extends(ErreurChat, _super);
    function ErreurChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErreurChat.prototype.net = function () {
        var erreur = this.enJSON();
        return JSON.stringify({
            messageErreur: erreur.messageErreur,
            date: outils_1.dateFr(erreur.date)
        });
    };
    return ErreurChat;
}(communication_1.ErreurRedhibitoire));
exports.ErreurChat = ErreurChat;
function creerMessageErreur(msg, date) {
    return new ErreurChat({
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
;
;
// Modèle générique d'une enveloppe d'un document JSON
var Enveloppe = (function () {
    function Enveloppe(enJSON) {
        this._enJSON = enJSON; // JSON
    }
    ;
    Enveloppe.prototype.enJSON = function () {
        return this._enJSON;
    };
    ;
    Enveloppe.prototype.brut = function () {
        return JSON.stringify(this.enJSON());
    };
    ;
    return Enveloppe;
}());
exports.Enveloppe = Enveloppe;
;
var Message = (function (_super) {
    __extends(Message, _super);
    function Message(enJSON) {
        return _super.call(this, enJSON) || this;
    }
    ;
    return Message;
}(Enveloppe));
exports.Message = Message;
var Configuration = (function (_super) {
    __extends(Configuration, _super);
    function Configuration(enJSON) {
        return _super.call(this, enJSON) || this;
    }
    ;
    return Configuration;
}(Enveloppe));
exports.Configuration = Configuration;
var ErreurRedhibitoire = (function (_super) {
    __extends(ErreurRedhibitoire, _super);
    function ErreurRedhibitoire(enJSON) {
        return _super.call(this, enJSON) || this;
    }
    ;
    return ErreurRedhibitoire;
}(Enveloppe));
exports.ErreurRedhibitoire = ErreurRedhibitoire;
var Sommet = (function (_super) {
    __extends(Sommet, _super);
    function Sommet(enJSON) {
        return _super.call(this, enJSON) || this;
    }
    ;
    return Sommet;
}(Enveloppe));
exports.Sommet = Sommet;
// - réseau ::= noeud*
var TableNoeuds = (function () {
    function TableNoeuds() {
        this._noeuds = {};
    }
    TableNoeuds.prototype.noeuds = function () {
        var r = {};
        var id;
        for (id in this._noeuds) {
            r[id] = this._noeuds[id];
        }
        return r;
    };
    TableNoeuds.prototype.noeud = function (id) {
        return this._noeuds[id];
    };
    TableNoeuds.prototype.possedeNoeud = function (id) {
        return this._noeuds[id] !== undefined;
    };
    // Précondition : id1 et id2 sont deux noeuds du réseau.
    TableNoeuds.prototype.sontVoisins = function (id1, id2) {
        return this._noeuds[id1].aPourVoisin(id2);
    };
    TableNoeuds.prototype.ajouterNoeud = function (n) {
        this._noeuds[n.centre().enJSON().id] = n;
    };
    TableNoeuds.prototype.retirerNoeud = function (n) {
        delete this._noeuds[n.centre().enJSON().id];
    };
    return TableNoeuds;
}());
exports.TableNoeuds = TableNoeuds;
var SommetTableSommets = (function () {
    function SommetTableSommets(c) {
        this._centre = c;
        this._voisins = {};
    }
    ;
    SommetTableSommets.prototype.centre = function () {
        return this._centre;
    };
    SommetTableSommets.prototype.voisins = function () {
        var r = {};
        var id;
        for (id in this._voisins) {
            r[id] = this._voisins[id];
        }
        return r;
    };
    SommetTableSommets.prototype.voisinsEnJSON = function () {
        var r = {};
        var id;
        for (id in this._voisins) {
            r[id] = this._voisins[id].enJSON();
        }
        return r;
    };
    SommetTableSommets.prototype.aPourVoisin = function (id) {
        return this._voisins[id] !== undefined;
    };
    SommetTableSommets.prototype.voisin = function (id) {
        return this._voisins[id];
    };
    ;
    SommetTableSommets.prototype.ajouterVoisin = function (v) {
        this._voisins[v.enJSON().id] = v;
    };
    return SommetTableSommets;
}());
;
function creerNoeud(centre, voisins, fabrique) {
    var r = new SommetTableSommets(fabrique(centre));
    for (var i in voisins) {
        r.ajouterVoisin(fabrique(voisins[i]));
    }
    return r;
}
exports.creerNoeud = creerNoeud;
var AssemblageReseauEnAnneau = (function () {
    function AssemblageReseauEnAnneau(taille) {
        console.log("* Construction d'un réseau en anneau de " + taille + " éléments.");
        this.sommets = [];
        this.taille = taille;
    }
    AssemblageReseauEnAnneau.prototype.ajouterSommet = function (s) {
        if (this.sommets.length < this.taille) {
            this.sommets.push(s);
        }
        else {
            console.log("- Impossible d'ajouter un sommet : le réseau en anneau est complet.");
        }
    };
    AssemblageReseauEnAnneau.prototype.assembler = function () {
        var _this = this;
        var restant = this.taille - this.sommets.length;
        if (restant > 0) {
            console.log("- Impossible d'assembler un réseau en anneau : ajouter " + restant + " sommets.");
            return null;
        }
        // Définition du réseau
        var r = new TableNoeuds();
        var ns = [];
        this.sommets.forEach(function (s, i, tab) {
            var n = new SommetTableSommets(s);
            n.ajouterVoisin(tab[(i + 1) % _this.taille]);
            n.ajouterVoisin(tab[(i + (_this.taille - 1)) % _this.taille]);
            r.ajouterNoeud(n);
        });
        return r;
    };
    return AssemblageReseauEnAnneau;
}());
exports.AssemblageReseauEnAnneau = AssemblageReseauEnAnneau;
//# sourceMappingURL=communication.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Unite;
(function (Unite) {
    Unite[Unite["un"] = 0] = "un";
})(Unite = exports.Unite || (exports.Unite = {}));
//# sourceMappingURL=types.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function dateFr(d) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (new Date(d)).toLocaleString("fr-FR", options);
}
exports.dateFr = dateFr;
function dateFrLog(d) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (new Date(d)).toLocaleString("fr-FR", options);
}
exports.dateFrLog = dateFrLog;
//# sourceMappingURL=outils.js.map

/***/ })
/******/ ]);