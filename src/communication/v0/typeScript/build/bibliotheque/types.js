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
Object.defineProperty(exports, "__esModule", { value: true });
// Revue 02/08 - Testé.
var outils_1 = require("./outils");
// Les enum sont des sous-types de number.
var Unite;
(function (Unite) {
    Unite[Unite["ZERO"] = 0] = "ZERO";
})(Unite = exports.Unite || (exports.Unite = {}));
var Deux;
(function (Deux) {
    Deux[Deux["ZERO"] = 0] = "ZERO";
    Deux[Deux["UN"] = 1] = "UN";
})(Deux = exports.Deux || (exports.Deux = {}));
// Types formats JSON : FormatX par convention
// Il est recommandé de choisir le plus possible des formats immutables.
// Format ::= { (readonly etiquette : Format)*} 
//          | { (readonly etiquette : Format)*, (etiquette : Format)+, mutable : Unite} 
//          | { readonly table: { readonly [cle: string]: T }}
//          | { readonly table: { [cle: string]: T }}
//          | { table: { readonly [cle: string]: T }, mutable : Unite}
//          | { table: { [cle: string]: T }, mutable : Unite}
// Modèle générique d'une enveloppe d'un état
// TEX : type de sortie immutable (souvent format JSON en lecture seulement)
// TIN : type d'entrée pour l'état en format JSON ou non (mutable ou non, confiné si mutable)
// E : étiquettes utiles pour une représentation (cf. méthode net)
// La différence entre TIN et TEX permet de gérer les effets de bord sur l'état, souvent au format JSON.
// Une fonction de conversion de TIN vers TEX est requise.
// Toute méthode ayant une occurrence positive de TIN est protected. En effet, elle est susceptible
//   de permettre un effet de bord sur l'état s'il est mutable.
// Cette classe abstraite doit être étedue ;
// - implémentation de net et représenter,
// - extension par de méthodes modifiant ou observant l'état.
var Enveloppe = (function () {
    function Enveloppe(inEnEx, etat) {
        this.etat = etat;
        this.inEnEx = inEnEx;
    }
    Enveloppe.prototype.in = function () {
        return this.etat;
    };
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
/* ***********************************************************************************************
*
*/
var Semaine;
(function (Semaine) {
    Semaine[Semaine["LUNDI"] = 0] = "LUNDI";
    Semaine[Semaine["MARDI"] = 1] = "MARDI";
    Semaine[Semaine["MERCREDI"] = 2] = "MERCREDI";
    Semaine[Semaine["JEUDI"] = 3] = "JEUDI";
    Semaine[Semaine["VENDREDI"] = 4] = "VENDREDI";
    Semaine[Semaine["SAMEDI"] = 5] = "SAMEDI";
    Semaine[Semaine["DIMANCHE"] = 6] = "DIMANCHE";
})(Semaine = exports.Semaine || (exports.Semaine = {}));
var Mois;
(function (Mois) {
    Mois[Mois["JANVIER"] = 0] = "JANVIER";
    Mois[Mois["FEVRIER"] = 1] = "FEVRIER";
    Mois[Mois["MARS"] = 2] = "MARS";
    Mois[Mois["AVRIL"] = 3] = "AVRIL";
    Mois[Mois["MAI"] = 4] = "MAI";
    Mois[Mois["JUIN"] = 5] = "JUIN";
    Mois[Mois["JUILLET"] = 6] = "JUILLET";
    Mois[Mois["AOUT"] = 7] = "AOUT";
    Mois[Mois["SEPTEMBRE"] = 8] = "SEPTEMBRE";
    Mois[Mois["OCTOBRE"] = 9] = "OCTOBRE";
    Mois[Mois["NOVEMBRE"] = 10] = "NOVEMBRE";
    Mois[Mois["DECEMBRE"] = 11] = "DECEMBRE";
})(Mois = exports.Mois || (exports.Mois = {}));
function conversionDate(d) {
    return {
        seconde: d.getSeconds(),
        minute: d.getMinutes(),
        heure: d.getHours(),
        jourSemaine: (d.getDay() + 6) % 7,
        jourMois: d.getDate(),
        mois: d.getMonth(),
        annee: d.getFullYear()
    };
}
exports.conversionDate = conversionDate;
var DateFrEnveloppe = (function (_super) {
    __extends(DateFrEnveloppe, _super);
    function DateFrEnveloppe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFrEnveloppe.prototype.net = function (e) {
        // A déplacer sous les cas.
        var s = outils_1.normalisationNombre(this.in().seconde, 2);
        var min = outils_1.normalisationNombre(this.in().minute, 2);
        var h = outils_1.normalisationNombre(this.in().heure, 2);
        var js = this.in().jourSemaine;
        var jsL = Semaine[js].toLowerCase();
        var jm = outils_1.normalisationNombre(this.in().jourMois, 2);
        var mo = this.in().mois;
        var moL = Mois[mo].toLowerCase();
        var moN = outils_1.normalisationNombre(mo + 1, 2);
        var a = this.in().annee.toString();
        switch (e) {
            case 'heure': return h + ":" + min + ":" + s;
            case 'jourSemaine': return jsL;
            case 'jourMois': return jm;
            case 'moisLettre': return moL;
            case 'moisNumero': return moN;
            case 'annee': return a;
            case 'date': return jm + "/" + moN + "/" + a;
            case 'dateLongue': return jsL + " " + jm + " " + moL + " " + a;
        }
        return outils_1.jamais(e);
    };
    DateFrEnveloppe.prototype.detail = function (e) {
        return this.detail(e);
    };
    DateFrEnveloppe.prototype.representation = function () {
        return this.net('heure') + ", le " + this.net('date');
    };
    DateFrEnveloppe.prototype.representationLongue = function () {
        return this.net('heure') + ", le " + this.net('dateLongue');
    };
    DateFrEnveloppe.prototype.representationLog = function () {
        return this.net('heure') + " " + this.net('date');
    };
    return DateFrEnveloppe;
}(Enveloppe));
exports.DateFrEnveloppe = DateFrEnveloppe;
function creerDateMaintenant() {
    return new DateFrEnveloppe(function (x) { return x; }, conversionDate(new Date()));
}
exports.creerDateMaintenant = creerDateMaintenant;
function creerDate(d) {
    return new DateFrEnveloppe(function (x) { return x; }, d);
}
exports.creerDate = creerDate;
var ModuleTableau = (function () {
    function ModuleTableau() {
    }
    ModuleTableau.prototype.pourChaque = function (f, t) {
        t.tableau.forEach(function (v, i, t) { return f(i, v, t); });
    };
    ModuleTableau.prototype.valeur = function (t, index) {
        return t.tableau[index];
    };
    ModuleTableau.prototype.taille = function (t) {
        return t.tableau.length;
    };
    ModuleTableau.prototype.foncteur = function (t, f) {
        var r = [];
        this.pourChaque(function (i, v) {
            r[i] = f(v);
        }, t);
        return { taille: r.length, tableau: r, mutable: Unite.ZERO };
    };
    ModuleTableau.prototype.reduction = function (t, neutre, op) {
        var r = neutre;
        this.pourChaque(function (i, v) {
            r = op(r, v);
        }, t);
        return r;
    };
    ModuleTableau.prototype.ajouterEnFin = function (t, x) {
        t.tableau.push(x);
    };
    ModuleTableau.prototype.retirerEnFin = function (t) {
        if (t.taille === 0) {
            throw new Error("[Exception : retirerEnFin() non défini.]");
        }
        return t.tableau.pop();
    };
    return ModuleTableau;
}());
exports.ModuleTableau = ModuleTableau;
var MODULE_TABLEAU = new ModuleTableau();
// Conversion pour les tables 
function conversionFormatTableau(conv) {
    return (function (t) {
        var r = new Array(t.taille);
        MODULE_TABLEAU.pourChaque(function (i, v) {
            r[i] = conv(v);
        }, t);
        return { taille: t.taille, tableau: r };
    });
}
exports.conversionFormatTableau = conversionFormatTableau;
// Tableau immutable : TIN = TEX (recommandé : immutable)
var TableauImmutable = (function (_super) {
    __extends(TableauImmutable, _super);
    function TableauImmutable(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    TableauImmutable.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'valeurs': return this.in().tableau.toString();
        }
        return outils_1.jamais(e);
    };
    TableauImmutable.prototype.representation = function () {
        return "[" + this.net('valeurs') + "]";
    };
    TableauImmutable.prototype.pourChaque = function (f) {
        MODULE_TABLEAU.pourChaque(f, this.in());
    };
    TableauImmutable.prototype.foncteur = function (f) {
        return new TableauImmutable(MODULE_TABLEAU.foncteur(this.in(), f));
    };
    TableauImmutable.prototype.reduction = function (neutre, op) {
        return MODULE_TABLEAU.reduction(this.in(), neutre, op);
    };
    TableauImmutable.prototype.valeur = function (index) {
        return MODULE_TABLEAU.valeur(this.in(), index);
    };
    TableauImmutable.prototype.taille = function () {
        return MODULE_TABLEAU.taille(this.in());
    };
    TableauImmutable.prototype.estVide = function () {
        return this.taille() === 0;
    };
    return TableauImmutable;
}(Enveloppe));
exports.TableauImmutable = TableauImmutable;
function creerTableauImmutable(t) {
    return new TableauImmutable({
        taille: t.length,
        tableau: t
    });
}
exports.creerTableauImmutable = creerTableauImmutable;
// Tableau mutable - TIN peut être différent de TEX.
//   Recommandé : TEX immutable.
// Attention : la méthode ex() requiert un parcours du tableau formant l'état.
var Tableau = (function (_super) {
    __extends(Tableau, _super);
    function Tableau(valInVersEx, etat) {
        if (etat === void 0) { etat = { taille: 0, tableau: [], mutable: Unite.ZERO }; }
        var _this = _super.call(this, conversionFormatTableau(valInVersEx), etat) || this;
        _this.valInVersEx = valInVersEx;
        return _this;
    }
    Tableau.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'valeurs': return this.in().tableau.toString();
        }
        return outils_1.jamais(e);
    };
    Tableau.prototype.representation = function () {
        return "[" + this.net('valeurs') + "]";
    };
    Tableau.prototype.pourChaqueIn = function (f) {
        MODULE_TABLEAU.pourChaque(f, this.in());
    };
    Tableau.prototype.pourChaque = function (f) {
        var _this = this;
        this.pourChaqueIn(function (i, v, t) { return f(i, _this.valInVersEx(v)); });
    };
    Tableau.prototype.valeurIn = function (i) {
        return MODULE_TABLEAU.valeur(this.in(), i);
    };
    Tableau.prototype.valeur = function (i) {
        return this.valInVersEx(this.valeurIn(i));
    };
    Tableau.prototype.taille = function () {
        return MODULE_TABLEAU.taille(this.in());
    };
    Tableau.prototype.estVide = function () {
        return this.taille() === 0;
    };
    Tableau.prototype.ajouterEnFin = function (x) {
        MODULE_TABLEAU.ajouterEnFin(this.in(), x);
    };
    Tableau.prototype.retirerEnFin = function () {
        MODULE_TABLEAU.retirerEnFin(this.in());
    };
    return Tableau;
}(Enveloppe));
exports.Tableau = Tableau;
function creerTableauVide(valInVersEx) {
    return new Tableau(valInVersEx);
}
exports.creerTableauVide = creerTableauVide;
// Un module réservoir de fonctions utiles sur les tables.
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
        return { table: r, mutable: Unite.ZERO };
    };
    ModuleTable.prototype.transformationTableVersTableau = function (t, f) {
        var r = [];
        this.pourChaque(function (c, v) {
            r.push(f(c, v));
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
    ModuleTable.prototype.selectionCleSuivantCritere = function (t, prop) {
        // sélection d'une clé
        for (var c_3 in t.table) {
            if (prop(t.table[c_3])) {
                return c_3;
            }
        }
        throw new Error("[Exception : selectionCleSuivantCritere() non défini.]");
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
var MODULE_TABLE = new ModuleTable();
// Conversion pour les tables 
function conversionFormatTable(conv) {
    return (function (t) {
        var r = {};
        MODULE_TABLE.pourChaque(function (c, v) {
            r[c] = conv(v);
        }, t);
        return { table: r };
    });
}
exports.conversionFormatTable = conversionFormatTable;
// Table immutable : TIN = TEX (recommandé : immutable)
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
    TableImmutable.prototype.representation = function () {
        return this.net('graphe');
    };
    TableImmutable.prototype.pourChaque = function (f) {
        MODULE_TABLE.pourChaque(f, this.in());
    };
    TableImmutable.prototype.valeur = function (cle) {
        return MODULE_TABLE.valeur(this.in(), cle);
    };
    TableImmutable.prototype.contient = function (cle) {
        return MODULE_TABLE.contient(this.in(), cle);
    };
    TableImmutable.prototype.image = function () {
        return MODULE_TABLE.image(this.in());
    };
    TableImmutable.prototype.domaine = function () {
        return MODULE_TABLE.domaine(this.in());
    };
    TableImmutable.prototype.taille = function () {
        return MODULE_TABLE.taille(this.in());
    };
    TableImmutable.prototype.selectionCle = function () {
        return MODULE_TABLE.selectionCle(this.in());
    };
    TableImmutable.prototype.selectionCleSuivantCritere = function (prop) {
        return MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop);
    };
    TableImmutable.prototype.application = function (f) {
        return new TableImmutable(MODULE_TABLE.foncteur(this.in(), f));
    };
    return TableImmutable;
}(Enveloppe));
exports.TableImmutable = TableImmutable;
function creerTableImmutable(t) {
    return new TableImmutable(t);
}
exports.creerTableImmutable = creerTableImmutable;
// Table mutable - TIN peut être différent de TEX.
//   Recommandé : TEX immutable.
// Attention : la méthode ex() requiert un parcours de la table formant l'état.
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(valInVersEx, etat) {
        var _this = _super.call(this, conversionFormatTable(valInVersEx), etat) || this;
        _this.valInVersEx = valInVersEx;
        return _this;
    }
    Table.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map(function (v, i) { return JSON.stringify(v); }).toString();
            case 'graphe': return this.brut();
        }
        return outils_1.jamais(e);
    };
    Table.prototype.representation = function () {
        return this.net('graphe');
    };
    Table.prototype.pourChaqueIn = function (f) {
        MODULE_TABLE.pourChaque(f, this.in());
    };
    Table.prototype.pourChaque = function (f) {
        var _this = this;
        this.pourChaqueIn(function (c, v, t) { return f(c, _this.valInVersEx(v)); });
        // moins efficace (deux parcours) : MODULE_TABLE.pourChaque(f, this.ex());
    };
    Table.prototype.valeurIn = function (cle) {
        return MODULE_TABLE.valeur(this.in(), cle);
    };
    Table.prototype.valeur = function (cle) {
        return this.valInVersEx(this.valeurIn(cle));
        // moins efficace : MODULE_TABLE.valeur(this.ex(), cle);
    };
    Table.prototype.contient = function (cle) {
        return MODULE_TABLE.contient(this.in(), cle);
    };
    Table.prototype.imageIn = function () {
        return MODULE_TABLE.image(this.in());
    };
    Table.prototype.image = function () {
        var _this = this;
        return MODULE_TABLE.transformationTableVersTableau(this.in(), function (c, v) { return _this.valInVersEx(v); });
        // moins efficace : MODULE_TABLE.image(this.ex());
    };
    Table.prototype.domaine = function () {
        return MODULE_TABLE.domaine(this.in());
    };
    Table.prototype.taille = function () {
        return MODULE_TABLE.taille(this.in());
    };
    Table.prototype.estVide = function () {
        return this.taille() === 0;
    };
    Table.prototype.selectionCle = function () {
        return MODULE_TABLE.selectionCle(this.in());
    };
    Table.prototype.selectionCleSuivantCritereIn = function (prop) {
        return MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop);
    };
    Table.prototype.selectionCleSuivantCritere = function (prop) {
        var _this = this;
        return this.selectionCleSuivantCritereIn(function (x) { return prop(_this.valInVersEx(x)); });
        // moins efficace : MODULE_TABLE.selectionCleSuivantCritere(this.ex(), prop);
    };
    Table.prototype.ajouter = function (cle, x) {
        MODULE_TABLE.ajouter(this.in(), cle, x);
    };
    Table.prototype.retirer = function (cle) {
        MODULE_TABLE.retirer(this.in(), cle);
    };
    return Table;
}(Enveloppe));
exports.Table = Table;
function creerTableVide(valInVersEx) {
    return new Table(valInVersEx, { table: {}, mutable: Unite.ZERO });
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
        return creerIdentifiant(s, id);
    };
    return IdentificationParCompteur;
}());
exports.IdentificationParCompteur = IdentificationParCompteur;
function creerIdentificationParCompteur(prefixe) {
    return new IdentificationParCompteur(prefixe);
}
exports.creerIdentificationParCompteur = creerIdentificationParCompteur;
function creerIdentifiant(s, cle) {
    return {
        val: cle,
        sorte: s
    };
}
exports.creerIdentifiant = creerIdentifiant;
/*
* Table utilisant des identificateurs comme clé.
* Remarque : les tables précédentes fondées sur les tables en JSON utilisent nécessdairement le type string pour les clés.
*/
var TableIdentification = (function (_super) {
    __extends(TableIdentification, _super);
    function TableIdentification(sorte, valInVersEx, pop) {
        if (pop === void 0) { pop = { table: {} }; }
        var _this = _super.call(this, conversionFormatTable(valInVersEx), { table: pop.table, mutable: Unite.ZERO }) || this;
        _this.sorte = sorte;
        _this.valInVersEx = valInVersEx;
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
    TableIdentification.prototype.representation = function () {
        return this.net('graphe');
    };
    TableIdentification.prototype.pourChaqueIn = function (f) {
        var _this = this;
        MODULE_TABLE.pourChaque(function (id, v, t) { return f(creerIdentifiant(_this.sorte, id), v, t); }, this.in());
    };
    TableIdentification.prototype.pourChaque = function (f) {
        var _this = this;
        this.pourChaqueIn(function (c, v, t) { return f(c, _this.valInVersEx(v)); });
        // moins efficace (deux parcours) : MODULE_TABLE.pourChaque(f, this.ex());
    };
    TableIdentification.prototype.valeurIN = function (ID_sorte) {
        return MODULE_TABLE.valeur(this.in(), ID_sorte.val);
    };
    TableIdentification.prototype.valeur = function (ID_sorte) {
        return this.valInVersEx(this.valeurIN(ID_sorte));
    };
    TableIdentification.prototype.contient = function (ID_sorte) {
        return MODULE_TABLE.contient(this.in(), ID_sorte.val);
    };
    TableIdentification.prototype.imageIn = function () {
        return MODULE_TABLE.image(this.in());
    };
    TableIdentification.prototype.image = function () {
        var _this = this;
        return MODULE_TABLE.transformationTableVersTableau(this.in(), function (c, v) { return _this.valInVersEx(v); });
        // moins efficace : MODULE_TABLE.image(this.ex());
    };
    TableIdentification.prototype.domaine = function () {
        var _this = this;
        return MODULE_TABLE.transformationTableVersTableau(this.in(), function (c, v) { return creerIdentifiant(_this.sorte, c); });
        // moins efficace : return MODULE_TABLE.domaine(this.in()).
        //    map((s) => { return { val: s, sorte: this.sorte } });
    };
    TableIdentification.prototype.selectionCle = function () {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCle(this.in()));
    };
    TableIdentification.prototype.selectionCleSuivantCritereIn = function (prop) {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop));
    };
    TableIdentification.prototype.selectionCleSuivantCritere = function (prop) {
        var _this = this;
        return this.selectionCleSuivantCritereIn(function (x) { return prop(_this.valInVersEx(x)); });
        // moins efficace : MODULE_TABLE.selectionCleSuivantCritere(this.ex(), prop);
    };
    TableIdentification.prototype.taille = function () {
        return MODULE_TABLE.taille(this.in());
    };
    TableIdentification.prototype.estVide = function () {
        return this.taille() === 0;
    };
    TableIdentification.prototype.ajouter = function (ID_sorte, x) {
        MODULE_TABLE.ajouter(this.in(), ID_sorte.val, x);
    };
    TableIdentification.prototype.retirer = function (ID_sorte) {
        MODULE_TABLE.retirer(this.in(), ID_sorte.val);
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
// Version immutable
var TableIdentificationImmutable = (function (_super) {
    __extends(TableIdentificationImmutable, _super);
    function TableIdentificationImmutable(sorte, pop) {
        if (pop === void 0) { pop = { table: {} }; }
        var _this = _super.call(this, conversionFormatTable(function (x) { return x; }), pop) || this;
        _this.sorte = sorte;
        return _this;
    }
    TableIdentificationImmutable.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return JSON.stringify(this.ex().table);
        }
        return outils_1.jamais(e);
    };
    TableIdentificationImmutable.prototype.representation = function () {
        return this.net('graphe');
    };
    TableIdentificationImmutable.prototype.pourChaque = function (f) {
        var _this = this;
        MODULE_TABLE.pourChaque(function (id, v, t) { return f(creerIdentifiant(_this.sorte, id), v, t); }, this.in());
    };
    TableIdentificationImmutable.prototype.valeur = function (ID_sorte) {
        return MODULE_TABLE.valeur(this.in(), ID_sorte.val);
    };
    TableIdentificationImmutable.prototype.contient = function (ID_sorte) {
        return MODULE_TABLE.contient(this.in(), ID_sorte.val);
    };
    TableIdentificationImmutable.prototype.image = function () {
        return MODULE_TABLE.image(this.in());
    };
    TableIdentificationImmutable.prototype.domaine = function () {
        var _this = this;
        return MODULE_TABLE.transformationTableVersTableau(this.in(), function (c, v) { return creerIdentifiant(_this.sorte, c); });
    };
    TableIdentificationImmutable.prototype.selectionCle = function () {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCle(this.in()));
    };
    TableIdentificationImmutable.prototype.selectionCleSuivantCritere = function (prop) {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop));
    };
    TableIdentificationImmutable.prototype.taille = function () {
        return MODULE_TABLE.taille(this.in());
    };
    TableIdentificationImmutable.prototype.estVide = function () {
        return this.taille() === 0;
    };
    return TableIdentificationImmutable;
}(Enveloppe));
exports.TableIdentificationImmutable = TableIdentificationImmutable;
function creerTableIdentificationImmutableVide(sorte) {
    return new TableIdentificationImmutable(sorte);
}
exports.creerTableIdentificationImmutableVide = creerTableIdentificationImmutableVide;
function creerTableIdentificationImmutable(sorte, pop) {
    return new TableIdentificationImmutable(sorte, pop);
}
exports.creerTableIdentificationImmutable = creerTableIdentificationImmutable;
//# sourceMappingURL=types.js.map