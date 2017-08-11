import * as React from "react";

export class ListeVoisins extends React.Component<
    { voisins: string[] }
    > {
    render() {
        let entreesListe: JSX.Element[] = [];
        this.props.voisins.forEach((v, i) => {
            entreesListe.push(<li>voisin {i} : {v}</li>);
        });
        let x ='reseau';
        return <ul className={"reseau"} style={{textAlign:"right"}}>
            {entreesListe}
        </ul>;
    }
}

export class Entree extends React.Component<
    {
        selection: { index: number; voisin: string }
    }
    > {
    render() {
        return <div>
            <label>sélection : {this.props.selection.index} - {this.props.selection.voisin} </label>
            <input type="text" placeholder="message à envoyer" />
        </div>;
    }
}

export class Communication extends React.Component<
    { voisins: string[] },
    { selection: { index: number; voisin: string } }
    >{
        constructor(props : { voisins: string[] }) {
            super(props);
            this.state = { selection : {index:0, voisin:"fictif"}}
        }
        render() {
            return <div><ListeVoisins voisins= {this.props.voisins} />
                <Entree selection= {this.state.selection} /></div>;
        }
}

export class Tchat extends React.Component<
    { voisins: string[] }
>{
    render() {
        return <Communication voisins={this.props.voisins} />;
    }
}

