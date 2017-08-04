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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Revue 02/08 - Testé.
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
var outils_1 = __webpack_require__(1);
var Unite;
(function (Unite) {
    Unite[Unite["un"] = 0] = "un";
})(Unite = exports.Unite || (exports.Unite = {}));
// Types formats JSON : FormatX par convention
// Format ::= { (etiquette : Format)*} | { [x : string] : Format }
// Modèle générique d'une enveloppe d'un document JSON
// TEX : type de sortie (souvent format JSON en lecture seulement)
// TIN : type d'entrée pour l'état en format JSON ou non (confiné, permettant des modifications)
// E : étiquettes utiles pour une représentation (cf. méthode net)
// La différence entre TIN et TEX permet de gérer la mutabilité et la visibilité de la structure 
//   de données, souvent au format JSON.
// Une fonction de conversion de TIN ves TEX est requise.
var Enveloppe = (function () {
    function Enveloppe(inEnEx, etat) {
        this.etat = etat;
        this.inEnEx = inEnEx;
    }
    ;
    Enveloppe.prototype.ex = function () {
        return this.inEnEx(this.etat);
    };
    // transformation brute du json de type TIN en string
    Enveloppe.prototype.brut = function () {
        return JSON.stringify(this.etat);
    };
    ;
    return Enveloppe;
}());
exports.Enveloppe = Enveloppe;
function conversionFormatTable(conv) {
    return (function (t) {
        var r = {};
        for (var c_1 in t.table) {
            r[c_1] = conv(t.table[c_1]);
        }
        return { table: r };
    });
}
exports.conversionFormatTable = conversionFormatTable;
var TableImmutable = (function (_super) {
    __extends(TableImmutable, _super);
    function TableImmutable(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    TableImmutable.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return this.brut();
        }
        return outils_1.jamais(e);
    };
    TableImmutable.prototype.representer = function () {
        return this.net('graphe');
    };
    TableImmutable.prototype.image = function () {
        var tab = [];
        for (var c_2 in this.ex().table) {
            tab.push(this.ex().table[c_2]);
        }
        return tab;
    };
    TableImmutable.prototype.domaine = function () {
        var tab = [];
        for (var c_3 in this.ex().table) {
            tab.push(c_3);
        }
        return tab;
    };
    TableImmutable.prototype.taille = function () {
        var n = 0;
        for (var c_4 in this.ex().table) {
            n++;
        }
        return n;
    };
    TableImmutable.prototype.foncteur = function (f) {
        var r = { table: {} };
        for (var c_5 in this.etat.table) {
            r.table[c_5] = f(this.etat.table[c_5]);
        }
        return creerTableImmutable(r);
    };
    return TableImmutable;
}(Enveloppe));
exports.TableImmutable = TableImmutable;
function creerTableImmutable(t) {
    return new TableImmutable(t);
}
exports.creerTableImmutable = creerTableImmutable;
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(valInVersEx, etat) {
        return _super.call(this, conversionFormatTable(valInVersEx), etat) || this;
    }
    Table.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return this.brut();
        }
        return outils_1.jamais(e);
    };
    Table.prototype.representer = function () {
        return this.net('graphe');
    };
    Table.prototype.image = function () {
        var tab = [];
        for (var c_6 in this.ex().table) {
            tab.push(this.ex().table[c_6]);
        }
        return tab;
    };
    Table.prototype.domaine = function () {
        var tab = [];
        for (var c_7 in this.ex().table) {
            tab.push(c_7);
        }
        return tab;
    };
    Table.prototype.selectionCle = function () {
        // sélection d'une clé
        for (var c_8 in this.ex().table) {
            return c_8;
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    };
    Table.prototype.taille = function () {
        var n = 0;
        for (var c_9 in this.ex().table) {
            n++;
        }
        return n;
    };
    Table.prototype.estVide = function () {
        return this.taille() === 0;
    };
    Table.prototype.ajouter = function (cle, x) {
        this.etat.table[cle] = x;
    };
    Table.prototype.retirer = function (cle) {
        delete this.etat.table[cle];
    };
    return Table;
}(Enveloppe));
exports.Table = Table;
function creerTableVide(valInVersEx) {
    return new Table(valInVersEx, { table: {}, mutable: Unite.un });
}
exports.creerTableVide = creerTableVide;
var IdentificationParCompteur = (function () {
    function IdentificationParCompteur(prefixe) {
        this.prefixe = prefixe;
        this.compteur = 0;
    }
    IdentificationParCompteur.prototype.identifier = function (s) {
        var id = this.prefixe + this.compteur;
        this.compteur++;
        return { val: id, sorte: s };
    };
    return IdentificationParCompteur;
}());
exports.IdentificationParCompteur = IdentificationParCompteur;
function creerIdentificationParCompteur(prefixe) {
    return new IdentificationParCompteur(prefixe);
}
exports.creerIdentificationParCompteur = creerIdentificationParCompteur;
/*
* Table utilisant des identificateurs comme clé.
* Remarque : les tables précédentes fondées sur les tables en JSON utilisent nécessdairemetn le type string pour les clés.
*/
var TableIdentification = (function (_super) {
    __extends(TableIdentification, _super);
    function TableIdentification(sorte, valInVersEx, pop) {
        if (pop === void 0) { pop = { table: {} }; }
        var _this = _super.call(this, conversionFormatTable(valInVersEx), { table: pop.table, mutable: Unite.un }) || this;
        _this.sorte = sorte;
        return _this;
    }
    TableIdentification.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return JSON.stringify(this.ex().table);
        }
        return outils_1.jamais(e);
    };
    TableIdentification.prototype.representer = function () {
        return this.net('graphe');
    };
    TableIdentification.prototype.valeur = function (ID_sorte) {
        return this.ex().table[ID_sorte.val];
    };
    TableIdentification.prototype.contient = function (ID_sorte) {
        if (this.ex().table[ID_sorte.val]) {
            return true;
        }
        return false;
        ;
    };
    TableIdentification.prototype.image = function () {
        var tab = [];
        for (var c_10 in this.ex().table) {
            tab.push(this.ex().table[c_10]);
        }
        return tab;
    };
    TableIdentification.prototype.domaine = function () {
        var _this = this;
        return creerTableImmutable(this.ex()).domaine().
            map(function (s) { return { val: s, sorte: _this.sorte }; });
    };
    TableIdentification.prototype.selectionCle = function () {
        // sélection d'une clé
        for (var c_11 in this.ex().table) {
            return { val: c_11, sorte: this.sorte };
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    };
    TableIdentification.prototype.taille = function () {
        var n = 0;
        for (var c_12 in this.ex().table) {
            n++;
        }
        return n;
    };
    TableIdentification.prototype.estVide = function () {
        return this.taille() === 0;
    };
    TableIdentification.prototype.ajouter = function (ID_sorte, x) {
        this.etat.table[ID_sorte.val] = x;
    };
    TableIdentification.prototype.retirer = function (ID_sorte) {
        delete this.etat.table[ID_sorte.val];
    };
    return TableIdentification;
}(Enveloppe));
exports.TableIdentification = TableIdentification;
function creerTableIdentificationVide(sorte, valInVersEx) {
    return new TableIdentification(sorte, valInVersEx);
}
exports.creerTableIdentificationVide = creerTableIdentificationVide;
function creerTableIdentification(sorte, valInVersEx, pop) {
    return new TableIdentification(sorte, valInVersEx, pop);
}
exports.creerTableIdentification = creerTableIdentification;
//# sourceMappingURL=types.js.map

/***/ }),
/* 1 */
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
function jamais(x) {
    throw new Error("* Erreur impossible : " + x);
}
exports.jamais = jamais;
//# sourceMappingURL=outils.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function recupererElementHTML(id) {
    var r = document.getElementById(id);
    if (typeof r === "undefined") {
        throw new Error("[Erreur : elementParId(" + id + ") non d\u00E9fini.]");
    }
    return r;
}
function elementParId(id) {
    return recupererElementHTML(id);
}
exports.elementParId = elementParId;
function entreeParId(id) {
    return recupererElementHTML(id);
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
function initialiserDocument(contenu) {
    document.write(contenu);
}
exports.initialiserDocument = initialiserDocument;
function contenuBalise(champ) {
    var r = recupererElementHTML(champ);
    return r.innerHTML;
}
exports.contenuBalise = contenuBalise;
function poster(id, val) {
    var r = recupererElementHTML(id);
    r.innerHTML += val;
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
    var r = recupererElementHTML(id);
    r.addEventListener(type, gestionnaire);
}
exports.gererEvenementElement = gererEvenementElement;
function elementSaisieEnvoi(idSaisie, idBoutonEnvoi, msg) {
    return '<input type="text" id="' + idSaisie + '">'
        + '<input class="button" type="button" id="' + idBoutonEnvoi + '" value="' + msg + '" >';
}
exports.elementSaisieEnvoi = elementSaisieEnvoi;
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
function creerCanalClient(adresse) {
    return new CanalClient(adresse);
}
exports.creerCanalClient = creerCanalClient;
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
var types_1 = __webpack_require__(0);
;
var Message = (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Message;
}(types_1.Enveloppe));
exports.Message = Message;
var Configuration = (function (_super) {
    __extends(Configuration, _super);
    function Configuration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Configuration;
}(types_1.Enveloppe));
exports.Configuration = Configuration;
var ErreurRedhibitoire = (function (_super) {
    __extends(ErreurRedhibitoire, _super);
    function ErreurRedhibitoire() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ErreurRedhibitoire;
}(types_1.Enveloppe));
exports.ErreurRedhibitoire = ErreurRedhibitoire;
/*
- réseau ::= noeud*
- noeud ::= (sommet, sommet*)
- sommet ::= {identifiant, ...}

- Serveur : agrégation d'un réseau
- Client : agrégation d'un noeud du réseau

- Remarque : compatibilité ES3 pour les objets.
*/
// - sommet ::= {identifiant, ...}
// La sorte pour les identifiants de sommets est 'sommet'. 
var Sommet = (function (_super) {
    __extends(Sommet, _super);
    function Sommet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sommet;
}(types_1.Enveloppe));
exports.Sommet = Sommet;
// - réseau ::= noeud*
// Hypothèse : le réseau ne modifie ni les sommets ni les neouds. 
//   Conséquence : un seul format est utilisé, pour les sommets et pour les noeuds respectivement.
var Reseau = (function (_super) {
    __extends(Reseau, _super);
    function Reseau() {
        return _super.call(this, 'sommet', function (x) { return x; }) || this;
    }
    Reseau.prototype.representer = function () {
        return "réseau de " + this.net('taille') + " noeuds : "
            + this.net('graphe');
    };
    // (simple renommmage)
    Reseau.prototype.possedeNoeud = function (ID_sommet) {
        return this.contient(ID_sommet);
    };
    // Précondition : id1 et id2 sont deux noeuds du réseau.
    Reseau.prototype.sontVoisins = function (ID_sommet1, ID_sommet2) {
        return this.etat.table[ID_sommet1.val].voisins.table[ID_sommet2.val] !== undefined;
    };
    Reseau.prototype.ajouterNoeud = function (n) {
        this.ajouter(n.centre.ID, n);
    };
    Reseau.prototype.retirerNoeud = function (n) {
        this.retirer(n.centre.ID);
    };
    return Reseau;
}(types_1.TableIdentification));
exports.Reseau = Reseau;
function creerReseauVide() {
    return new Reseau();
}
exports.creerReseauVide = creerReseauVide;
function conversionFormatNoeud(n) {
    return { centre: n.centre, voisins: types_1.conversionFormatTable(function (s) { return s; })(n.voisins) };
}
var NoeudIN = (function (_super) {
    __extends(NoeudIN, _super);
    function NoeudIN(etat) {
        return _super.call(this, conversionFormatNoeud, etat) || this;
    }
    NoeudIN.prototype.aPourVoisin = function (ID_sommet) {
        return this.etat.voisins.table[ID_sommet.val] !== undefined;
    };
    NoeudIN.prototype.ajouterVoisin = function (v) {
        this.etat.voisins.table[v.ID.val] = v;
    };
    NoeudIN.prototype.foncteurProceduralSurVoisins = function (proc) {
        for (var c_1 in this.etat.voisins.table) {
            proc(this.etat.voisins.table[c_1]);
        }
    };
    return NoeudIN;
}(types_1.Enveloppe));
exports.NoeudIN = NoeudIN;
var NoeudEX = (function (_super) {
    __extends(NoeudEX, _super);
    function NoeudEX(etat) {
        return _super.call(this, conversionFormatNoeud, etat) || this;
    }
    NoeudEX.prototype.aPourVoisin = function (ID_sommet) {
        return this.etat.voisins.table[ID_sommet.val] !== undefined;
    };
    NoeudEX.prototype.foncteurProceduralSurVoisins = function (proc) {
        for (var c_2 in this.etat.voisins.table) {
            proc(this.etat.voisins.table[c_2]);
        }
    };
    return NoeudEX;
}(types_1.Enveloppe));
exports.NoeudEX = NoeudEX;
var AssemblageReseauEnAnneau = (function () {
    function AssemblageReseauEnAnneau(taille, fabriqueNoeud) {
        this.fabriqueNoeud = fabriqueNoeud;
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
            console.log("- Impossible d'assembler un réseau en anneau de la taille donnée : ajouter " + restant + " sommets.");
            throw new Error("[Exception : AssemblageReseau.assembler non défini.]");
        }
        // Définition du réseau
        var reseau = creerReseauVide();
        this.sommets.forEach(function (s, i, tab) {
            var n = _this.fabriqueNoeud({ centre: s, voisins: { table: {}, mutable: types_1.Unite.un } });
            n.ajouterVoisin(tab[(i + 1) % _this.taille]);
            n.ajouterVoisin(tab[(i + (_this.taille - 1)) % _this.taille]);
            reseau.ajouterNoeud(n.ex());
        });
        return reseau;
    };
    return AssemblageReseauEnAnneau;
}());
exports.AssemblageReseauEnAnneau = AssemblageReseauEnAnneau;
function creerAssemblageReseauEnAnneau(taille, fabriqueNoeud) {
    return new AssemblageReseauEnAnneau(taille, fabriqueNoeud);
}
exports.creerAssemblageReseauEnAnneau = creerAssemblageReseauEnAnneau;
//# sourceMappingURL=communication.js.map

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var types_1 = __webpack_require__(0);
var vueClient_1 = __webpack_require__(2);
var client_1 = __webpack_require__(3);
var jeu1_adressageRoutage_1 = __webpack_require__(8);
console.log("* Chargement du script");
var adresseServeur = jeu1_adressageRoutage_1.hote + ":" + jeu1_adressageRoutage_1.port2;
// A initialiser
var canal;
var noeud;
var population;
var utilisateur;
function envoyerMessage(texte, destinataire) {
    /*
    let msg: MessageJeu1 = creerMessageCommunication(noeud.centre().enJSON().id, destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + representerMessage(msg));
    canal.envoyerMessage(msg);
    */
}
// A exécuter après chargement de la page
// - pas d'interruption de la fonction
function initialisation() {
    console.log("* Initialisation après chargement du DOM");
    console.log("- du canal de communication avec le serveur d'adresse " + adresseServeur);
    canal = client_1.creerCanalClient(adresseServeur);
    console.log("- du traitement des messages");
    canal.enregistrerTraitementMessageRecu(function (m) {
        /*let msg = new MessageTchat(m);
        console.log("* Réception");
        console.log("- du message brut : " + msg.brut());
        console.log("- du message net : " + representerMessage(msg));
        posterNL('logChats', representerMessage(msg));
        */
    });
    console.log("- du traitement de la configuration");
    canal.enregistrerTraitementConfigurationRecue(function (c) {
        var config = jeu1_adressageRoutage_1.creerConfigurationJeu1(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.representer());
        console.log("* Initialisation du noeud du réseau");
        var decConfig = jeu1_adressageRoutage_1.decomposerConfiguration(config);
        noeud = jeu1_adressageRoutage_1.creerNoeudJeu1EX(decConfig[0]);
        population = jeu1_adressageRoutage_1.creerPopulationLocale(decConfig[1]);
        utilisateur = jeu1_adressageRoutage_1.creerUtilisateur(decConfig[2]);
        voir();
    });
    console.log("- du traitement d'une erreur rédhibitoire");
    canal.enregistrerTraitementErreurRecue(function (err) {
        var erreur = jeu1_adressageRoutage_1.creerErreurJeu1(err);
        console.log("* Réception");
        console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
        console.log("- de l'erreur rédhibitoire nette : " + erreur.representer());
        console.log("* Initialisation du document");
        vueClient_1.initialiserDocument(erreur.representer());
    });
}
function voir() {
    console.log("* Consolidation de la vue");
    console.log("- adresse, domaine, domaines voisins, utilisateur, autres utilisateurs du domaine");
    vueClient_1.poster("adresseServeur", adresseServeur);
    vueClient_1.poster("centre", jeu1_adressageRoutage_1.creerSommetJeu1(noeud.ex().centre).representer());
    vueClient_1.poster("voisins", types_1.creerTableImmutable(noeud.ex().voisins).representer());
    vueClient_1.poster("utilisateur", utilisateur.representer());
    vueClient_1.poster("utilisateursDomaine", population.representer());
    /*
    console.log("- formulaire");
    let voisinsNoeud = noeud.voisins();
    let contenuFormulaire = "";
    for (let idV in voisinsNoeud) {
        poster("formulaire", elementSaisieEnvoi("message_" + idV, "boutonEnvoi_" + idV,
            "Envoyer un message à " + representerSommet(voisinsNoeud[idV]) + "."));
    }
    let type = "click";
    for (const idV in voisinsNoeud) {
        console.log("- Element " + idV + " : enregistrement d'un gestionnaire pour l'événement " + type);
        gererEvenementElement("boutonEnvoi_" + idV, type, e => {
            let entree = recupererEntree("message_" + idV);
            initialiserEntree("message_" + idV, "");
            console.log("* Entree : " + entree);
            envoyerMessage(entree, ID(idV));
        });
    }
    */
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
//# sourceMappingURL=clientJeu1_adressageRoutage.js.map

/***/ }),
/* 8 */
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
var types_1 = __webpack_require__(0);
var outils_1 = __webpack_require__(1);
var binaire_1 = __webpack_require__(9);
exports.hote = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
exports.port1 = 3001; // port de la essource 1 (serveur d'applications)
exports.port2 = 1111; // port de la ressouce 2 (serveur de connexions)
// Iditenfiants indéfinis utilisés dans des messages définis partiellement
exports.sommetInconnu = { val: "INCONNU", sorte: 'sommet' };
exports.messageInconnu = { val: "INCONNU", sorte: 'message' };
var SommetJeu1 = (function (_super) {
    __extends(SommetJeu1, _super);
    function SommetJeu1(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    SommetJeu1.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'domaine': return binaire_1.representerMot(s.domaine);
            case 'ID': return s.ID.val;
        }
        return outils_1.jamais(e);
    };
    SommetJeu1.prototype.representer = function () {
        return this.net('domaine') + " (" + this.net('ID') + ")";
    };
    return SommetJeu1;
}(communication_1.Sommet));
exports.SommetJeu1 = SommetJeu1;
function creerSommetJeu1(s) {
    return new SommetJeu1(s);
}
exports.creerSommetJeu1 = creerSommetJeu1;
var NoeudJeu1IN = (function (_super) {
    __extends(NoeudJeu1IN, _super);
    function NoeudJeu1IN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoeudJeu1IN.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'centre': return creerSommetJeu1(s.centre).representer();
            case 'voisins': return types_1.creerTableImmutable(s.voisins).representer();
        }
        return outils_1.jamais(e);
    };
    NoeudJeu1IN.prototype.representer = function () {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    };
    return NoeudJeu1IN;
}(communication_1.NoeudIN));
exports.NoeudJeu1IN = NoeudJeu1IN;
function creerNoeudJeu1IN(n) {
    return new NoeudJeu1IN(n);
}
exports.creerNoeudJeu1IN = creerNoeudJeu1IN;
var NoeudJeu1EX = (function (_super) {
    __extends(NoeudJeu1EX, _super);
    function NoeudJeu1EX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoeudJeu1EX.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'centre': return creerSommetJeu1(s.centre).representer();
            case 'voisins': return types_1.creerTableImmutable(s.voisins).representer();
        }
        return outils_1.jamais(e);
    };
    NoeudJeu1EX.prototype.representer = function () {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    };
    return NoeudJeu1EX;
}(communication_1.NoeudEX));
exports.NoeudJeu1EX = NoeudJeu1EX;
function creerNoeudJeu1EX(n) {
    return new NoeudJeu1EX(n);
}
exports.creerNoeudJeu1EX = creerNoeudJeu1EX;
var ReseauJeu1 = (function (_super) {
    __extends(ReseauJeu1, _super);
    function ReseauJeu1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReseauJeu1;
}(communication_1.Reseau));
exports.ReseauJeu1 = ReseauJeu1;
/*
Protocole
Client | Serveur
1. Produire un message INIT | .
2. Transmettre un message INIT pour TRANSIT | Identifier le message en TRANSIT.
3. Transmettre un message TRANSIT pour TRANSIT | Accuser réception en TRANSIT (SUCCES ou ECHEC).
4. Ignorer un message en TRANSIT (IGNOR) | .
5. Consulter un message en TRANSIT (FIN) | Accuser réception du message FIN (SUCCES ou ECHEC).
*/
var AR;
(function (AR) {
    AR[AR["SUCCES"] = 0] = "SUCCES";
    AR[AR["ECHEC"] = 1] = "ECHEC";
})(AR = exports.AR || (exports.AR = {}));
var TypeMessageJeu1;
(function (TypeMessageJeu1) {
    TypeMessageJeu1[TypeMessageJeu1["INIT"] = 0] = "INIT";
    TypeMessageJeu1[TypeMessageJeu1["TRANSIT"] = 1] = "TRANSIT";
    TypeMessageJeu1[TypeMessageJeu1["IGNOR"] = 2] = "IGNOR";
    TypeMessageJeu1[TypeMessageJeu1["FIN"] = 3] = "FIN";
    TypeMessageJeu1[TypeMessageJeu1["SUCCES_TRANSIT"] = 4] = "SUCCES_TRANSIT";
    TypeMessageJeu1[TypeMessageJeu1["ECHEC_TRANSIT"] = 5] = "ECHEC_TRANSIT";
    TypeMessageJeu1[TypeMessageJeu1["SUCCES_FIN"] = 6] = "SUCCES_FIN";
    TypeMessageJeu1[TypeMessageJeu1["ECHEC_FIN"] = 7] = "ECHEC_FIN";
    TypeMessageJeu1[TypeMessageJeu1["ERREUR_CONNEXION"] = 8] = "ERREUR_CONNEXION";
    TypeMessageJeu1[TypeMessageJeu1["ERREUR_EMET"] = 9] = "ERREUR_EMET";
    TypeMessageJeu1[TypeMessageJeu1["ERREUR_DEST"] = 10] = "ERREUR_DEST";
    TypeMessageJeu1[TypeMessageJeu1["ERREUR_TYPE"] = 11] = "ERREUR_TYPE";
    TypeMessageJeu1[TypeMessageJeu1["INTERDICTION"] = 12] = "INTERDICTION";
})(TypeMessageJeu1 = exports.TypeMessageJeu1 || (exports.TypeMessageJeu1 = {}));
// Structure immutable
var MessageJeu1 = (function (_super) {
    __extends(MessageJeu1, _super);
    function MessageJeu1(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    MessageJeu1.prototype.net = function (e) {
        var msg = this.ex();
        switch (e) {
            case 'ID': return msg.ID.val;
            case 'type': return TypeMessageJeu1[msg.type];
            case 'date': return outils_1.dateFr(msg.date);
            case 'ID_de': return msg.ID_origine.val;
            case 'ID_à': return msg.ID_destination.val;
            case 'contenu': return binaire_1.representerMot(msg.contenu);
        }
        return outils_1.jamais(e);
    };
    MessageJeu1.prototype.representer = function () {
        var idm = this.net('ID');
        var dem = this.net('ID_de');
        var am = this.net('ID_à');
        var typem = this.net('type');
        var datem = this.net('date');
        var cm = this.net('contenu');
        return idm + " - " + datem + ", de " + dem + " à " + am + " (" + typem + ") - " + cm;
    };
    // 2. Client : Transmettre un message INIT pour TRANSIT.
    // 3. Client : Transmettre un message TRANSIT pour TRANSIT.
    MessageJeu1.prototype.avecAdresses = function (ID_origine, ID_destination) {
        var msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": { val: ID_origine, sorte: 'sommet' },
            "ID_destination": { val: ID_destination, sorte: 'sommet' },
            "type": msg.type,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    // 2. Serveur : Identifier le message en TRANSIT.
    MessageJeu1.prototype.enTransit = function () {
        var msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": TypeMessageJeu1.TRANSIT,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    // 3. Serveur : Accuser réception en TRANSIT (SUCCES ou ECHEC).
    MessageJeu1.prototype.transitAvecAccuseReception = function (statut) {
        var msg = this.ex();
        var type;
        switch (statut) {
            case AR.SUCCES:
                type = TypeMessageJeu1.SUCCES_TRANSIT;
                break;
            case AR.ECHEC:
                type = TypeMessageJeu1.ECHEC_TRANSIT;
                break;
            default: return outils_1.jamais(statut);
        }
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": type,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    // 4. Client : Ignorer un message en TRANSIT (IGNOR).
    MessageJeu1.prototype.aIgnorer = function () {
        var msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": TypeMessageJeu1.IGNOR,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    // 5. Client : Consulter un message en TRANSIT (FIN).
    MessageJeu1.prototype.aConsulter = function () {
        var msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": TypeMessageJeu1.FIN,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    // 5. Serveur : Accuser réception en FIN (SUCCES ou ECHEC).
    MessageJeu1.prototype.aConsulterAvecAccuseReception = function (statut) {
        var msg = this.ex();
        var type;
        switch (statut) {
            case AR.SUCCES:
                type = TypeMessageJeu1.SUCCES_FIN;
                break;
            case AR.ECHEC:
                type = TypeMessageJeu1.ECHEC_FIN;
                break;
            default: return outils_1.jamais(statut);
        }
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": type,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    return MessageJeu1;
}(communication_1.Message));
exports.MessageJeu1 = MessageJeu1;
// 1. Client : Produire un message INIT.
function creerMessageInitial(contenu) {
    return new MessageJeu1({
        "ID": exports.messageInconnu,
        "ID_origine": exports.sommetInconnu,
        "ID_destination": exports.sommetInconnu,
        "type": TypeMessageJeu1.INIT,
        "contenu": contenu,
        "date": new Date()
    });
}
exports.creerMessageInitial = creerMessageInitial;
var Utilisateur = (function (_super) {
    __extends(Utilisateur, _super);
    function Utilisateur(u) {
        return _super.call(this, function (x) { return x; }, u) || this;
    }
    Utilisateur.prototype.net = function (e) {
        var u = this.ex();
        switch (e) {
            case 'ID': return u.ID.val;
            case 'nom': return binaire_1.representerMot(u.pseudo);
        }
        return outils_1.jamais(e);
    };
    Utilisateur.prototype.representer = function () {
        return this.net('nom') + " (" + this.net('ID') + ")";
    };
    return Utilisateur;
}(types_1.Enveloppe));
exports.Utilisateur = Utilisateur;
function creerUtilisateur(u) {
    return new Utilisateur(u);
}
exports.creerUtilisateur = creerUtilisateur;
// inutile export type EtiquettePopulationLocale = 'effectif' | 'utilisateurs';
var PopulationLocale = (function (_super) {
    __extends(PopulationLocale, _super);
    function PopulationLocale(pop) {
        return _super.call(this, 'utilisateur', function (x) { return x; }, pop) || this;
    }
    return PopulationLocale;
}(types_1.TableIdentification));
exports.PopulationLocale = PopulationLocale;
function creerPopulationLocaleVide() {
    return new PopulationLocale({ table: {} });
}
exports.creerPopulationLocaleVide = creerPopulationLocaleVide;
function creerPopulationLocale(pop) {
    return new PopulationLocale(pop);
}
exports.creerPopulationLocale = creerPopulationLocale;
function peuplerPopulationLocale(prefixe, noms) {
    var identification = types_1.creerIdentificationParCompteur(prefixe);
    var pop = creerPopulationLocaleVide();
    noms.forEach(function (nom, i, tab) {
        var u = { ID: identification.identifier('utilisateur'), pseudo: tab[i] };
        pop.ajouter(u.ID, u);
    });
    return pop;
}
exports.peuplerPopulationLocale = peuplerPopulationLocale;
var ConfigurationJeu1 = (function (_super) {
    __extends(ConfigurationJeu1, _super);
    function ConfigurationJeu1(c) {
        return _super.call(this, function (x) { return x; }, c) || this;
    }
    ConfigurationJeu1.prototype.net = function (e) {
        var config = this.ex();
        switch (e) {
            case 'centre': return creerSommetJeu1(config.centre).representer();
            case 'population':
                return types_1.creerTableImmutable(config.population).representer();
            case 'utilisateur': return creerUtilisateur(config.utilisateur).representer();
            case 'voisins': return types_1.creerTableImmutable(config.voisins).representer();
            case 'date': return outils_1.dateFr(config.date);
        }
        return outils_1.jamais(e);
    };
    ConfigurationJeu1.prototype.representer = function () {
        var c = this.net('centre');
        var pop = this.net('population');
        var util = this.net('utilisateur');
        var v = this.net('voisins');
        var d = this.net('date');
        return "(centre : " + c
            + " ; population : " + pop
            + " ; utilisateur : " + util
            + " ; voisins : " + v
            + " ; crée le : " + d + ")";
    };
    return ConfigurationJeu1;
}(communication_1.Configuration));
exports.ConfigurationJeu1 = ConfigurationJeu1;
function creerConfigurationJeu1(c) {
    return new ConfigurationJeu1(c);
}
exports.creerConfigurationJeu1 = creerConfigurationJeu1;
function composerConfigurationJeu1(n, pop, u, date) {
    return new ConfigurationJeu1({
        "configurationInitiale": types_1.Unite.un,
        "centre": n.centre,
        "population": pop,
        "utilisateur": u,
        "voisins": n.voisins,
        "date": date
    });
}
exports.composerConfigurationJeu1 = composerConfigurationJeu1;
function decomposerConfiguration(c) {
    var config = c.ex();
    var centre = config.centre;
    var voisins = config.voisins;
    var n = { "centre": centre, "voisins": voisins };
    var pop = config.population;
    var u = config.utilisateur;
    return [n, pop, u];
}
exports.decomposerConfiguration = decomposerConfiguration;
var ErreurJeu1 = (function (_super) {
    __extends(ErreurJeu1, _super);
    function ErreurJeu1(err) {
        return _super.call(this, function (x) { return x; }, err) || this;
    }
    ErreurJeu1.prototype.net = function (e) {
        var erreur = this.ex();
        switch (e) {
            case 'messageErreur': return erreur.messageErreur;
            case 'date': return outils_1.dateFr(erreur.date);
        }
        throw new Error("[Erreur : net(" + e + ") non d\u00E9fini.]");
    };
    ErreurJeu1.prototype.representer = function () {
        return "[" + this.net('date') + " : " + this.net('messageErreur') + "]";
    };
    return ErreurJeu1;
}(communication_1.ErreurRedhibitoire));
exports.ErreurJeu1 = ErreurJeu1;
function creerErreurJeu1(err) {
    return new ErreurJeu1(err);
}
exports.creerErreurJeu1 = creerErreurJeu1;
function composerErreurJeu1(msg, date) {
    return new ErreurJeu1({
        "erreurRedhibitoire": types_1.Unite.un,
        "messageErreur": msg,
        "date": date
    });
}
exports.composerErreurJeu1 = composerErreurJeu1;
function creerAnneauJeu1(domaines) {
    var assembleur = communication_1.creerAssemblageReseauEnAnneau(domaines.length, creerNoeudJeu1IN);
    var identification = types_1.creerIdentificationParCompteur("DOM-");
    domaines.forEach(function (dom, i, tab) {
        var s = { ID: identification.identifier('sommet'), domaine: tab[i] };
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
exports.creerAnneauJeu1 = creerAnneauJeu1;
// TODO TableIdentification
// Type IN utilisant une table d'identification
// Type EX au format JSON.
/* TODO inutile
export interface FormatPopulationParDomaineIN extends Mutable {
    [ID_dom: string]: FormatPopulationLocaleIN
}

export interface FormatPopulationParDomaineEX {
    readonly [ID_dom: string]: FormatPopulationLocaleEX
}
*/
var TableUtilisateurs = (function (_super) {
    __extends(TableUtilisateurs, _super);
    function TableUtilisateurs() {
        return _super.call(this, 'utilisateur', function (x) { return x; }) || this;
    }
    return TableUtilisateurs;
}(types_1.TableIdentification));
var PopulationParDomaine = (function (_super) {
    __extends(PopulationParDomaine, _super);
    function PopulationParDomaine() {
        return _super.call(this, 'sommet', function (t) { return t.ex(); }) || this;
    }
    PopulationParDomaine.prototype.contientUtilisateur = function (ID_dom, ID_util) {
        if (!this.etat.table[ID_dom.val]) {
            return false;
        }
        return this.etat.table[ID_dom.val].contient(ID_util);
    };
    PopulationParDomaine.prototype.utilisateur = function (ID_dom, ID_util) {
        console.log("pop " + this.etat.table[ID_dom.val].representer());
        console.log("id util " + ID_util.val);
        return this.etat.table[ID_dom.val].valeur(ID_util);
    };
    PopulationParDomaine.prototype.ajouterDomaine = function (ID_dom) {
        this.ajouter(ID_dom, new TableUtilisateurs());
    };
    PopulationParDomaine.prototype.ajouterUtilisateur = function (ID_dom, u) {
        this.etat.table[ID_dom.val].ajouter(u.ID, u);
    };
    PopulationParDomaine.prototype.retirerUtilisateur = function (ID_dom, ID_util) {
        this.etat.table[ID_dom.val].retirer(ID_util);
    };
    PopulationParDomaine.prototype.selectionnerUtilisateur = function () {
        var popDom = this.ex();
        for (var idDom in popDom.table) {
            for (var idUtil in popDom.table[idDom].table) {
                return [{ val: idDom, sorte: 'sommet' }, { val: idUtil, sorte: 'utilisateur' }];
            }
        }
        throw new Error("[Exception : selectionnerUtilisateur() non défini.]");
    };
    return PopulationParDomaine;
}(types_1.TableIdentification));
exports.PopulationParDomaine = PopulationParDomaine;
function creerVidePopulationParDomaine() {
    return new PopulationParDomaine();
}
exports.creerVidePopulationParDomaine = creerVidePopulationParDomaine;
function assemblerPopulationParDomaine(reseau, noms) {
    var noeuds = reseau.ex().table;
    var popDom = creerVidePopulationParDomaine();
    for (var idDom in noeuds) {
        var ID_dom = { val: idDom, sorte: 'sommet' };
        popDom.ajouterDomaine(ID_dom);
        var popLoc = peuplerPopulationLocale("UTIL-" + idDom + "-", noms).ex();
        for (var idUtil in popLoc.table) {
            popDom.ajouterUtilisateur(ID_dom, popLoc.table[idUtil]);
        }
    }
    return popDom;
}
exports.assemblerPopulationParDomaine = assemblerPopulationParDomaine;
/*
export function peuplerDomaines(reseau: TableNoeudsJeu1, pseudos: Mot[]):
    { [idDomaine: string]: { [idUt: string]: Utilisateur } } {
    let table: { [idDomaine: string]: { [idUt: string]: Utilisateur } } = {};
    let identification: IdentificationParCompteur<Utilisateur> = new IdentificationParCompteur("U-");
    for (let idDom in reseau.noeuds()) {
        table[idDom] = {};
        pseudos.forEach((v, i, t) => {
            let u = identification.identifier(creerUtilisateur({ id: undefined, pseudo: t[i] }));
            table[idDom][u.enJSON().id.ID] = u;
        });
    }
    return table;
}
*/ 
//# sourceMappingURL=jeu1_adressageRoutage.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Revue 31/07 OK - Testé
exports.__esModule = true;
var Alphabet;
(function (Alphabet) {
    Alphabet[Alphabet["ZERO"] = 0] = "ZERO";
    Alphabet[Alphabet["UN"] = 1] = "UN";
})(Alphabet = exports.Alphabet || (exports.Alphabet = {}));
function representerMot(mot) {
    return "[" + mot.map(function (v, i, t) { return Alphabet[v]; }).toString().replace(',', '.') + "]";
}
exports.representerMot = representerMot;
function binaire(n) {
    var s = Array.from(n.toString(2));
    return s.map(function (v, i, t) {
        switch (v) {
            case '0': return Alphabet.ZERO;
            case '1': return Alphabet.UN;
            default:
                throw new Error("[Erreur : binaire(" + n.toString + ") non défini.");
        }
    });
}
exports.binaire = binaire;
function premiersBinaires(n) {
    var r = [];
    for (var i = 0; i < n; i++) {
        r.push(i);
    }
    return r.map(function (v, i, tab) { return binaire(v); });
}
exports.premiersBinaires = premiersBinaires;
//# sourceMappingURL=binaire.js.map

/***/ })
/******/ ]);