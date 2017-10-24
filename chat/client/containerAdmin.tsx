import * as React from "react";
import styled from "styled-components";
import { Couleur, FOND, CADRE, SELECTION, TEXTE_INV } from "./couleur";
import { Individu } from "./typesInterface";

interface ProprietesAdmin {
    // see https://github.com/Microsoft/TypeScript/issues/8588
    className?: string;
    sujet: Individu;
    objets: Individu[];
    tous: Individu;
    selection: Individu;
    modifSelection: (i: Individu) => void;
}

const SujetAdmin = styled.div`
    background: ${FOND};
    flex: auto;
    align-self: center;
    min-width: calc(24vw);

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

const SujetAdminContainer = styled.div`
    flex: auto;
    margin: 0;
    background: ${CADRE};
    height: 7ex;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;    
`;

const Separateur = styled.div`
        margin: 0 0 0 1em;
`;

const Retour = styled.div`
    flex: none;
    width: 4ex;
    height: 4ex;
`;

enum Role { Emetteur, Recepteur };

interface ProprietesPastille {
    // see https://github.com/Microsoft/TypeScript/issues/8588
    className?: string;
    fond: Couleur;
}

class PastilleBrute extends React.Component<ProprietesPastille, {}> {
    render() {
        return (
            <div className={this.props.className}>
            </div>
        );
    }
}

const Pastille = styled(PastilleBrute) `
        flex: none;
        width: 4ex;
        height: 4ex;
        border-radius: 100%;
        background-color: ${(props: ProprietesPastille) => props.fond};
    `;

const Pseudo = styled.div`
    flex: initial;
    background: ${CADRE};
    color: ${TEXTE_INV};
    text-align: center;
    padding: 1ex;
    height: 4ex;
    width: 10ex;
    font-size: x-large;
`;

interface ProprietesObjetAdmin {
    // see https://github.com/Microsoft/TypeScript/issues/8588
    className?: string;
    choix: boolean;
    onClick: () => void;
    fond : Couleur;
    nom : string;
}

class ObjetAdminBrut extends React.Component<ProprietesObjetAdmin, {}> {

    render() {
        return <button className={this.props.className} onClick={this.props.onClick}>
                    <Pastille fond={this.props.fond} />
                    <Pseudo>{this.props.nom}</Pseudo>
               </button>; 
    }
}

const ObjetAdmin = styled(ObjetAdminBrut) `
    flex: initial;
    background: ${CADRE};
    border-radius: 1ex;

    border-style: solid;
    border-width: ${props => props.choix ? "0.5ex" : "0"};
    border-color: ${SELECTION};

    padding: ${props => props.choix ? "0.5ex" : "1ex"};
    margin: 1em 0 1em 0;
    max-width: 20vw;
    width: 12em;
    min-width: 12em;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
`;

class ContenuContainerAdmin extends React.Component<ProprietesAdmin, {}> {
    render() {
        return (
            <div className={this.props.className}>
                <SujetAdmin>
                    <SujetAdminContainer>
                        <Separateur />
                        <Retour>
                            <img src="chevronGauche.svg" />
                        </Retour>
                        <Separateur />
                        <Separateur />
                        <Pastille fond={this.props.sujet.fond} />
                        <Pseudo>
                            {this.props.sujet.nom}
                        </Pseudo>
                    </SujetAdminContainer>
                </SujetAdmin>
                Choisissez un destinataire :
                {this.props.objets.map(i =>
                    <ObjetAdmin choix={this.props.selection.nom === i.nom} 
                        onClick={() => this.props.modifSelection(i)}
                        fond={i.fond}
                        nom={i.nom} />
                )}
                ou tous les destinataires :
                <ObjetAdmin choix={this.props.selection.nom === this.props.tous.nom} 
                    onClick={() => this.props.modifSelection(this.props.tous)}
                    fond={this.props.tous.fond}
                    nom={this.props.tous.nom}
                    />
            </div>
        );
    }
}

export const ContainerAdmin = styled(ContenuContainerAdmin) `
    background: ${FOND};
    position: absolute;
    top: 0;
    left: 0;
    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le dépassement */
    min-width: calc(24vw);
    min-height: calc(100vh);
    /* occupe au moins la place du container */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

