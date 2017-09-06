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
var communication_1 = require("../../bibliotheque/communication");
var types_1 = require("../../bibliotheque/types");
var outils_1 = require("../../bibliotheque/outils");
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
            case 'domaine': return s.domaine.representation();
            case 'ID': return s.ID.val;
        }
        return outils_1.jamais(e);
    };
    SommetJeu1.prototype.representation = function () {
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
            case 'centre': return creerSommetJeu1(s.centre).representation();
            case 'voisins': return types_1.creerTableImmutable(s.voisins).representation();
        }
        return outils_1.jamais(e);
    };
    NoeudJeu1IN.prototype.representation = function () {
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
            case 'centre': return creerSommetJeu1(s.centre).representation();
            case 'voisins': return types_1.creerTableImmutable(s.voisins).representation();
        }
        return outils_1.jamais(e);
    };
    NoeudJeu1EX.prototype.representation = function () {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    };
    return NoeudJeu1EX;
}(communication_1.NoeudEX));
exports.NoeudJeu1EX = NoeudJeu1EX;
function creerNoeudJeu1EX(n) {
    return new NoeudJeu1EX(n);
}
exports.creerNoeudJeu1EX = creerNoeudJeu1EX;
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
            case 'date': return types_1.creerDate(msg.date).representation();
            case 'ID_de': return msg.ID_origine.val;
            case 'ID_à': return msg.ID_destination.val;
            case 'contenu': return msg.contenu.representation();
        }
        return outils_1.jamais(e);
    };
    MessageJeu1.prototype.representation = function () {
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
        "date": types_1.creerDateMaintenant().ex()
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
            case 'nom': return u.pseudo.representation();
        }
        return outils_1.jamais(e);
    };
    Utilisateur.prototype.representation = function () {
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
    PopulationLocale.prototype.pourChaque = function (f) {
        this.pourChaque(f);
    };
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
            case 'centre': return creerSommetJeu1(config.centre).representation();
            case 'population':
                return types_1.creerTableImmutable(config.population).representation();
            case 'utilisateur': return creerUtilisateur(config.utilisateur).representation();
            case 'voisins': return types_1.creerTableImmutable(config.voisins).representation();
            case 'date': return types_1.creerDate(config.date).representation();
        }
        return outils_1.jamais(e);
    };
    ConfigurationJeu1.prototype.representation = function () {
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
        "configurationInitiale": types_1.Unite.ZERO,
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
            case 'date': return types_1.creerDate(erreur.date).representation();
        }
        return outils_1.jamais(e);
    };
    ErreurJeu1.prototype.representation = function () {
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
        "erreurRedhibitoire": types_1.Unite.ZERO,
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
        if (!this.contient(ID_dom)) {
            return false;
        }
        return this.valeurIN(ID_dom).contient(ID_util);
    };
    PopulationParDomaine.prototype.utilisateur = function (ID_dom, ID_util) {
        return this.valeurIN(ID_dom).valeur(ID_util);
    };
    PopulationParDomaine.prototype.ajouterDomaine = function (ID_dom) {
        this.ajouter(ID_dom, new TableUtilisateurs());
    };
    PopulationParDomaine.prototype.ajouterUtilisateur = function (ID_dom, u) {
        this.valeurIN(ID_dom).ajouter(u.ID, u);
    };
    PopulationParDomaine.prototype.retirerUtilisateur = function (ID_dom, ID_util) {
        this.valeurIN(ID_dom).retirer(ID_util);
    };
    PopulationParDomaine.prototype.selectionnerUtilisateur = function () {
        var ID_dom = this.selectionCleSuivantCritereIn(function (pop) { return !pop.estVide(); });
        var ID_util = this.valeurIN(ID_dom).selectionCle();
        return [ID_dom, ID_util];
    };
    return PopulationParDomaine;
}(types_1.TableIdentification));
exports.PopulationParDomaine = PopulationParDomaine;
function creerVidePopulationParDomaine() {
    return new PopulationParDomaine();
}
exports.creerVidePopulationParDomaine = creerVidePopulationParDomaine;
function assemblerPopulationParDomaine(reseau, noms) {
    var popDom = creerVidePopulationParDomaine();
    reseau.pourChaqueNoeud(function (ID_dom, n) {
        popDom.ajouterDomaine(ID_dom);
        var popLoc = peuplerPopulationLocale("UTIL-" + ID_dom.val + "-", noms);
        popLoc.pourChaque(function (ID_util, u) {
            popDom.ajouterUtilisateur(ID_dom, u);
        });
    });
    return popDom;
}
exports.assemblerPopulationParDomaine = assemblerPopulationParDomaine;
//# sourceMappingURL=jeu1_adressageRoutage.js.map