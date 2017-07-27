import * as url from 'url';
import * as shell from "shelljs";

import { Identifiant, FormatMessage, Message, TableNoeuds } from "../../bibliotheque/communication";
import {
    hote, port1, port2,
    creerMessageErreurConnexion, creerMessageRetourErreur, creerMessageTransit, creerMessageAR,
    TypeMessageTchat, FormatMessageTchat, MessageTchat,
    creerConfiguration, FormatConfigurationTchat,
    creerMessageErreur, FormatErreurTchat,
    creerAnneauTchat, FormatSommetTchat
} from '../commun/tchat';
import { adresse, ServeurLiensWebSocket, LienWebSocket } from "../../bibliotheque/serveurConnexions";
import { ServeurApplications, Interaction } from "../../bibliotheque/serveurApplications"

import { dateFrLog } from "../../bibliotheque/outils"

type ServeurTchat = ServeurLiensWebSocket<FormatErreurTchat, FormatConfigurationTchat, FormatMessageTchat>;
type LienTchat = LienWebSocket<FormatErreurTchat, FormatConfigurationTchat, FormatMessageTchat>;

const anneau: TableNoeuds<FormatSommetTchat> = creerAnneauTchat(["titi", "toto", "coco", "sissi"]);
const reseauConnecte: TableNoeuds<FormatSommetTchat> = new TableNoeuds<FormatSommetTchat>();
const connexions: { [id: string]: LienTchat } = {};

const repertoireHtml: string = shell.pwd() + "/build";

function selectionIdentifiant(): Identifiant {
    // sélection d'un noeud
    for (let id in anneau.noeuds()) { // une seule itération
        return id;
    }
    return null;
}

// Vue dynamique (page paramétrée x.tchat -> x.html)

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

const serveurCanaux = new ServeurLiensWebSocket<FormatErreurTchat, FormatConfigurationTchat, FormatMessageTchat>(port2, hote);

serveurCanaux.enregistrerTraitementConnexion((l: LienTchat) => {
    let id: Identifiant = selectionIdentifiant();

    if (id === undefined) {
        let d = new Date();
        console.log("* " + dateFrLog(d) + " - Connexion impossible d'un client : le réseau est complet.");
        l.envoyerMessageErreur(creerMessageErreur(
            "Tchat - Client - Réseau complet ! Il est impossible de se connecter : le réseau est déjà complet.",
            d));
        return;
    }

    if ((connexions[id] !== undefined) || (reseauConnecte.possedeNoeud(id))) {
        let d = new Date();
        console.log("* " + dateFrLog(d) + " - Connexion impossible d'un client : le réseau est corrompu.");
        l.envoyerMessageErreur(creerMessageErreur(
            "Tchat - Client - Réseau corrompu ! Il est impossible de se connecter : le réseau est corrompu. Contacter l'administrateur.",
            d));
        return;
    }

    let d = new Date();
    console.log("* " + dateFrLog(d) + " - Connexion de " + id + " par Web socket.");

    // Cas où la sélection d'un noeud a réussi

    connexions[id] = l;

    let n = anneau.noeud(id);
    let config = creerConfiguration(n, d);
    console.log("- envoi au client d'adresse " + l.adresseClient());
    console.log("  - de la configuration brute " + config.brut());
    console.log("  - de la configuration nette " + config.net());
    l.envoyerConfiguration(config);
    anneau.retirerNoeud(n);
    reseauConnecte.ajouterNoeud(n);
    return;
});

serveurCanaux.enregistrerTraitementMessages((l: LienTchat, m: FormatMessageTchat) => {
    let msg: MessageTchat = new MessageTchat(m);
    console.log("* Traitement d'un message");
    console.log("- brut : " + msg.brut());
    console.log("- net : " + msg.net());
    switch (m.type) {
        case TypeMessageTchat.COM:
            let emetteurUrl = l.configuration().enJSON().centre.id;
            let emetteurMsg = m.emetteur;
            let destinataireMsg = m.destinataire;
            // Contrôle de l'émetteur et du destinataire
            if (emetteurUrl !== emetteurMsg) {
                let msgErreur = "problème d'identité pour l'émetteur : le client utilisant l'adresse "
                    + l.adresseClient()
                    + " devrait signer ses messages " + emetteurUrl + " et non " + emetteurMsg + ".";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.ERREUR_EMET, msgErreur));
                break;
            }
            if (connexions[emetteurMsg] === undefined) {
                let msgErreur = "problème de Web socket : la connexion n'est plus active. Fermer l'onglet et se reconnecter.";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.ERREUR_EMET, msgErreur));
                break;
            }
            if (connexions[destinataireMsg] === undefined) {
                let msgErreur = "destinataire inconnu ou non connecté. Attendre sa connexion ou essayer un autre destinataire.";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.ERREUR_DEST, msgErreur));
                break;
            }
            // Contrôle des communications 
            if (!reseauConnecte.noeud(emetteurMsg).aPourVoisin(destinataireMsg)) {
                let msgErreur = "communication interdite : le noeud émetteur "
                    + emetteurMsg + " n'est pas vosin du noeud destinataire " + destinataireMsg + ".";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageTchat.INTERDICTION, msgErreur));
            }
            // Fonctionnement normal
            let lienDestinaire: LienTchat = connexions[destinataireMsg];
            let lienEmetteur: LienTchat = connexions[emetteurMsg];
            let msgTransit = creerMessageTransit(msg);
            console.log("- Envoi en transit au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgTransit.brut());
            console.log("  - du message net : " + msgTransit.net());
            lienDestinaire.envoyerAuClientDestinataire(msgTransit);
            let msgAR = creerMessageAR(msg);
            console.log("- Envoi en accusé de réception au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgAR.brut());
            console.log("  - du message net : " + msgAR.net());
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
    let id: Identifiant = l.configuration().enJSON().centre.id;
    if ((connexions[id] === undefined) || (!reseauConnecte.possedeNoeud(id))) {
        console.log("* Impossibilité de fermer la connexion par Web socket : " + id + " est déjà déconnecté.");
        connexions[id] = l;
        return;
    }
    console.log(" * " + dateFrLog(new Date()) + " - Déconnexion du client utilisant l'adresse " + l.adresseClient() + ".");
    console.log("- identité : " + l.configuration().enJSON().centre.id);
    console.log("- raison : " + r + " ; description : " + desc);
    let n = reseauConnecte.noeud(id);
    reseauConnecte.retirerNoeud(n);
    delete connexions[id];
    anneau.ajouterNoeud(n);
});

serveurCanaux.demarrer();

