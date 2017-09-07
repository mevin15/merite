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
var couleur_1 = require("./couleur");
var SujetAdmin = (_a = ["\n    background: ", ";\n    flex: auto;\n    align-self: center;\n    min-width: calc(24vw);\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n"], _a.raw = ["\n    background: ", ";\n    flex: auto;\n    align-self: center;\n    min-width: calc(24vw);\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n"], styled_components_1.default.div(_a, couleur_1.FOND));
var SujetAdminContainer = (_b = ["\n    flex: auto;\n    margin: 0;\n    background: ", ";\n    height: 7ex;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;    \n"], _b.raw = ["\n    flex: auto;\n    margin: 0;\n    background: ", ";\n    height: 7ex;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;    \n"], styled_components_1.default.div(_b, couleur_1.CADRE));
var Separateur = (_c = ["\n        margin: 0 0 0 1em;\n"], _c.raw = ["\n        margin: 0 0 0 1em;\n"], styled_components_1.default.div(_c));
var Retour = (_d = ["\n    flex: none;\n    width: 4ex;\n    height: 4ex;\n"], _d.raw = ["\n    flex: none;\n    width: 4ex;\n    height: 4ex;\n"], styled_components_1.default.div(_d));
var Role;
(function (Role) {
    Role[Role["Emetteur"] = 0] = "Emetteur";
    Role[Role["Recepteur"] = 1] = "Recepteur";
})(Role || (Role = {}));
;
var PastilleBrute = (function (_super) {
    __extends(PastilleBrute, _super);
    function PastilleBrute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PastilleBrute.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className }));
    };
    return PastilleBrute;
}(React.Component));
var Pastille = (_e = ["\n        flex: none;\n        width: 4ex;\n        height: 4ex;\n        border-radius: 100%;\n        background-color: ", ";\n    "], _e.raw = ["\n        flex: none;\n        width: 4ex;\n        height: 4ex;\n        border-radius: 100%;\n        background-color: ", ";\n    "], styled_components_1.default(PastilleBrute)(_e, function (props) { return props.fond; }));
var Pseudo = (_f = ["\n    flex: initial;\n    background: ", ";\n    color: ", ";\n    text-align: center;\n    padding: 1ex;\n    height: 4ex;\n    width: 10ex;\n    font-size: x-large;\n"], _f.raw = ["\n    flex: initial;\n    background: ", ";\n    color: ", ";\n    text-align: center;\n    padding: 1ex;\n    height: 4ex;\n    width: 10ex;\n    font-size: x-large;\n"], styled_components_1.default.div(_f, couleur_1.CADRE, couleur_1.TEXTE_INV));
var ObjetAdminBrut = (function (_super) {
    __extends(ObjetAdminBrut, _super);
    function ObjetAdminBrut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjetAdminBrut.prototype.render = function () {
        return React.createElement("button", { className: this.props.className, onClick: this.props.onClick },
            React.createElement(Pastille, { fond: this.props.fond }),
            React.createElement(Pseudo, null, this.props.nom));
    };
    return ObjetAdminBrut;
}(React.Component));
var ObjetAdmin = (_g = ["\n    flex: initial;\n    background: ", ";\n    border-radius: 1ex;\n\n    border-style: solid;\n    border-width: ", ";\n    border-color: ", ";\n\n    padding: ", ";\n    margin: 1em 0 1em 0;\n    max-width: 20vw;\n    width: 12em;\n    min-width: 12em;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;    \n"], _g.raw = ["\n    flex: initial;\n    background: ", ";\n    border-radius: 1ex;\n\n    border-style: solid;\n    border-width: ", ";\n    border-color: ", ";\n\n    padding: ", ";\n    margin: 1em 0 1em 0;\n    max-width: 20vw;\n    width: 12em;\n    min-width: 12em;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;    \n"], styled_components_1.default(ObjetAdminBrut)(_g, couleur_1.CADRE, function (props) { return props.choix ? "0.5ex" : "0"; }, couleur_1.SELECTION, function (props) { return props.choix ? "0.5ex" : "1ex"; }));
var ContenuContainerAdmin = (function (_super) {
    __extends(ContenuContainerAdmin, _super);
    function ContenuContainerAdmin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContenuContainerAdmin.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: this.props.className },
            React.createElement(SujetAdmin, null,
                React.createElement(SujetAdminContainer, null,
                    React.createElement(Separateur, null),
                    React.createElement(Retour, null,
                        React.createElement("img", { src: "chevronGauche.svg" })),
                    React.createElement(Separateur, null),
                    React.createElement(Separateur, null),
                    React.createElement(Pastille, { fond: this.props.sujet.fond }),
                    React.createElement(Pseudo, null, this.props.sujet.nom))),
            "Choisissez un destinataire :",
            this.props.objets.map(function (i) {
                return React.createElement(ObjetAdmin, { choix: _this.props.selection.nom === i.nom, onClick: function () { return _this.props.modifSelection(i); }, fond: i.fond, nom: i.nom });
            }),
            "ou tous les destinataires :",
            React.createElement(ObjetAdmin, { choix: this.props.selection.nom === this.props.tous.nom, onClick: function () { return _this.props.modifSelection(_this.props.tous); }, fond: this.props.tous.fond, nom: this.props.tous.nom })));
    };
    return ContenuContainerAdmin;
}(React.Component));
exports.ContainerAdmin = (_h = ["\n    background: ", ";\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le d\u00E9passement */\n    min-width: calc(24vw);\n    min-height: calc(100vh);\n    /* occupe au moins la place du container */\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    align-items: center;\n"], _h.raw = ["\n    background: ", ";\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le d\u00E9passement */\n    min-width: calc(24vw);\n    min-height: calc(100vh);\n    /* occupe au moins la place du container */\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    align-items: center;\n"], styled_components_1.default(ContenuContainerAdmin)(_h, couleur_1.FOND));
var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=containerAdmin.js.map