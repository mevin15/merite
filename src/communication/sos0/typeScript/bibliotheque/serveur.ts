// Un module commençant par un import
import http = require('http');
import websocket = require('websocket');

import {FormatMessage, Message} from "./communication";

export class ServeurLienWebSocket<T extends FormatMessage> {
    private port: number;
    private total: number;
    private lienClients: websocket.connection[];
    private traitement: (m: Message<T>) => void;

    constructor(port: number, traitement: (s: ServeurLienWebSocket<T>, m: Message<T>) => void) {
        this.port = port;
        this.total = 0;
        this.lienClients = [];
        this.traitement = (m) => traitement(this, m);
    }

    demarrer(): void {
        let serveurHTTP: http.Server = http.createServer(function (requete, reponse) { });
        let celuiCi = this;
        let p = this.port;
        serveurHTTP.listen(p, function () {
            console.log((new Date()) + " Le serveur écoute le port " + p + ".");
        });
        let serveurWS = new websocket.server({
            httpServer: serveurHTTP
        });
        serveurWS.on('request', function (r: websocket.request) {
            let connexion: websocket.connection = r.accept('echo-protocol', r.origin);
            let id = celuiCi.total++;
            celuiCi.lienClients[id] = connexion;
            console.log((new Date()) + " Connexion acceptée [" + id + "]");

            // Applique le traitement après conversion au bon format de chaque message
            connexion.on('message', function (message: websocket.IMessage) {
                let msg: T = JSON.parse(message.utf8Data);
                celuiCi.traitement(new Message<T>(msg));
            });
            // Supprime l'utilisateur en cas de fermeture
            connexion.on('close', (raison: number, description: string) => {
                delete celuiCi.lienClients[id];
                console.log((new Date()) + " Client " + id + " à l'adresse " + connexion.remoteAddress + " déconnecté.");
            });
        });

    }

    diffuser(m: Message<T>) {
        for (var i in this.lienClients) {
            console.log("Diffusion de : " + m.enSerie());
            this.lienClients[i].sendUTF(m.enSerie);
        }
    }
}

