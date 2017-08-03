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
        return undefined;
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
        return undefined;
    };
    Table.prototype.representer = function () {
        return this.net('graphe');
    };
    Table.prototype.image = function () {
        var tab = [];
        for (var c_5 in this.ex().table) {
            tab.push(this.ex().table[c_5]);
        }
        return tab;
    };
    Table.prototype.domaine = function () {
        var tab = [];
        for (var c_6 in this.ex().table) {
            tab.push(c_6);
        }
        return tab;
    };
    Table.prototype.selectionCle = function () {
        // sélection d'une clé
        for (var c_7 in this.ex().table) {
            return c_7;
        }
        return undefined;
    };
    Table.prototype.taille = function () {
        var n = 0;
        for (var c_8 in this.ex().table) {
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
    IdentificationParCompteur.prototype.identifier = function (val, fab) {
        var id = this.prefixe + this.compteur;
        val.ID = fab(id);
        this.compteur++;
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
    function TableIdentification(valInVersEx) {
        var _this = _super.call(this, conversionFormatTable(valInVersEx), { table: {}, mutable: Unite.un }) || this;
        _this._domaine = { table: {}, mutable: Unite.un };
        return _this;
    }
    TableIdentification.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return JSON.stringify(this.ex().table);
        }
        return undefined;
    };
    TableIdentification.prototype.representer = function () {
        return this.net('graphe');
    };
    TableIdentification.prototype.valeur = function (id) {
        var cle = undefined;
        for (var c_9 in id) {
            cle = id[c_9];
        }
        return this.ex().table[cle];
    };
    TableIdentification.prototype.image = function () {
        var tab = [];
        for (var c_10 in this.ex().table) {
            tab.push(this.ex().table[c_10]);
        }
        return tab;
    };
    TableIdentification.prototype.domaine = function () {
        return creerTableImmutable(this._domaine).image();
    };
    TableIdentification.prototype.selectionCle = function () {
        // sélection d'une clé
        for (var c_11 in this.ex().table) {
            return this._domaine.table[c_11];
        }
        return undefined;
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
        for (var i in ID_sorte) {
            this._domaine.table[ID_sorte[i]] = ID_sorte;
            this.etat.table[ID_sorte[i]] = x;
        }
    };
    TableIdentification.prototype.retirer = function (ID_sorte) {
        for (var i in ID_sorte) {
            delete this._domaine.table[ID_sorte[i]];
            delete this.etat.table[ID_sorte[i]];
        }
    };
    return TableIdentification;
}(Enveloppe));
exports.TableIdentification = TableIdentification;
function creerTableIdentificationVide(valInVersEx) {
    return new TableIdentification(valInVersEx);
}
exports.creerTableIdentificationVide = creerTableIdentificationVide;
//# sourceMappingURL=types.js.map