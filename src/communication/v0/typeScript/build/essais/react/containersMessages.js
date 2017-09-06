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
var react_textarea_autosize_1 = require("react-textarea-autosize");
var Role;
(function (Role) {
    Role[Role["Emetteur"] = 0] = "Emetteur";
    Role[Role["Recepteur"] = 1] = "Recepteur";
})(Role || (Role = {}));
;
var InterlocuteurBrut = (function (_super) {
    __extends(InterlocuteurBrut, _super);
    function InterlocuteurBrut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InterlocuteurBrut.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className }, ((this.props.role === Role.Emetteur) ? "De : " : "A : ") + this.props.nom));
    };
    return InterlocuteurBrut;
}(React.Component));
var Interlocuteur = (_a = ["\n        flex: none;\n        background-color: ", ";\n        color : ", ";                \n        text-align: center;\n        padding: 1ex;\n        height: 4ex;\n        width: 18ex;\n        margin: 1ex;\n        border-radius: 1ex;\n    "], _a.raw = ["\n        flex: none;\n        background-color: ", ";\n        color : ", ";                \n        text-align: center;\n        padding: 1ex;\n        height: 4ex;\n        width: 18ex;\n        margin: 1ex;\n        border-radius: 1ex;\n    "], styled_components_1.default(InterlocuteurBrut)(_a, function (props) { return props.fond; }, function (props) { return props.encre; }));
var MessageFixe = (_b = ["\n    flex: auto;\n    background: ", "\n    color: ", "\n    text-align: justify;\n    padding: 1ex;\n    min-height: 8ex;\n    min-width: 24ex;\n    max-width: 72ex;\n    margin: 1ex;\n    white-space: pre-wrap;\n"], _b.raw = ["\n    flex: auto;\n    background: ", "\n    color: ", "\n    text-align: justify;\n    padding: 1ex;\n    min-height: 8ex;\n    min-width: 24ex;\n    max-width: 72ex;\n    margin: 1ex;\n    white-space: pre-wrap;\n"], styled_components_1.default.div(_b, couleur_1.BLANC, couleur_1.NOIR));
var Cachet = (_c = ["\n    font-size: x-small;\n    color: ", ";\n    text-align: right;\n"], _c.raw = ["\n    font-size: x-small;\n    color: ", ";\n    text-align: right;\n"], styled_components_1.default.div(_c, couleur_1.GRIS_NOIR));
var ContainerMessageBrut = (function (_super) {
    __extends(ContainerMessageBrut, _super);
    function ContainerMessageBrut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContainerMessageBrut.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(Interlocuteur, { fond: this.props.message.emetteur.fond, encre: this.props.message.emetteur.encre, nom: this.props.message.emetteur.nom, role: Role.Emetteur }),
            React.createElement(MessageFixe, null,
                this.props.message.contenu,
                React.createElement(Cachet, null, this.props.message.cachet)),
            React.createElement(Interlocuteur, { fond: this.props.message.destinataire.fond, encre: this.props.message.destinataire.encre, nom: this.props.message.destinataire.nom, role: Role.Recepteur })));
    };
    return ContainerMessageBrut;
}(React.Component));
exports.ContainerMessageRecu = (_d = ["\n    flex: initial;\n    background: ", ";\n    box-shadow: -1ex 1ex 3ex -1ex ", ";\n    border-radius: 1ex; \n    margin: 1ex 1em 1ex 1ex;\n    align-self: flex-end;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n"], _d.raw = ["\n    flex: initial;\n    background: ", ";\n    box-shadow: -1ex 1ex 3ex -1ex ", ";\n    border-radius: 1ex; \n    margin: 1ex 1em 1ex 1ex;\n    align-self: flex-end;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n"], styled_components_1.default(ContainerMessageBrut)(_d, couleur_1.BLANC, function (props) { return props.message.emetteur.fond; }));
exports.ContainerMessageEmis = (_e = ["\n    flex: initial;\n    background: ", ";\n    box-shadow: 1ex 1ex 3ex -1ex ", ";\n    border-radius: 1ex;\n    margin: 1ex 1ex 1ex 1em;\n    align-self: flex-start;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n"], _e.raw = ["\n    flex: initial;\n    background: ", ";\n    box-shadow: 1ex 1ex 3ex -1ex ", ";\n    border-radius: 1ex;\n    margin: 1ex 1ex 1ex 1em;\n    align-self: flex-start;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n"], styled_components_1.default(ContainerMessageBrut)(_e, couleur_1.BLANC, couleur_1.OMBRE_EMISSION));
var styleTexteBrut = {
    alignSelf: "flex-end",
    flex: "auto",
    resize: "both",
    overflow: "auto",
    margin: "1ex",
    background: couleur_1.FOND_NOIR,
    color: couleur_1.BLANC,
    fontSize: "medium"
};
var EntreeMessageBrut = (function (_super) {
    __extends(EntreeMessageBrut, _super);
    function EntreeMessageBrut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntreeMessageBrut.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(Interlocuteur, { fond: this.props.sujet.fond, encre: this.props.sujet.encre, nom: this.props.sujet.nom, role: Role.Emetteur }),
            React.createElement(react_textarea_autosize_1.default, { placeholder: "Entrez le texte de votre message puis appuyez sur le bouton à droite indiquant le destinataire pour l'envoyer.", minRows: 3, cols: 72, style: styleTexteBrut }),
            React.createElement(Interlocuteur, { fond: this.props.destinataire.fond, encre: this.props.destinataire.encre, nom: this.props.destinataire.nom, role: Role.Recepteur })));
    };
    return EntreeMessageBrut;
}(React.Component));
exports.EntreeMessage = (_f = ["\n    flex: initial;\n    background: ", ";\n    box-shadow: 1ex 1ex 3ex -1ex ", ";\n    border-radius: 1ex;\n    margin: 1ex 1ex 1ex 1em;\n    align-self: flex-start;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n    max-width: calc(50vw);\n"], _f.raw = ["\n    flex: initial;\n    background: ", ";\n    box-shadow: 1ex 1ex 3ex -1ex ", ";\n    border-radius: 1ex;\n    margin: 1ex 1ex 1ex 1em;\n    align-self: flex-start;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n    max-width: calc(50vw);\n"], styled_components_1.default(EntreeMessageBrut)(_f, couleur_1.BLANC, couleur_1.OMBRE_EMISSION));
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=containersMessages.js.map