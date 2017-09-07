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
var containerAdmin_1 = require("./containerAdmin");
var ContenuAdmin = /** @class */ (function (_super) {
    __extends(ContenuAdmin, _super);
    function ContenuAdmin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContenuAdmin.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(react_custom_scrollbars_1.default, { style: { width: "24vw", height: "100vh" } },
                React.createElement(containerAdmin_1.ContainerAdmin, { sujet: this.props.sujet, objets: this.props.objets, tous: this.props.tous, selection: this.props.selection, modifSelection: this.props.modifSelection }))));
    };
    return ContenuAdmin;
}(React.Component));
exports.Admin = (_a = ["\n    background: rgb(170, 170, 170);\n    position: fixed;\n    top: 0;\n    left: 0;\n"], _a.raw = ["\n    background: rgb(170, 170, 170);\n    position: fixed;\n    top: 0;\n    left: 0;\n"], styled_components_1.default(ContenuAdmin)(_a));
var _a;
//# sourceMappingURL=admin.js.map