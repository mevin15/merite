"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var styled_components_1 = require("styled-components");
var styled_components_2 = require("styled-components");
var couleur_1 = require("./couleur");
var admin_1 = require("./admin");
var action_1 = require("./action");
(_a = ["\n    * { \n        margin: 0; \n        padding: 0; \n        box-sizing: border-box;\n        font-family: Verdana, Geneva, sans serif;\n    }\n"], _a.raw = ["\n    * { \n        margin: 0; \n        padding: 0; \n        box-sizing: border-box;\n        font-family: Verdana, Geneva, sans serif;\n    }\n"], styled_components_2.injectGlobal(_a));
var Corps = (_b = ["\n    width: 100vw;\n    height: 100vh;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: ", "\n"], _b.raw = ["\n    width: 100vw;\n    height: 100vh;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: ", "\n"], styled_components_1.default.div(_b, couleur_1.FOND));
var ApresAdmin = (_c = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], _c.raw = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], styled_components_1.default.div(_c, couleur_1.COULEUR_SEPARATION, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC));
var ApresAction = (_d = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], _d.raw = ["\n    background: ", ";\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: ", ";\n    border-right-color: ", ";\n    border-bottom-color: ", ";\n    border-left-color: ", ";\n"], styled_components_1.default.div(_d, couleur_1.COULEUR_SEPARATION, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC, couleur_1.BLANC));
ReactDOM.render(React.createElement(Corps, null,
    React.createElement(admin_1.Admin, null),
    React.createElement(ApresAdmin, null),
    React.createElement(action_1.Action, null),
    React.createElement(ApresAction, null)), document.getElementById("conteneur"));
var _a, _b, _c, _d;
//# sourceMappingURL=indexTchat.3.ok.js.map