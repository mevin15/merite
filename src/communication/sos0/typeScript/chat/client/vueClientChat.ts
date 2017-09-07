import {FormatMessage, Message} from "../../bibliotheque/communication";
import {donneeDynamique, poster} from "../../bibliotheque/vueClient";
import {CanalClient} from "../../bibliotheque/client";
import { TypeMessageChat, FormatMessageChat, MessageChat} from '../commun/chat';


function adresseServeur(): string {
    return donneeDynamique(document, 'adresseServeur');
}

function emetteur(): string {
    return donneeDynamique(document, 'emetteur');
}

function destinataire(i: number): string {
    return donneeDynamique(document, 'destinataire' + i);
}

function creerMessage(texte: string, numDestinataire: number): MessageChat {
    return new Message<FormatMessageChat>({
        "emetteur": emetteur(),
        "destinataire": destinataire(numDestinataire),
        "type": TypeMessageChat.COM,
        "contenu": texte,
        "date": Date.now()
    });
}

// A initialiser
var canal : CanalClient<FormatMessageChat> ; 

// A exécuter après chargement de la page
function initialisation(): void {

    canal = new CanalClient<FormatMessageChat>(adresseServeur());
    
    canal.enregistrerTraitementAReception((m: MessageChat) => {
        let msg = m.enJSON();
        let d = new Date(msg.date); // TODO à améliorer
        let ds = d.toLocaleTimeString();
        poster(document, 'logChats', msg.emetteur + " - " + ds + " : " + msg.contenu);
    });

    console.log("Initialisation du canal côté client en liaison avec le serveur : " + adresseServeur());
}


function envoyerMessage(texte: string, numDestinataire: number) {
    console.log(texte);
    canal.envoyerMessage(creerMessage(texte, numDestinataire))
}



