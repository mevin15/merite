import {
    FormatMessage, Message,
    FormatConfigurationInitiale, Configuration,
    FormatErreurRedhibitoire, ErreurRedhibitoire,
    Identifiant, FormatSommet, Sommet, AssemblageReseauEnAnneau,
    Noeud, creerNoeud,
    TableNoeuds
} from "../../bibliotheque/communication";

import { Unite } from "../../bibliotheque/types";
import { dateFr } from "../../bibliotheque/outils";

export const hote: string = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
export const port1 = 3001; // port de la essource 1 (serveur d'applications)
export const port2: number = 1111; // port de la ressouce 2 (serveur de connexions)


export enum TypeMessageTchat {
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

export interface FormatMessageTchat extends FormatMessage {
    "emetteur": string,
    "destinataire": string,
    "type": TypeMessageTchat,
    "contenu": string,
    "date": Date
}

export class MessageTchat extends Message<FormatMessageTchat> {
    net(): string {
        let msg = this.enJSON();
        return JSON.stringify({
            type: TypeMessageTchat[msg.type],
            date: dateFr(msg.date),
            de: msg.emetteur,
            à: msg.destinataire,
            contenu: msg.contenu
        });
    }
}

export interface FormatSommetTchat extends FormatSommet {
    "pseudo": string,
}

export function creerMessageErreurConnexion(emetteur: string, messageErreur: string): MessageTchat {
    return new MessageTchat({
        "emetteur": emetteur,
        "destinataire": emetteur,
        "type": TypeMessageTchat.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": new Date()
    });
}

export function creerMessageCommunication(emetteur: string, destinataire: string, texte: string): MessageTchat {
    return new MessageTchat({
        "emetteur": emetteur,
        "destinataire": destinataire,
        "type": TypeMessageTchat.COM,
        "contenu": texte,
        "date": new Date()
    });
}

export function creerMessageRetourErreur(original: MessageTchat, codeErreur: TypeMessageTchat, messageErreur: string): MessageTchat {
    return new MessageTchat({
        "emetteur": original.enJSON().emetteur,
        "destinataire": original.enJSON().destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.enJSON().date
    });
}

export function creerMessageTransit(msg: MessageTchat): MessageTchat {
    return new MessageTchat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageTchat.TRANSIT,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}

export function creerMessageAR(msg: MessageTchat): MessageTchat {
    return new MessageTchat({
        "emetteur": msg.enJSON().emetteur,
        "destinataire": msg.enJSON().destinataire,
        "type": TypeMessageTchat.AR,
        "contenu": msg.enJSON().contenu,
        "date": msg.enJSON().date
    });
}

/*
Exemple de description d'une configuration
- noeud de centre : {"id":"id-1","pseudo":"toto"}
- noeud de voisins : {"id-2":{"id":"id-2","pseudo":"coco"},"id-0":{"id":"id-0","pseudo":"titi"}}

*/

export interface FormatConfigurationTchat extends FormatConfigurationInitiale {
    "centre": FormatSommetTchat,
    "voisins": { [cle: string]: FormatSommetTchat },
    "date": Date
}

export class ConfigurationTchat extends Configuration<FormatConfigurationTchat> {
    net(): string {
        let config = this.enJSON();
        return JSON.stringify({
            centre: config.centre,
            voisins: config.voisins,
            date: dateFr(config.date)
        });
    }
}

export function creerConfiguration(n: Noeud<FormatSommetTchat>, date: Date): ConfigurationTchat {
    return new ConfigurationTchat({
        "configurationInitiale": Unite.un,
        "centre": n.centre().enJSON(),
        voisins: n.voisinsEnJSON(),
        "date": date
    });
}

export function creerNoeudDeConfiguration(c: ConfigurationTchat): Noeud<FormatSommetTchat> {
    let centre: FormatSommetTchat = c.enJSON().centre;
    let voisins = c.enJSON().voisins;
    return creerNoeud<FormatSommetTchat>(centre, voisins, creerSommetTchat);
}


export interface FormatErreurTchat extends FormatErreurRedhibitoire {
    "messageErreur": string,
    "date": Date
}

export class ErreurChat extends ErreurRedhibitoire<FormatErreurTchat> {
    net(): string {
        let erreur = this.enJSON();
        return JSON.stringify({
            messageErreur: erreur.messageErreur,
            date: dateFr(erreur.date)
        });
    }
}

export function creerMessageErreur(msg: string, date: Date): ErreurChat {
    return new ErreurChat({
        "erreurRedhibitoire": Unite.un,
        "messageErreur": msg,
        "date": date
    });
}



export class SommetChat extends Sommet<FormatSommetTchat> {
    net(): string {
        let msg = this.enJSON();
        return JSON.stringify({
            nom: msg.pseudo + "(" + msg.id + ")"
        });
    }
}

export function creerSommetTchat(s: FormatSommetTchat): SommetChat {
    return new SommetChat(s);
}

export function creerAnneauTchat(noms: string[]): TableNoeuds<FormatSommetTchat> {
    let assembleur = new AssemblageReseauEnAnneau<FormatSommetTchat>(noms.length);
    noms.forEach((nom: string, i: number, tab: string[]) => {
        let s = new SommetChat({ id: "id-" + i, pseudo: tab[i] });
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
