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