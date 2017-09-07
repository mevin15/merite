import { FormatMessage, Message } from "./communication";

export class CanalClient<T extends FormatMessage> {
    adresse: string;
    lienServeur: WebSocket;
    constructor(adresse : string) {
        this.adresse = adresse;
        this.lienServeur = new WebSocket('ws://' + this.adresse, 'echo-protocol');
    };

    // Effet : send(String)
    envoyerMessage(msg: Message<T>): void {
        this.lienServeur.send(msg.enSerie());
    };

    // Effet: enregistrement comme écouteur
    enregistrerTraitementAReception(traitement: (m: Message<T>) => void): void {
        this.lienServeur.addEventListener("message", function (e) {
            var msg = JSON.parse(e.data);
            traitement(new Message(msg));
        });
    };
};

export interface FormatVoisin { }

export class Noeud<V extends FormatVoisin> {
    _listeVoisins: V[];
    constructor(listeVoisins: V[]) {
        this._listeVoisins = listeVoisins.slice(0);
    };

    nombreVoisins(): number {
        return this._listeVoisins.length;
    };

    obtenirVoisin(i: number): V {
        return this._listeVoisins[i];
    };

};
