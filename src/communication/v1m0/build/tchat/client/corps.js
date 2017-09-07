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
var React = require("react");
var styled_components_1 = require("styled-components");
var admin_1 = require("./admin");
var action_1 = require("./action");
var couleur_1 = require("./couleur");
var types_1 = require("../../bibliotheque/types");
var client_1 = require("../../bibliotheque/client");
var tchat_1 = require("../commun/tchat");
var ApresAdmin = (_a = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-color: ", ";\n"], _a.raw = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-color: ", ";\n"], styled_components_1.default.div(_a, couleur_1.CADRE, couleur_1.SEPARATION_CADRE));
var ApresAction = (_b = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-color: ", ";\n"], _b.raw = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-color: ", ";\n"], styled_components_1.default.div(_b, couleur_1.CADRE, couleur_1.SEPARATION_CADRE));
function cachetDate(d) {
    return types_1.creerDate(d).representation();
}
var EtatInterfaceTchat;
(function (EtatInterfaceTchat) {
    EtatInterfaceTchat[EtatInterfaceTchat["INITIAL"] = 0] = "INITIAL";
    EtatInterfaceTchat[EtatInterfaceTchat["NORMAL"] = 1] = "NORMAL";
    EtatInterfaceTchat[EtatInterfaceTchat["ERRONE"] = 2] = "ERRONE";
})(EtatInterfaceTchat || (EtatInterfaceTchat = {}));
;
var ID_TOUS = "TOUS";
/*
 * Degré du graphe limité à 4 - Cf. la liste des couples de couleurs.
 */
var CorpsBrut = /** @class */ (function (_super) {
    __extends(CorpsBrut, _super);
    function CorpsBrut(props) {
        var _this = _super.call(this, props) || this;
        _this.adresseServeur = tchat_1.hote + ":" + tchat_1.port2;
        _this.messageErreur = "Aucune erreur";
        _this.toutIndividu = {
            id: types_1.creerIdentifiant('sommet', ID_TOUS),
            nom: "tous",
            fond: couleur_1.COUPLE_FOND_ENCRE_TOUS.fond,
            encre: couleur_1.COUPLE_FOND_ENCRE_TOUS.encre
        };
        _this.state = {
            selection: _this.toutIndividu,
            messages: [],
            etatInterface: EtatInterfaceTchat.INITIAL,
        };
        _this.envoyerMessage = _this.envoyerMessage.bind(_this);
        _this.modifierSelection = _this.modifierSelection.bind(_this);
        return _this;
    }
    CorpsBrut.prototype.modifierSelection = function (i) {
        this.setState({ selection: i });
    };
    CorpsBrut.prototype.envoyerMessage = function (m) {
        var _this = this;
        if (m.destinataire.id.val === ID_TOUS) {
            console.log("* Diffusion du message");
            this.individusObjets.pourChaque(function (c, v) {
                var msg = tchat_1.creerMessageCommunication(m.emetteur.id, v.id, m.contenu);
                console.log("- brut : " + msg.brut());
                console.log("- net : " + msg.representation());
                _this.canal.envoyerMessage(msg);
            });
            return;
        }
        var msg = tchat_1.creerMessageCommunication(m.emetteur.id, m.destinataire.id, m.contenu);
        console.log("* Envoi du message");
        console.log("- brut : " + msg.brut());
        console.log("- net : " + msg.representation());
        this.canal.envoyerMessage(msg);
    };
    CorpsBrut.prototype.render = function () {
        switch (this.state.etatInterface) {
            case EtatInterfaceTchat.NORMAL:
                return (React.createElement("div", { className: this.props.className },
                    React.createElement(admin_1.Admin, { sujet: this.individuSujet, objets: this.individusObjets.image(), tous: this.toutIndividu, selection: this.state.selection, modifSelection: this.modifierSelection }),
                    React.createElement(ApresAdmin, null),
                    React.createElement(action_1.Action, { sujet: this.individuSujet, messages: this.state.messages, selection: this.state.selection, envoiMessage: this.envoyerMessage }),
                    React.createElement(ApresAction, null)));
            case EtatInterfaceTchat.INITIAL:
                return (React.createElement("h1", null, "Connexion au serveur pour l'initialisation"));
            case EtatInterfaceTchat.ERRONE:
                return (React.createElement("div", null,
                    React.createElement("h1", null, "Fin de l'application apr\u00E8s l'erreur suivante : "),
                    React.createElement("div", { style: { color: couleur_1.TEXTE_ERREUR } }, this.messageErreur)));
        }
    };
    /* TODO */
    CorpsBrut.prototype.componentDidMount = function () {
        var _this = this;
        console.log("* Initialisation après montage du corps");
        console.log("- du canal de communication avec le serveur d'adresse " + this.adresseServeur);
        this.canal = client_1.creerCanalClient(this.adresseServeur);
        console.log("- du traitement des messages");
        this.canal.enregistrerTraitementMessageRecu(function (m) {
            var msg = new tchat_1.MessageTchat(m);
            console.log("* Réception");
            console.log("- du message brut : " + msg.brut());
            console.log("- du message net : " + msg.representation());
            var emetteur;
            var destinataire;
            var cachet = cachetDate(msg.ex().date);
            var contenu = msg.ex().contenu;
            if (_this.individusObjets.contient(msg.ex().ID_emetteur.val)) {
                emetteur = _this.individusObjets.ex().table[msg.ex().ID_emetteur.val];
                destinataire = _this.individuSujet;
            }
            else {
                emetteur = _this.individuSujet;
                destinataire = _this.individusObjets.ex().table[msg.ex().ID_destinataire.val];
            }
            var msgAffichable = {
                emetteur: emetteur,
                destinataire: destinataire,
                cachet: cachet,
                contenu: contenu
            };
            _this.setState(function (etatAvant) { return ({
                messages: etatAvant.messages.concat([msgAffichable])
            }); });
        });
        console.log("- du traitement de la configuration");
        this.canal.enregistrerTraitementConfigurationRecue(function (c) {
            var config = tchat_1.creerConfigurationTchat(c);
            console.log("* Réception");
            console.log("- de la configuration brute : " + config.brut());
            console.log("- de la configuration nette : " + config.representation());
            console.log("* Initialisation du noeud du réseau");
            _this.noeud = tchat_1.creerNoeudTchatEX(tchat_1.decomposerConfiguration(config));
            _this.individuSujet = {
                id: _this.noeud.ex().centre.ID,
                nom: _this.noeud.ex().centre.pseudo,
                fond: couleur_1.COUPLE_FOND_ENCRE_SUJET.fond,
                encre: couleur_1.COUPLE_FOND_ENCRE_SUJET.encre
            };
            var suite = new couleur_1.SuiteCouplesFondEncre();
            _this.individusObjets =
                types_1.creerTableImmutable(_this.noeud.ex().voisins).application(function (s) {
                    var c = suite.courant();
                    return {
                        id: s.ID,
                        nom: s.pseudo,
                        fond: c.fond,
                        encre: c.encre
                    };
                });
            _this.setState({
                etatInterface: EtatInterfaceTchat.NORMAL
            });
        });
        console.log("- du traitement d'une erreur rédhibitoire");
        this.canal.enregistrerTraitementErreurRecue(function (err) {
            var erreur = tchat_1.creerErreurTchat(err);
            console.log("* Réception");
            console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
            console.log("- de l'erreur rédhibitoire nette : " + erreur.representation());
            console.log("* Affichage de l'erreur");
            _this.messageErreur = erreur.representation();
            _this.setState({
                etatInterface: EtatInterfaceTchat.ERRONE,
            });
        });
    };
    return CorpsBrut;
}(React.Component));
exports.Corps = (_c = ["\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background: ", "\n"], _c.raw = ["\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background: ", "\n"], styled_components_1.default(CorpsBrut)(_c, couleur_1.FOND));
var _a, _b, _c;
//# sourceMappingURL=corps.js.map