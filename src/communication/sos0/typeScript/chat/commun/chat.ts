import {FormatMessage, Message} from "../../bibliotheque/communication";

export enum TypeMessageChat {
    COM,
    TRANSIT,
    ERREUR_EMET,
    ERREUR_DEST,
    INTERDICTION
}

export interface FormatMessageChat extends FormatMessage {
    "emetteur": string,
    "destinataire": string,
    "type": TypeMessageChat,
    "contenu": string,
    "date": number
}

export type MessageChat = Message<FormatMessageChat>;

