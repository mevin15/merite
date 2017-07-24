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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    voisins.forEach(function (s, i, tab) {
        r.ajouterVoisin(fabrique(s));
    });
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var communication_1 = __webpack_require__(0);
var vueClient_1 = __webpack_require__(2);
var client_1 = __webpack_require__(3);
var chat_1 = __webpack_require__(4);
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

/***/ }),
/* 2 */
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
    console.log("- Element " + id + " : enregistrement d'un gestionnaire pour l'événement " + type);
    document.getElementById(id).addEventListener(type, gestionnaire);
}
exports.gererEvenementElement = gererEvenementElement;
//# sourceMappingURL=vueClient.js.map

/***/ }),
/* 3 */
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
    CanalClient.prototype.enregistrerTraitementAReception = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var msg = JSON.parse(e.data);
            traitement(msg);
        });
    };
    ;
    return CanalClient;
}());
exports.CanalClient = CanalClient;
;
//# sourceMappingURL=client.js.map

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
var communication_1 = __webpack_require__(0);
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

/***/ })
/******/ ]);