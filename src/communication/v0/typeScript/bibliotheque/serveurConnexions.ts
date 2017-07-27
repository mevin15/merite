// Serveur établissant les connexions par Web Socket
// - Configuration à la connexion
// - Communication entre clients
// - Déconnexion

// Un module commençant par un import
import * as http from 'http';
import * as websocket from 'websocket';
import * as url from 'url';

import { dateFrLog } from "./outils";
import {
    FormatMessage, Message,
    FormatConfigurationInitiale, Configuration,
    FormatErreurRedhibitoire, ErreurRedhibitoire,
    FormatSommet
} from "./communication";

export function adresse(u: url.Url): string {
    return u.href; // TODO incomplet avec 127.0.0.1 réolu en merite graĉe à /etc/hosts
}

export class LienWebSocket<E extends FormatErreurRedhibitoire, C extends FormatConfigurationInitiale, T extends FormatMessage> {

    private _connexion: websocket.connection;
    private _adresseIPClient: string;
    private _config: Configuration<C>;

    constructor(requete: websocket.request) {
        this._connexion = requete.accept('echo-protocol', requete.origin);
        this._adresseIPClient = requete.remoteAddress
        /* TODO
        console.log("url socket : " + r.resource);
        console.log("url socket : " + r.httpRequest.url);
        console.log("- auth: " + this._url.auth);
        console.log("- hostname: " + this._url.hostname);
        console.log("- port: " + this._url.port);
        console.log("- protocol : " + this._url.protocol);
        console.log("- search: " + this._url.search);
        console.log("- href: " + this._url.href);
        console.log("- path: " + this._url.path);
        console.log("- pathname: " + this._url.pathname);
        */
    }
    adresseClient(): string {
        return this._adresseIPClient;
    }
    enregistrerTraitementMessages(traitementMessages: (l: LienWebSocket<E, C, T>, m: T) => void): void {
        let ceLien = this;
        this._connexion.on('message', (message: websocket.IMessage) => {
            let msg: T = JSON.parse(message.utf8Data.toString());
            traitementMessages(ceLien, msg);
        });
        console.log("- Enregistrement du traitement des messages.")
    }
    enregistrerTraitementFermeture(
        traitementFermeture: (l: LienWebSocket<E, C, T>, r: number, desc: string) => void): void {
        let ceLien = this;
        this._connexion.on('close', (raison: number, description: string) => {
            traitementFermeture(ceLien, raison, description);
        });
        console.log("- Enregistrement du traitement de la fermeture de la connexion par Web socket.")
    }

    envoyerAuClientDestinataire(m: Message<T>) {
        this._connexion.sendUTF(m.brut());
    }

    envoyerConfiguration(c: Configuration<C>) {
        this._connexion.sendUTF(c.brut());
        this._config = c;
    }

    estConfigure(): boolean {
        return this._config !== undefined;
    }

    configuration(): Configuration<C> {
        return this._config;
    }

    envoyerMessageErreur(e: ErreurRedhibitoire<E>) {
        this._connexion.sendUTF(e.brut());
    }
}

export class ServeurLiensWebSocket<E extends FormatErreurRedhibitoire, C extends FormatConfigurationInitiale, T extends FormatMessage> {
    private port: number;
    private hote: string;
    private traiterMessages: (l: LienWebSocket<E, C, T>, m: T) => void;
    private traiterConnexion: (l: LienWebSocket<E, C, T>) => boolean;
    private traiterFermeture: (l: LienWebSocket<E, C, T>, r: number, desc: string) => void;

    constructor(port: number, hote: string) {
        this.port = port;
        this.hote = hote;
    }

    enregistrerTraitementConnexion(traitementConnexion: (l: LienWebSocket<E, C, T>) => boolean): void {
        this.traiterConnexion = traitementConnexion;
    }

    enregistrerTraitementFermeture(traitementFermeture: (l: LienWebSocket<E, C, T>, r: number, desc: string) => void): void {
        this.traiterFermeture = traitementFermeture;
    }


    enregistrerTraitementMessages(traitementMessages: (l: LienWebSocket<E, C, T>, m: T) => void): void {
        this.traiterMessages = traitementMessages;
    }

    demarrer(): void {
        let serveurHTTP: http.Server = http.createServer(function (requete, reponse) { });
        let ceServeur = this;
        let p = this.port;
        let h = this.hote;
        serveurHTTP.listen(p, h, function () {
            console.log("* " + dateFrLog(new Date()) + " - Le serveur écoute le port " + p + " de l'hôte " + h + ".");
        });
        let serveurWS = new websocket.server({
            httpServer: serveurHTTP
        });
        serveurWS.on('request', function (r: websocket.request) {
            let l = new LienWebSocket<E, C, T>(r);

            let estConnecte = ceServeur.traiterConnexion(l);
            if (!estConnecte) {
                return;
            }
            // Enregistre le traitement des messages
            l.enregistrerTraitementMessages(ceServeur.traiterMessages);

            // Enregistre le traitement de la fermeture de la connexion
            l.enregistrerTraitementFermeture(ceServeur.traiterFermeture);
        });

    }

}

