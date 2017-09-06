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
var ApresAdmin = (_a = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], _a.raw = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], styled_components_1.default.div(_a, couleur_1.COULEUR_SEPARATION, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC));
var ApresAction = (_b = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], _b.raw = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], styled_components_1.default.div(_b, couleur_1.COULEUR_SEPARATION, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC));
var CorpsBrut = (function (_super) {
    __extends(CorpsBrut, _super);
    function CorpsBrut(props) {
        var _this = _super.call(this, props) || this;
        _this.individusObjets = [];
        var zaza = {
            nom: "Zaza",
            fond: couleur_1.JAUNE,
            encre: couleur_1.NOIR,
        };
        _this.individusObjets.push(zaza);
        var toto = {
            nom: "Toto",
            fond: couleur_1.VIOLET,
            encre: couleur_1.BLANC,
        };
        _this.individusObjets.push(toto);
        var titi = {
            nom: "Titi",
            fond: couleur_1.BLEU_CANARD,
            encre: couleur_1.BLANC,
        };
        _this.individusObjets.push(titi);
        var sissi = {
            nom: "Sissi",
            fond: couleur_1.VERT,
            encre: couleur_1.NOIR,
        };
        _this.individusObjets.push(sissi);
        _this.individuSujet = {
            nom: "Momo",
            fond: couleur_1.ROUGE,
            encre: couleur_1.BLANC,
        };
        _this.toutIndividu = {
            nom: "tous",
            fond: couleur_1.TOUS,
            encre: couleur_1.NOIR,
        };
        var msgs = [];
        msgs.push({
            emetteur: _this.individuSujet,
            destinataire: zaza,
            contenu: "coucou zaza. Cette ligne est très longue et mérite d'être étendue vers la droite. Cela se fait automatiquement.\nA bientôt.\nMomo.",
            cachet: "12:43"
        });
        msgs.push({
            emetteur: zaza,
            destinataire: _this.individuSujet,
            contenu: "Effectivement. La longueur des lignes est ajustée automatiquement entre une valeur min et une max.\nA bientôt. \nZaza",
            cachet: "12:47"
        });
        msgs.push({
            emetteur: _this.individuSujet,
            destinataire: sissi,
            contenu: "coucou sissi. Ligne courte sans extension.\nA bientôt.",
            cachet: "12:49"
        });
        msgs.push({
            emetteur: _this.individuSujet,
            destinataire: toto,
            contenu: "coucou toto. On peut écrire un long texte avec extension et passage à la ligne automatique. "
                + "Pour forcer la passage à la ligne, on utilise antislash n dans une chaîne et la balise br en html.\nA bientôt.",
            cachet: "12:56"
        });
        msgs.push({
            emetteur: toto,
            destinataire: _this.individuSujet,
            contenu: "coucou momo.\nMessages envoyés : à gauche.\nMessages reçus : à droite."
                + "\nLes couleurs permettent de distinguer les différents interlocuteurs.",
            cachet: "13:09"
        });
        msgs.push({
            emetteur: _this.individuSujet,
            destinataire: _this.toutIndividu,
            contenu: "J'utilise une pastille rouge. Mais peut-être tout émetteur l'utilisera. A voir !\n"
                + "Titi utilise le bleu canard, Toto le violet et le gris est réservé à la diffusion à tous.\nA+",
            cachet: "13:39"
        });
        msgs.push({
            emetteur: titi,
            destinataire: _this.individuSujet,
            contenu: "coucou Momo.\nLe temps augmente vers le bas : les messages les plus récents sont en bas, les plus anciens en haut. "
                + "Lorsque la pile des messages émis et reçus grandit, elle s'étend vers le haut ; "
                + "quand elle dépasse les limites de sa fenêtre, un ascenseur apparaît à droite, pour permettre le défilement."
                + "\nA+",
            cachet: "14:47"
        });
        msgs.push({
            emetteur: _this.individuSujet,
            destinataire: sissi,
            contenu: "Fin.\nSi je voulais écrire un nouveau message, "
                + "je sélectionnerais à gauche mon destinataire puis écrirais le message dans le cadre noir. "
                + "Sa hauteur s'ajuste automatiquement à celle du texte.",
            cachet: "18:45"
        });
        _this.state = {
            selection: _this.toutIndividu,
            messages: msgs
        };
        _this.modifierSelection = _this.modifierSelection.bind(_this);
        return _this;
    }
    CorpsBrut.prototype.modifierSelection = function (i) {
        this.setState({ selection: i });
    };
    CorpsBrut.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(admin_1.Admin, { sujet: this.individuSujet, objets: this.individusObjets, tous: this.toutIndividu, selection: this.state.selection, modifSelection: this.modifierSelection }),
            React.createElement(ApresAdmin, null),
            React.createElement(action_1.Action, { sujet: this.individuSujet, messages: this.state.messages, selection: this.state.selection }),
            React.createElement(ApresAction, null)));
    };
    return CorpsBrut;
}(React.Component));
exports.Corps = (_c = ["\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background: ", "\n"], _c.raw = ["\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background: ", "\n"], styled_components_1.default(CorpsBrut)(_c, couleur_1.FOND));
var _a, _b, _c;
//# sourceMappingURL=corps.js.map