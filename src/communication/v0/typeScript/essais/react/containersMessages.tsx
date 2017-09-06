import * as React from "react";

import styled from "styled-components";

import { Individu, Message } from "./typesInterface";

import { Couleur, BLANC, NOIR, GRIS_NOIR, OMBRE_RECEPTION, OMBRE_EMISSION, FOND_NOIR } from "./couleur";

import TextareaAutosize from 'react-textarea-autosize';

interface ProprietesMessage {
    // see https://github.com/Microsoft/TypeScript/issues/8588
    className?: string;
    message: Message;
}

enum Role { Emetteur, Recepteur };

interface ProprietesInterlocuteur {
    // see https://github.com/Microsoft/TypeScript/issues/8588
    className?: string;
    fond: Couleur;
    encre: Couleur;
    nom: string,
    role: Role
}

class InterlocuteurBrut extends React.Component<ProprietesInterlocuteur, {}> {
    render() {
        return (
            <div className={this.props.className}>
                {((this.props.role === Role.Emetteur) ? "De : " : "A : ") + this.props.nom}
            </div>
        );
    }
}

const Interlocuteur = styled(InterlocuteurBrut) `
        flex: none;
        background-color: ${(props: ProprietesInterlocuteur) => props.fond};
        color : ${(props: ProprietesInterlocuteur) => props.encre};                
        text-align: center;
        padding: 1ex;
        height: 4ex;
        width: 18ex;
        margin: 1ex;
        border-radius: 1ex;
    `;

const MessageFixe = styled.div`
    flex: auto;
    background: ${BLANC}
    color: ${NOIR}
    text-align: justify;
    padding: 1ex;
    min-height: 8ex;
    min-width: 24ex;
    max-width: 72ex;
    margin: 1ex;
    white-space: pre-wrap;
`;

const Cachet = styled.div`
    font-size: x-small;
    color: ${GRIS_NOIR};
    text-align: right;
`;



class ContainerMessageBrut extends React.Component<ProprietesMessage, {}> {
    render() {
        return (
            <div className={this.props.className}>
                    <Interlocuteur fond={this.props.message.emetteur.fond} 
                        encre={this.props.message.emetteur.encre} 
                        nom={this.props.message.emetteur.nom}  
                        role={Role.Emetteur} />

                    <MessageFixe>
                        {this.props.message.contenu}
                        <Cachet>{this.props.message.cachet}</Cachet>
                    </MessageFixe>

                    <Interlocuteur fond={this.props.message.destinataire.fond} 
                        encre={this.props.message.destinataire.encre} 
                        nom={this.props.message.destinataire.nom}  
                        role={Role.Recepteur} />
            </div>
        );
    }
}

export const ContainerMessageRecu = styled(ContainerMessageBrut) `
    flex: initial;
    background: ${BLANC};
    box-shadow: -1ex 1ex 3ex -1ex ${(props) => props.message.emetteur.fond};
    border-radius: 1ex; 
    margin: 1ex 1em 1ex 1ex;
    align-self: flex-end;
    /* Contrainte : marge plus grande que la largeur des ascenseurs. */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 80ex;
`;

export const ContainerMessageEmis = styled(ContainerMessageBrut) `
    flex: initial;
    background: ${BLANC};
    box-shadow: 1ex 1ex 3ex -1ex ${OMBRE_EMISSION};
    border-radius: 1ex;
    margin: 1ex 1ex 1ex 1em;
    align-self: flex-start;
    /* Contrainte : marge plus grande que la largeur des ascenseurs. */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 80ex;
`;

interface ProprietesEntreeMessage {
    // see https://github.com/Microsoft/TypeScript/issues/8588
    className?: string;
    sujet : Individu;
    destinataire: Individu;
}

const styleTexteBrut = {
    alignSelf: "flex-end",
    flex: "auto",
    resize: "both",
    overflow: "auto",
    margin: "1ex",
    background: FOND_NOIR,
    color: BLANC,
    fontSize: "medium"
};

class EntreeMessageBrut extends React.Component<ProprietesEntreeMessage, {}> {
    render() {
        return (
            <div className={this.props.className}>

                    <Interlocuteur fond={this.props.sujet.fond} 
                        encre={this.props.sujet.encre} 
                        nom={this.props.sujet.nom}  
                        role={Role.Emetteur} />

                    <TextareaAutosize
                        placeholder="Entrez le texte de votre message puis appuyez sur le bouton à droite indiquant le destinataire pour l'envoyer."
                        minRows={3} cols={72}
                        style={styleTexteBrut as any}>
                    </TextareaAutosize>

                    <Interlocuteur fond={this.props.destinataire.fond} 
                        encre={this.props.destinataire.encre} 
                        nom={this.props.destinataire.nom}  
                        role={Role.Recepteur} />

            </div>
        );
    }
}

export const EntreeMessage = styled(EntreeMessageBrut) `
    flex: initial;
    background: ${BLANC};
    box-shadow: 1ex 1ex 3ex -1ex ${OMBRE_EMISSION};
    border-radius: 1ex;
    margin: 1ex 1ex 1ex 1em;
    align-self: flex-start;
    /* Contrainte : marge plus grande que la largeur des ascenseurs. */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 80ex;
    max-width: calc(50vw);
`;