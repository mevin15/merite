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
var react_custom_scrollbars_1 = require("react-custom-scrollbars");
var containerAction_1 = require("./containerAction");
var couleur_1 = require("./couleur");
var ContenuAction = (function (_super) {
    __extends(ContenuAction, _super);
    function ContenuAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContenuAction.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(react_custom_scrollbars_1.default, { style: { width: "74vw", height: "100vh" } },
                React.createElement(containerAction_1.ContainerAction, { sujet: this.props.sujet, messages: this.props.messages, selection: this.props.selection }))));
    };
    return ContenuAction;
}(React.Component));
exports.Action = (_a = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 1vw;\n"], _a.raw = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 1vw;\n"], styled_components_1.default(ContenuAction)(_a, couleur_1.FOND));
var _a;
//# sourceMappingURL=action.js.map