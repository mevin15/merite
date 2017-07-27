import * as express from 'express';
import * as sysFichier from 'fs';

/*
Serveur utilisant Express
http://expressjs.com/en/api.html
*/

/*
Classe à développer
*/
export class Interaction {
    private _requete : express.Request;
    private _reponse : express.Response;
    private _suite : express.NextFunction;
    constructor(requete : express.Request, reponse : express.Response, suite : express.NextFunction){
        this._requete = requete;
        this._reponse = reponse;
        this._suite = suite;
    }

    servirVue(prefixe : string) : void{
        this._reponse.render(prefixe);
    }

    servirContenuSimple(contenu : string){
        this._reponse.send(contenu);
    }

    servirContenuJSON(contenu : any){
        this._reponse.json(contenu);
    }
}

export class ServeurApplications {
    private appli: express.Application;
    private hote: string;
    private port: number;
    constructor(hote: string, port: number) {
        this.appli = express();
        this.hote = hote;
        this.port = port;
    }

    demarrer(): void {
        let ceServeur = this;
        this.appli.listen(this.port, this.hote, () => {
            console.log("* " + (new Date()) + " - Le serveur écoute le port " + this.port + " de l'hôte " + this.hote + ".");
        });
    }

    specifierRepertoireScriptsEmbarques(rep: string): void {
        this.appli.use(express.static(rep)); // répertoire local visible
    }

    enregistrerReponseRequeteGET(chemin: string, calcul: (i : Interaction) => void): void {
        this.appli.get(chemin, 
            (requete : express.Request, reponse : express.Response, suite : express.NextFunction) => {
                calcul(new Interaction(requete, reponse, suite));
        });
    }
    enregistrerReponseRequetePOST(chemin: string, calcul: (i : Interaction) => void): void {
        this.appli.post(chemin, 
            (requete : express.Request, reponse : express.Response, suite : express.NextFunction) => {
                calcul(new Interaction(requete, reponse, suite));
        });
    }

}
