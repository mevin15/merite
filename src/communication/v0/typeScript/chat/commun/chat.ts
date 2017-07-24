import { FormatMessage, Message, Identifiant, FormatSommet, Sommet, AssemblageReseauEnAnneau, TableNoeuds } from "../../bibliotheque/communication";

export enum TypeMessageChat {
    COM,
    TRANSIT,
    AR,
    ERREUR_CONNEXION,
    ERREUR_EMET,
    ERREUR_DEST,
    ERREUR_TYPE,
    INTERDICTION
}
/*
export function chaineTypeMessageChat(x : TypeMessageChat) : string  {
    return TypeMessageChat[x];
}
*/

export interface FormatMessageChat extends FormatMessage {
    "emetteur": string,
    "destinataire": string,
    "type": TypeMessageChat,
    "contenu": string,
    "date": Date
}

export class MessageChat extends Message<FormatMessageChat> {
    net(): string {
        let msg = this.enJSON();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return JSON.stringify({
            type: TypeMessageChat[msg.type],
            date: (new Date(msg.date)).toLocaleString("fr-FR", options), // Attention : passage pr Date nécessaire (sinon erreur après transmission)
            de: msg.emetteur,
            à: msg.destinataire,
            contenu: msg.contenu
        });
    }
}

export function creerMessageErreurConnexion(emetteur: string, messageErreur: string): MessageChat {
    return new MessageChat({
        "emetteur": emetteur,
        "destinataire": emetteur,
        "type": TypeMessageChat.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": new Date()
    });
}

export function creerMessageCommunication(emetteur: string, destinataire: string, texte: string): MessageChat {
    return new MessageChat({
        "emetteur": emetteur,
        "destinataire": destinataire,
        "type": TypeMessageChat.COM,
        "contenu": texte,
        "date": new Date()
    });
}

export function creerMessageRetourErreur(original : MessageChat, codeErreur : TypeMessageChat, messageErreur: string): MessageChat {
    return new MessageChat({
        "emetteur": original.enJSON().emetteur,
        "destinataire": original.enJSON().destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.enJSON().date
    });
}

export function creerMessageTransit(msg: MessageChat): MessageChat {
    return new MessageChat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageChat.TRANSIT,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}

export function creerMessageAR(msg: MessageChat): MessageChat {
    return new MessageChat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageChat.AR,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}



export interface FormatSommetChat extends FormatSommet {
    "pseudo": string,
}

export class SommetChat extends Sommet<FormatSommetChat> {
    net(): string {
        let msg = this.enJSON();
        return JSON.stringify({
            nom: msg.pseudo + "(" + msg.id + ")"
        });
    }
}

export function fabriqueSommetChat(s : FormatSommetChat) : SommetChat {
    return new SommetChat(s);
}

export function creerAnneauChat(noms : string[]) : TableNoeuds<FormatSommetChat>{
    let assembleur = new AssemblageReseauEnAnneau<FormatSommetChat>(noms.length);
    noms.forEach((nom : string, i : number, tab : string[]) => {
        let s = new SommetChat({id : "id-" + i, pseudo : tab[i] });
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
