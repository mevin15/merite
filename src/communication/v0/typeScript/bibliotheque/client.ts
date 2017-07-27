import {
    FormatMessage, Message,
    FormatErreurRedhibitoire, ErreurRedhibitoire,
    FormatConfigurationInitiale, Configuration
} from "./communication";

export class CanalClient<E extends FormatErreurRedhibitoire, C extends FormatConfigurationInitiale, T extends FormatMessage> {
    adresse: string;
    lienServeur: WebSocket;
    constructor(adresse: string) {
        this.adresse = adresse;
        this.lienServeur = new WebSocket('ws://' + this.adresse, 'echo-protocol');
    };

    // Effet : send(String)
    envoyerMessage(msg: Message<T>): void {
        this.lienServeur.send(msg.brut());
    };

    // Effet: enregistrement comme écouteur
    enregistrerTraitementMessageRecu(traitement: (m: T) => void): void {
        this.lienServeur.addEventListener("message", function (e: MessageEvent) {
            let msg = JSON.parse(e.data);
            if(msg.configurationInitiale !== undefined){
                return;
            }
            if(msg.erreurRedhibitoire !== undefined){
                return;
            }
            traitement(<T>msg);
        });
    };
    // Effet: enregistrement comme écouteur
    enregistrerTraitementConfigurationRecue(traitement: (c: C) => void): void {
        this.lienServeur.addEventListener("message", function (e: MessageEvent) {
            let contenuJSON = JSON.parse(e.data); 
            if(contenuJSON.configurationInitiale === undefined){
                return;
            }
            traitement(<C>contenuJSON);
        });
    };
    // Effet: enregistrement comme écouteur
    enregistrerTraitementErreurRecue(traitement: (e: E) => void): void {
        this.lienServeur.addEventListener("message", function (e: MessageEvent) {
            let contenuJSON = JSON.parse(e.data); 
            if(contenuJSON.erreurRedhibitoire === undefined){
                return;
            }
            traitement(<E>contenuJSON);
        });
    };

};



