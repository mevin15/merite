"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
//import { Salut } from "./Salut";
/*ReactDOM.render(
    <Salut compilateur="TypeScript" framework="React" />,
    document.getElementById("conteneur")
);*/
var tchat_1 = require("./tchat");
ReactDOM.render(React.createElement(tchat_1.Tchat, { voisins: ["coco", "titi"] }), document.getElementById("conteneur"));
//# sourceMappingURL=index.js.map