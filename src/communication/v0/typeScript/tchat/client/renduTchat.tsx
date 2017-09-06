import * as React from "react";
import * as ReactDOM from "react-dom";

import Scrollbars from "react-custom-scrollbars";


import styled from "styled-components";
import { injectGlobal } from "styled-components";

import {COULEUR_SEPARATION, FOND, BLANC} from "./couleur";

import { Corps } from "./corps";

injectGlobal`
    * { 
        margin: 0; 
        padding: 0; 
        box-sizing: border-box;
        font-family: Verdana, Geneva, sans serif;
    }
`;

ReactDOM.render(
    <Corps />,
    document.getElementById("conteneur")
);

