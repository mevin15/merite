import * as url from 'url';
import * as shell from "shelljs";

import {
    Table,
    Identifiant,
    TableIdentification, creerTableIdentificationVide 
} from "../../bibliotheque/types";

import { creerReseauVide } from "../../bibliotheque/communication";
import {
    hote, port1, port2,
    SommetTchat,
    ReseauTchat, creerAnneauTchat,
    FormatNoeudTchatEX, 
    creerMessageErreurConnexion, creerMessageRetourErreur,
    TypeMessageTchat, FormatMessageTchatEX, EtiquetteMessageTchat,
    MessageTchat,
    composerConfigurationTchat, FormatConfigurationTchatEX, EtiquetteConfigurationTchat,
    composerErreurTchat, FormatErreurTchatEX, EtiquetteErreurTchat,
    
} from '../commun/tchat';
import { ServeurLiensWebSocket, LienWebSocket } from "../../bibliotheque/serveurConnexions";
import { ServeurApplications, Interaction } from "../../bibliotheque/serveurApplications";

import { dateFrLog } from "../../bibliotheque/outils"

class ServeurTchat extends ServeurLiensWebSocket<
    FormatErreurTchatEX, FormatErreurTchatEX, EtiquetteErreurTchat,
    FormatConfigurationTchatEX, FormatConfigurationTchatEX, EtiquetteConfigurationTchat,
    FormatMessageTchatEX, FormatMessageTchatEX, EtiquetteMessageTchat
    > { }

class LienTchat extends LienWebSocket<
    FormatErreurTchatEX, FormatErreurTchatEX, EtiquetteErreurTchat,
    FormatConfigurationTchatEX, FormatConfigurationTchatEX, EtiquetteConfigurationTchat,
    FormatMessageTchatEX, FormatMessageTchatEX, EtiquetteMessageTchat
    > { }


const anneau: ReseauTchat = creerAnneauTchat(["titi", "toto", "coco", "sissi"]);
const reseauConnecte: ReseauTchat = creerReseauVide();
const connexions: TableIdentification<'sommet', LienTchat, LienTchat>
    = creerTableIdentificationVide<'sommet', LienTchat, LienTchat>('sommet', (x) => x);

const repertoireHtml: string = shell.pwd() + "/build";

const serveurAppli: ServeurApplications = new ServeurApplications(hote, port1);

serveurAppli.specifierRepertoireScriptsEmbarques("build");

{
    let racine = "/";
    let ressource = "clientTchat1.html";

    serveurAppli.enregistrerReponseARequeteGET(racine, (i: Interaction) => {
        let d = new Date();
        console.log("* " + dateFrLog(d) + " - Service de " + ressource + " en " + racine);
        i.servirFichier(repertoireHtml, ressource);
    });
}

serveurAppli.demarrer();

const serveurCanaux = new ServeurTchat(port2, hote);

serveurCanaux.enregistrerTraitementConnexion((l: LienTchat) => {
    let ID_sommet: Identifiant<'sommet'>;
    try{
        ID_sommet = anneau.selectionCle();
    }catch(e){
        let d = new Date();
        console.log("* " + dateFrLog(d) + " - " + (<Error>e).message);
        console.log("* " + dateFrLog(d) + " - Connexion impossible d'un client : le réseau est complet.");
        l.envoyerMessageErreur(composerErreurTchat(
            "Tchat - Réseau complet ! Il est impossible de se connecter : le réseau est complet.",
            d));
        return false;
    }

    if (connexions.contient(ID_sommet) || reseauConnecte.possedeNoeud(ID_sommet)) {
        let d = new Date();
        console.log("* " + dateFrLog(d) + " - Connexion impossible d'un client : le réseau est corrompu.");
        l.envoyerMessageErreur(composerErreurTchat(
            "Tchat - Réseau corrompu ! Il est impossible de se connecter : le réseau est corrompu. Contacter l'administrateur.",
            d));
        return false;
    }

    // Cas où la sélection d'un noeud a réussi
    let d = new Date();
    console.log("* " + dateFrLog(d) + " - Connexion de " + ID_sommet.val + " par Web socket.");

    connexions.ajouter(ID_sommet, l);

    let n = anneau.valeur(ID_sommet);
    let config = composerConfigurationTchat(n, d);
    console.log("- envoi au client d'adresse " + l.adresseClient());
    console.log("  - de la configuration brute " + config.brut());
    console.log("  - de la configuration nette " + config.representer());
    l.envoyerConfiguration(config);
    anneau.retirerNoeud(n);
    reseauConnecte.ajouterNoeud(n);
    return true;
});

serveurCanaux.enregistrerTraitementMessages((l: LienTchat, m: FormatMessageTchatEX) => {
    let msg: MessageTchat = new MessageTchat(m);
    console.log("* Traitement d'un message");
    console.log("- brut : " + msg.brut());
    console.log("- net : " + msg.representer());
    switch (m.type) {
        case TypeMessageTchat.COM:
            let ID_emetteurUrl = l.configuration().ex().centre.ID;
            let ID_emetteurMsg = m.ID_emetteur;
            let ID_destinataireMsg = m.ID_destinataire;
            // Contrôle de l'émetteur et du destinataire
            if (!(ID_emetteurUrl.val === ID_emetteurMsg.val)) {
                let msgErreur = "problème d'identité pour l'émetteur : le client utilisant l'adresse "
                    + l.adresseClient()
                    + " devrait signer ses messages " + ID_emetteurUrl + " et non " + ID_emetteurMsg + ".";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.ERREUR_EMET, msgErreur));
                break;
            }
            if (connexions.valeur(ID_emetteurMsg) === undefined) {
                let msgErreur = "problème de Web socket : la connexion n'est plus active. Fermer l'onglet et se reconnecter.";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.ERREUR_EMET, msgErreur));
                break;
            }
            if (connexions.valeur(ID_destinataireMsg) === undefined) {
                let msgErreur = "destinataire inconnu ou non connecté. Attendre sa connexion ou essayer un autre destinataire.";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.ERREUR_DEST, msgErreur));
                break;
            }
            // Contrôle des communications 
            if (!reseauConnecte.sontVoisins(ID_emetteurMsg, ID_destinataireMsg)) {
                let msgErreur = "communication interdite : le noeud émetteur "
                    + ID_emetteurMsg.val
                    + " n'est pas vosin du noeud destinataire " + ID_destinataireMsg.val + ".";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.INTERDICTION, msgErreur));
            }
            // Fonctionnement normal
            let lienDestinaire: LienTchat = connexions.valeur(ID_destinataireMsg);
            let lienEmetteur: LienTchat = connexions.valeur(ID_emetteurMsg);
            let msgTransit = msg.transit();
            console.log("- Envoi en transit au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgTransit.brut());
            console.log("  - du message net : " + msgTransit.representer());
            lienDestinaire.envoyerAuClientDestinataire(msgTransit);
            let msgAR = msg.avecAccuseReception();
            console.log("- Envoi en accusé de réception au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgAR.brut());
            console.log("  - du message net : " + msgAR.representer());
            lienEmetteur.envoyerAuClientDestinataire(msgAR);
            break;
        default:
            let msgErreur = "type de message non reconnu : le type doit être " + TypeMessageTchat.COM.toString() + " et non " + m.type + ".";
            console.log("- " + msgErreur);
            l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.ERREUR_TYPE, msgErreur));
            break;
    }
});

serveurCanaux.enregistrerTraitementFermeture((l: LienTchat, r: number, desc: string) => {
    let ID_centre = l.configuration().ex().centre.ID;
    if ((connexions.valeur(ID_centre) === undefined) || (!reseauConnecte.possedeNoeud(ID_centre))) {
        console.log("* Impossibilité de fermer la connexion par Web socket : " + ID_centre.val + " est déjà déconnecté.");
        connexions.ajouter(ID_centre, l);
        return;
    }
    console.log(" * " + dateFrLog(new Date())
        + " - Déconnexion du client " + ID_centre.val
        + " utilisant l'adresse " + l.adresseClient() + ".");
    console.log("- identité : " + l.configuration().ex().centre.ID);
    console.log("- raison : " + r + " ; description : " + desc);
    let n = reseauConnecte.valeur(ID_centre);
    reseauConnecte.retirerNoeud(n);
    connexions.retirer(ID_centre);
    anneau.ajouterNoeud(n);
});

serveurCanaux.demarrer();

