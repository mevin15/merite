import * as React from "react";
import { Unite } from "../../bibliotheque/types"

export interface ProprietesSalut { compilateur: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Salut extends React.Component<ProprietesSalut> {
    render() {
        return <h1>Salutations de {this.props.compilateur} et de {this.props.framework}!</h1>;
    }
}