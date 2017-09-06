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
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
var Salut = (function (_super) {
    __extends(Salut, _super);
    function Salut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Salut.prototype.render = function () {
        return React.createElement("h1", null,
            "Salutations de ",
            this.props.compilateur,
            " et de ",
            this.props.framework,
            "!");
    };
    return Salut;
}(React.Component));
exports.Salut = Salut;
//# sourceMappingURL=Salut.js.map