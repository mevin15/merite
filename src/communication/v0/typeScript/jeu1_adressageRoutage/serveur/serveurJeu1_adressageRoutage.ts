import * as url from 'url';
import * as shell from "shelljs";

import {
    Identifiant,
    creerDate, creerDateMaintenant,
    TableIdentification, creerTableIdentificationVide
} from "../../bibliotheque/types";
import {  } from "../../bibliotheque/outils";
import {
    binaire
} from "../../bibliotheque/binaire";
import { } from "../../bibliotheque/communication";

import { ServeurLiensWebSocket, LienWebSocket } from "../../bibliotheque/serveurConnexions";
import { ServeurApplications, Interaction } from "../../bibliotheque/serveurApplications"

import {
    hote, port1, port2, // DONE
    ReseauJeu1, creerAnneauJeu1, // DONE
    PopulationParDomaine, assemblerPopulationParDomaine, // DONE
    composerErreurJeu1, FormatErreurJeu1EX, EtiquetteErreurJeu1,
    composerConfigurationJeu1, FormatConfigurationJeu1EX, EtiquetteConfigurationJeu1,
    FormatSommetJeu1EX, EtiquetteSommetJeu1, SommetJeu1,
    TypeMessageJeu1, FormatMessageJeu1EX, EtiquetteMessageJeu1
} from '../commun/jeu1_adressageRoutage';


class ServeurJeu1
    extends
    ServeurLiensWebSocket<
    FormatErreurJeu1EX, FormatErreurJeu1EX, EtiquetteErreurJeu1,
    FormatConfigurationJeu1EX, FormatConfigurationJeu1EX, EtiquetteConfigurationJeu1,
    FormatMessageJeu1EX, FormatMessageJeu1EX, EtiquetteMessageJeu1> { }

class LienJeu1
    extends LienWebSocket<
    FormatErreurJeu1EX, FormatErreurJeu1EX, EtiquetteErreurJeu1,
    FormatConfigurationJeu1EX, FormatConfigurationJeu1EX, EtiquetteConfigurationJeu1,
    FormatMessageJeu1EX, FormatMessageJeu1EX, EtiquetteMessageJeu1> { }

const anneau: ReseauJeu1
    = creerAnneauJeu1([binaire(0), binaire(1), binaire(2), binaire(3)]);
//const reseauConnecte: TableNoeudsJeu1 = creerTableVideNoeuds();

const utilisateursParDomaine: PopulationParDomaine
    = assemblerPopulationParDomaine(anneau, [binaire(0), binaire(1)]);

const utilisateursConnectesParDomaine: PopulationParDomaine
    = assemblerPopulationParDomaine(anneau, []);

const connexions: TableIdentification<'utilisateur', LienJeu1, LienJeu1>
    = creerTableIdentificationVide<'utilisateur', LienJeu1, LienJeu1>('utilisateur', (x) => x);

const repertoireHtml: string = shell.pwd() + "/build";

const serveurAppli: ServeurApplications = new ServeurApplications(hote, port1);

serveurAppli.specifierRepertoireScriptsEmbarques("build");

{
    let racine = "/";
    let ressource = "clientJeu1.html";

    serveurAppli.enregistrerReponseARequeteGET(racine, (i: Interaction) => {
        let d = creerDateMaintenant()
        console.log("* " + d.representationLog() + " - Service de " + ressource + " en " + racine);
        i.servirFichier(repertoireHtml, ressource);
    });
}

serveurAppli.demarrer();

const serveurCanaux = new ServeurJeu1(port2, hote);

serveurCanaux.enregistrerTraitementConnexion((l: LienJeu1) => {
    let ids: [Identifiant<'sommet'>, Identifiant<'utilisateur'>];
    try {
        ids = utilisateursParDomaine.selectionnerUtilisateur();
    } catch (e) {
        let d = creerDateMaintenant()
        console.log("* " + d.representationLog() + " - " + (<Error>e).message);
        console.log("* " + d.representationLog() + " - Connexion impossible d'un client : le réseau est complet.");
        l.envoyerMessageErreur(composerErreurJeu1(
            "Jeu 1 (adressage - routage) - Il est impossible de se connecter : le réseau est déjà complet.",
            d.ex()));
        return false;
    }
    let ID_dom = ids[0];
    let ID_util = ids[1];

    if (connexions.contient(ID_util)
        || utilisateursConnectesParDomaine.contientUtilisateur(ID_dom, ID_util)) {
        let d = creerDateMaintenant()
        console.log("* " + d.representationLog() + " - Connexion impossible d'un client : le réseau est corrompu.");
        l.envoyerMessageErreur(composerErreurJeu1(
            "Jeu 1 (adressage - routage) - Réseau corrompu ! Il est impossible de se connecter : le réseau est corrompu. Contacter l'administrateur.",
            d.ex()));
        return false;
    }

    // Cas où la sélection d'un utilisateur est réussie
    let d = creerDateMaintenant();
    console.log("* " + d.representationLog()
        + " - Connexion de l'utilisateur " + ID_util.val
        + " du domaine " + ID_dom.val + " par Web socket.");

    connexions.ajouter(ID_util, l);

    let n = anneau.noeud(ID_dom);
    let pop = utilisateursParDomaine.valeur(ID_dom);
    let u = utilisateursParDomaine.utilisateur(ID_dom, ID_util);
    let config = composerConfigurationJeu1(n, pop, u, d.ex());

    console.log("- envoi au client d'adresse " + l.adresseClient());
    console.log("  - de la configuration brute " + config.brut());
    console.log("  - de la configuration nette " + config.representation());
    l.envoyerConfiguration(config);
    utilisateursConnectesParDomaine.ajouterUtilisateur(ID_dom, u);
    utilisateursParDomaine.retirerUtilisateur(ID_dom, ID_util);
    return true;
});

serveurCanaux.enregistrerTraitementMessages((l: LienJeu1, m: FormatMessageJeu1EX) => {
    console.log('TODO traitement messages');
    /*  
    let msg: MessageTchat = creerMessage(m);
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
    */
});

serveurCanaux.enregistrerTraitementFermeture((l: LienJeu1, r: number, desc: string) => {
    console.log('TODO traitement fermeture');
    /*
    let id: IdentifiantSommet = l.configuration().enJSON().centre.id;
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
    */
});

serveurCanaux.demarrer();

