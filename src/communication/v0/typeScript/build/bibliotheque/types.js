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
var outils_1 = require("./outils");
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
var ModuleTable = (function () {
    function ModuleTable() {
    }
    ModuleTable.prototype.pourChaque = function (f, t) {
        for (var c_1 in t.table) {
            f(c_1, t.table[c_1], t.table);
        }
    };
    ModuleTable.prototype.valeur = function (t, cle) {
        return t.table[cle];
    };
    ModuleTable.prototype.contient = function (t, cle) {
        if (t.table[cle]) {
            return true;
        }
        return false;
        ;
    };
    ModuleTable.prototype.image = function (t) {
        var tab = [];
        this.pourChaque(function (c, v) {
            tab.push(v);
        }, t);
        return tab;
    };
    ModuleTable.prototype.domaine = function (t) {
        var tab = [];
        this.pourChaque(function (c, v) {
            tab.push(c);
        }, t);
        return tab;
    };
    ModuleTable.prototype.taille = function (t) {
        var n = 0;
        this.pourChaque(function (c, v) {
            n++;
        }, t);
        return n;
    };
    ModuleTable.prototype.foncteur = function (t, f) {
        var r = {};
        this.pourChaque(function (c, v) {
            r[c] = f(v);
        }, t);
        return r;
    };
    ModuleTable.prototype.selectionCle = function (t) {
        // sélection d'une clé
        for (var c_2 in t.table) {
            return c_2;
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    };
    ModuleTable.prototype.ajouter = function (t, cle, x) {
        t.table[cle] = x;
    };
    ModuleTable.prototype.retirer = function (t, cle) {
        delete t.table[cle];
    };
    return ModuleTable;
}());
exports.ModuleTable = ModuleTable;
exports.MODULE_TABLE = new ModuleTable();
function conversionFormatTable(conv) {
    return (function (t) {
        var r = {};
        exports.MODULE_TABLE.pourChaque(function (c, v) {
            r[c] = conv(v);
        }, t);
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
        return exports.MODULE_TABLE.image(this.ex());
    };
    TableImmutable.prototype.domaine = function () {
        return exports.MODULE_TABLE.domaine(this.ex());
    };
    TableImmutable.prototype.taille = function () {
        return exports.MODULE_TABLE.taille(this.ex());
    };
    TableImmutable.prototype.foncteur = function (f) {
        return creerTableImmutable({ table: exports.MODULE_TABLE.foncteur(this.ex(), f) });
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
        return exports.MODULE_TABLE.image(this.ex());
    };
    Table.prototype.domaine = function () {
        return exports.MODULE_TABLE.domaine(this.etat);
    };
    Table.prototype.selectionCle = function () {
        return exports.MODULE_TABLE.selectionCle(this.etat);
    };
    Table.prototype.taille = function () {
        return exports.MODULE_TABLE.taille(this.etat);
    };
    Table.prototype.estVide = function () {
        return this.taille() === 0;
    };
    Table.prototype.ajouter = function (cle, x) {
        exports.MODULE_TABLE.ajouter(this.etat, cle, x);
    };
    Table.prototype.retirer = function (cle) {
        exports.MODULE_TABLE.retirer(this.etat, cle);
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
    TableIdentification.prototype.valeurIN = function (ID_sorte) {
        return exports.MODULE_TABLE.valeur(this.etat, ID_sorte.val);
    };
    TableIdentification.prototype.valeur = function (ID_sorte) {
        return exports.MODULE_TABLE.valeur(this.ex(), ID_sorte.val);
    };
    TableIdentification.prototype.contient = function (ID_sorte) {
        return exports.MODULE_TABLE.contient(this.ex(), ID_sorte.val);
    };
    TableIdentification.prototype.image = function () {
        return exports.MODULE_TABLE.image(this.ex());
    };
    TableIdentification.prototype.domaine = function () {
        var _this = this;
        return exports.MODULE_TABLE.domaine(this.ex()).
            map(function (s) { return { val: s, sorte: _this.sorte }; });
    };
    TableIdentification.prototype.selectionCle = function () {
        return {
            val: exports.MODULE_TABLE.selectionCle(this.etat),
            sorte: this.sorte
        };
    };
    TableIdentification.prototype.taille = function () {
        return exports.MODULE_TABLE.taille(this.etat);
    };
    TableIdentification.prototype.estVide = function () {
        return this.taille() === 0;
    };
    TableIdentification.prototype.ajouter = function (ID_sorte, x) {
        exports.MODULE_TABLE.ajouter(this.etat, ID_sorte.val, x);
    };
    TableIdentification.prototype.retirer = function (ID_sorte) {
        exports.MODULE_TABLE.retirer(this.etat, ID_sorte.val);
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