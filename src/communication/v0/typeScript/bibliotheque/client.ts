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
        this.lienServeur.send(msg.brut());
    };

    // Effet: enregistrement comme écouteur
    enregistrerTraitementAReception(traitement: (m: T) => void): void {
        this.lienServeur.addEventListener("message", function (e : MessageEvent) {
            let msg  = <T>JSON.parse(e.data);
            traitement(msg);
        });
    };
};



