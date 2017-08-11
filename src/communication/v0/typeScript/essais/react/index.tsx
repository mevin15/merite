import * as React from "react";
import * as ReactDOM from "react-dom";

//import { Salut } from "./Salut";

/*ReactDOM.render(
    <Salut compilateur="TypeScript" framework="React" />,
    document.getElementById("conteneur")
);*/

import { Tchat } from "./tchat";

ReactDOM.render(
    <Tchat voisins={["coco", "titi"]}/>,
    document.getElementById("conteneur")
);