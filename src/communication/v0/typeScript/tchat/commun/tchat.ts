import {
    FormatMessage, Message,
    FormatConfigurationInitiale, Configuration,
    FormatErreurRedhibitoire, ErreurRedhibitoire,
    Sommet, ReseauMutable, AssemblageReseau,
    NoeudIN, NoeudEX, NoeudImmutable, FormatNoeudEX, FormatNoeudIN, EtiquetteNoeud,
    creerAssemblageReseauEnAnneau
} from "../../bibliotheque/communication";

import {
    Unite, Mutable,
    FormatDateFrEX, creerDate, creerDateMaintenant,
    creerTableImmutable, FormatTableEX,
    FormatIdentifiableIN, FormatIdentifiableEX,
    Identification, creerIdentificationParCompteur, Identifiant
} from "../../bibliotheque/types";
import { jamais } from "../../bibliotheque/outils";

export const hote: string = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
export const port1 = 3000; // port de la essource 1 (serveur d'applications)
export const port2: number = 1110; // port de la ressouce 2 (serveur de connexions)

export interface FormatSommetTchatEX extends FormatIdentifiableEX<'sommet'> {
    readonly "pseudo": string,
}

export type EtiquetteSommetTchat = 'ID' | 'nom';

// La structure JSON décrivant le sommet est en lecture seulement. 
export class SommetTchat
    extends Sommet<FormatSommetTchatEX, FormatSommetTchatEX, EtiquetteSommetTchat> {

    constructor(etat: FormatSommetTchatEX) {
        super((x) => x, etat);
    }

    net(e: EtiquetteSommetTchat): string {
        let s = this.ex();
        switch (e) {
            case 'nom': return s.pseudo;
            case 'ID': return s.ID.val;
        }
        return jamais(e);
    }
    representation(): string {
        return this.net('nom') + " (" + this.net('ID') + ")";
    }
}

export function creerSommetTchat(s: FormatSommetTchatEX) {
    return new SommetTchat(s);
}

export type FormatNoeudTchatIN = FormatNoeudIN<FormatSommetTchatEX>;

export class NoeudTchatIN extends NoeudIN<FormatSommetTchatEX>{

    net(e: EtiquetteNoeud): string {
        let s = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(s.centre).representation();
            case 'voisins':
                return creerTableImmutable(s.voisins).representation();
        }
        return jamais(e);
    }
    representation(): string {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    }
}

export function creerNoeudTchatIN(n: FormatNoeudTchatIN) {
    return new NoeudTchatIN(n);
}


export type FormatNoeudTchatEX = FormatNoeudEX<FormatSommetTchatEX>;
export type NoeudTchatImmutable = NoeudImmutable<FormatSommetTchatEX>;

export class NoeudTchatEX extends NoeudEX<FormatSommetTchatEX>{

    net(e: EtiquetteNoeud): string {
        let s = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(s.centre).representation();
            case 'voisins':
                return creerTableImmutable(s.voisins).representation();
        }
        return jamais(e);
    }
    representation(): string {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    }
}

export function creerNoeudTchatEX(n: FormatNoeudTchatEX) : NoeudTchatImmutable{
    return new NoeudTchatEX(n);
}


export type ReseauTchat = ReseauMutable<FormatSommetTchatEX>;

export type AssemblageReseauTchat
    = AssemblageReseau<FormatSommetTchatEX>;

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

// Format en lecture seulement
export interface FormatMessageTchatEX extends FormatMessage {
    readonly "ID_emetteur": Identifiant<'sommet'>,
    readonly "ID_destinataire": Identifiant<'sommet'>,
    readonly "type": TypeMessageTchat,
    readonly "contenu": string,
    readonly "date": FormatDateFrEX
}

export type EtiquetteMessageTchat = 'type' | 'date' | 'ID_de' | 'ID_à' | 'contenu';

// Structure immutable
export class MessageTchat extends Message<FormatMessageTchatEX, FormatMessageTchatEX, EtiquetteMessageTchat> {

    constructor(etat: FormatMessageTchatEX) {
        super((x) => x, etat);
    }

    net(e: EtiquetteMessageTchat): string {
        let msg = this.ex();
        switch (e) {
            case 'type': return TypeMessageTchat[msg.type];
            case 'date': return creerDate(msg.date).representation();
            case 'ID_de': return msg.ID_emetteur.val;
            case 'ID_à': return msg.ID_destinataire.val;
            case 'contenu': return msg.contenu;
        }
        return jamais(e);
    }

    representation(): string {
        let dem = this.net('ID_de');
        let am = this.net('ID_à');
        let typem = this.net('type');
        let datem = this.net('date');
        let cm = this.net('contenu');
        return datem + ", de " + dem + " à " + am + " (" + typem + ") - " + cm;
    }

    transit(): MessageTchat {
        let msg = this.ex();
        return new MessageTchat({
            "ID_emetteur": msg.ID_emetteur,
            "ID_destinataire": msg.ID_destinataire,
            "type": TypeMessageTchat.TRANSIT,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }

    avecAccuseReception(): MessageTchat {
        let msg = this.ex();
        return new MessageTchat({
            "ID_emetteur": msg.ID_emetteur,
            "ID_destinataire": msg.ID_destinataire,
            "type": TypeMessageTchat.AR,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }

}

export function creerMessageErreurConnexion(idEmetteur: Identifiant<'sommet'>, messageErreur: string): MessageTchat {
    return new MessageTchat({
        "ID_emetteur": idEmetteur,
        "ID_destinataire": idEmetteur,
        "type": TypeMessageTchat.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": creerDateMaintenant().ex()
    });
}

export function creerMessageCommunication(idEmetteur: Identifiant<'sommet'>, idDestinataire: Identifiant<'sommet'>, texte: string): MessageTchat {
    return new MessageTchat({
        "ID_emetteur": idEmetteur,
        "ID_destinataire": idDestinataire,
        "type": TypeMessageTchat.COM,
        "contenu": texte,
        "date": creerDateMaintenant().ex()
    });
}

export function creerMessageRetourErreur(original: MessageTchat, codeErreur: TypeMessageTchat, messageErreur: string): MessageTchat {
    return new MessageTchat({
        "ID_emetteur": original.ex().ID_emetteur,
        "ID_destinataire": original.ex().ID_destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.ex().date
    });
}


/*
Exemple de description d'une configuration
- noeud de centre : {"id":"id-1","pseudo":"toto"}
- noeud de voisins : {"id-2":{"id":"id-2","pseudo":"coco"},"id-0":{"id":"id-0","pseudo":"titi"}}

*/


/*
inutile :
export interface FormatConfigurationTchatIN
    extends FormatConfigurationInitiale {
    readonly "centre": FormatSommetTchatEX,
    readonly "voisins": { [cle: string]: FormatSommetTchatEX, mutable: undefined },
    readonly "date": Date
}
*/
export interface FormatConfigurationTchatEX extends FormatConfigurationInitiale {
    readonly "centre": FormatSommetTchatEX,
    readonly "voisins": FormatTableEX<FormatSommetTchatEX>,
    readonly "date": FormatDateFrEX
}


export type EtiquetteConfigurationTchat = 'centre' | 'voisins' | 'date';

export class ConfigurationTchat
    extends Configuration<
    FormatConfigurationTchatEX,
    FormatConfigurationTchatEX,
    EtiquetteConfigurationTchat> {

    constructor(c: FormatConfigurationTchatEX) {
        super((x) => x, c);
    }

    net(e: EtiquetteConfigurationTchat): string {
        let config = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(config.centre).representation();
            case 'voisins': return creerTableImmutable(config.voisins).representation();
            case 'date': return creerDate(config.date).representation();
        }
        return jamais(e);
    }
    representation(): string {
        let cc = this.net('centre');
        let vc = this.net('voisins');
        let dc = this.net('date');
        return "(centre : " + cc + " ; voisins : " + vc + ") créée " + dc;
    }
}

export function creerConfigurationTchat(c: FormatConfigurationTchatEX) {
    return new ConfigurationTchat(c);
}

export function composerConfigurationTchat(
    n: FormatNoeudTchatEX, date: FormatDateFrEX)
    : ConfigurationTchat {
    return new ConfigurationTchat({
        "configurationInitiale": Unite.ZERO,
        "centre": n.centre,
        "voisins": n.voisins,
        "date": date
    });
}

export function decomposerConfiguration(c: ConfigurationTchat)
    : FormatNoeudTchatEX {
    let centre: FormatSommetTchatEX = c.ex().centre;
    let voisins = c.ex().voisins;
    return { "centre": centre, "voisins": voisins };
}


export interface FormatErreurTchatEX extends FormatErreurRedhibitoire {
    readonly "messageErreur": string,
    readonly "date": FormatDateFrEX
}

export type EtiquetteErreurTchat = 'messageErreur' | 'date';

export class ErreurTchat
    extends ErreurRedhibitoire<FormatErreurTchatEX, FormatErreurTchatEX, EtiquetteErreurTchat> {

    constructor(err: FormatErreurTchatEX) {
        super((x) => x, err);
    }

    net(e: EtiquetteErreurTchat): string {
        let erreur = this.ex();
        switch (e) {
            case 'messageErreur': return erreur.messageErreur;
            case 'date': return creerDate(erreur.date).representation();
        }
        return jamais(e);
    }
    representation(): string {
        return "[" + this.net('date') + " : " + this.net('messageErreur') + "]";
    }
}

export function creerErreurTchat(err: FormatErreurTchatEX): ErreurTchat {
    return new ErreurTchat(err);
}

export function composerErreurTchat(msg: string, date: FormatDateFrEX): ErreurTchat {
    return new ErreurTchat({
        "erreurRedhibitoire": Unite.ZERO,
        "messageErreur": msg,
        "date": date
    });
}

export function creerAnneauTchat(noms: string[]): ReseauTchat {
    let assembleur: AssemblageReseauTchat
        = creerAssemblageReseauEnAnneau(noms.length, creerNoeudTchatIN);
    let identification: Identification<'sommet'>
        = creerIdentificationParCompteur("S-");
    noms.forEach((nom: string, i: number, tab: string[]) => {
        let s: FormatSommetTchatEX
            = { ID: identification.identifier('sommet'), pseudo: tab[i]};
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
