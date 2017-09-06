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
var ListeVoisins = (function (_super) {
    __extends(ListeVoisins, _super);
    function ListeVoisins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListeVoisins.prototype.render = function () {
        var entreesListe = [];
        this.props.voisins.forEach(function (v, i) {
            entreesListe.push(React.createElement("li", null,
                "voisin ",
                i,
                " : ",
                v));
        });
        var x = 'reseau';
        return React.createElement("ul", { className: "reseau", style: { textAlign: "right" } }, entreesListe);
    };
    return ListeVoisins;
}(React.Component));
exports.ListeVoisins = ListeVoisins;
var Entree = (function (_super) {
    __extends(Entree, _super);
    function Entree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Entree.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("label", null,
                "s\u00E9lection : ",
                this.props.selection.index,
                " - ",
                this.props.selection.voisin,
                " "),
            React.createElement("input", { type: "text", placeholder: "message à envoyer !!!" }));
    };
    return Entree;
}(React.Component));
exports.Entree = Entree;
var Communication = (function (_super) {
    __extends(Communication, _super);
    function Communication(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { selection: { index: 0, voisin: "fictif" } };
        return _this;
    }
    Communication.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(ListeVoisins, { voisins: this.props.voisins }),
            React.createElement(Entree, { selection: this.state.selection }));
    };
    return Communication;
}(React.Component));
exports.Communication = Communication;
var Tchat = (function (_super) {
    __extends(Tchat, _super);
    function Tchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tchat.prototype.render = function () {
        return React.createElement(Communication, { voisins: this.props.voisins });
    };
    return Tchat;
}(React.Component));
exports.Tchat = Tchat;
//# sourceMappingURL=tchat.js.map