import * as url from 'url';

import { Identifiant, FormatMessage, Message, TableNoeuds } from "../../bibliotheque/communication";
import {
    creerMessageErreurConnexion, creerMessageRetourErreur, creerMessageTransit, creerMessageAR,
    TypeMessageChat, FormatMessageChat, MessageChat, creerAnneauChat, FormatSommetChat
} from '../commun/chat';
import { adresse, ServeurLiensWebSocket, LienWebSocket } from "../../bibliotheque/serveur";
import { ServeurVuesDynamiques, Interaction } from "../../bibliotheque/serveurVuesDynamiques"
import { elementSaisieEnvoi } from "../../bibliotheque/vueDynamique"


const anneau: TableNoeuds<FormatSommetChat> = creerAnneauChat(["titi", "toto", "coco", "sissi"]);
const reseauConnecte: TableNoeuds<FormatSommetChat> = new TableNoeuds<FormatSommetChat>();
const connexions: { [id: string]: LienWebSocket<FormatMessageChat> } = {};
const hote: string = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
const port1 = 3000; // Ressource 1
const port2: number = 1234; // Ressouce 2

function adresseConnexion(hote: string, port: number, id: Identifiant) {
    return hote + ":" + port + "/" + id;
}

function identifiantDansAdresse(ad: url.Url): Identifiant {
    return ad.pathname.slice(1);
}

// Vue dynamique (page paramétrée x.tchat -> x.html)

const serveurVues: ServeurVuesDynamiques = new ServeurVuesDynamiques(hote, port1);

serveurVues.definirParametrisationVuesDynamique("tchat",
    ".",
    ["adresse", "centreNoeud", "voisinsNoeud", "saisieEnvoiMessages"]);

serveurVues.specifierRepertoireScriptsEmbarques("build");

serveurVues.enregistrerVueDynamique("/", (i: Interaction) => {
    let id: Identifiant;
    // sélection d'un noeud
    for (id in anneau.noeuds()) { // une seule itération
        break;
    }
    // Cas où le réseau est vide
    if (id === undefined) {
        console.log("* " + (new Date()) + " - Connexion impossible d'un client : le réseau est complet.");
        i.servirContenuSimple("Tchat - Client - Réseau complet ! Il est impossible de se connecter : le réseau est déjà complet.");
        return;
    }
    // Cas où la sélection d'un noeud a réussi
    let n = anneau.noeud(id);
    let repCentreNoeud: string = n.centre().brut();
    let voisinsNoeud = n.voisinsEnJSON();
    let repVoisinsNoeud: string = JSON.stringify(voisinsNoeud);
    let contenuFormulaire = "";
    let idV;
    for (idV in voisinsNoeud) {
        contenuFormulaire = contenuFormulaire + elementSaisieEnvoi("message_" + idV, "boutonEnvoi_" + idV,
            "Envoyer un message à " + n.voisin(idV).enJSON().pseudo + ".");
    }
    let r: { [cle: string]: string } = {
        adresse: adresseConnexion(hote, port2, id),
        centreNoeud: repCentreNoeud,
        voisinsNoeud: repVoisinsNoeud,
        saisieEnvoiMessages: contenuFormulaire
    };
    i.servirVueDynamiquement('clientTchat', r); // passage des paramètres      
    anneau.retirerNoeud(n);
    reseauConnecte.ajouterNoeud(n);
    console.log("* " + (new Date()) + " - Connexion d'un client pour récupérer l'application de tchat");
    console.log("- identité : " + id);
    console.log("- noeud de centre : " + repCentreNoeud);
    console.log("- noeud de voisins : " + repVoisinsNoeud);
});

serveurVues.demarrer();

type ServeurChat = ServeurLiensWebSocket<FormatMessageChat>;
const serveurCanaux = new ServeurLiensWebSocket<FormatMessageChat>(port2, hote);

serveurCanaux.enregistrerTraitementConnexion((l: LienWebSocket<FormatMessageChat>) => {
    let id: Identifiant = identifiantDansAdresse(l.url());
    if ((connexions[id] === undefined) && (reseauConnecte.possedeNoeud(id))) {
        console.log("* " + (new Date()) + " - Connexion de " + id + " par Web socket.");
        connexions[id] = l;
        return;
    }
    let msgErreur = "Connexion par Web socket impossible pour " + id + " : soit le noeud est déjà connecté soit il est inconnu.";
    console.log("* " + msgErreur);
    l.envoyerAuClientDestinataire(creerMessageErreurConnexion(id, msgErreur));
});

serveurCanaux.enregistrerTraitementMessages((l: LienWebSocket<FormatMessageChat>, m: FormatMessageChat) => {
    let msg: MessageChat = new MessageChat(m);
    console.log("* Traitement d'un message");
    console.log("- brut : " + msg.brut());
    console.log("- net : " + msg.net());
    switch (m.type) {
        case TypeMessageChat.COM:
            let emetteurUrl = identifiantDansAdresse(l.url());
            let emetteurMsg = m.emetteur;
            let destinataireMsg = m.destinataire;
            // Contrôle de l'émetteur et du destinataire
            if (emetteurUrl !== emetteurMsg) {
                let msgErreur = "problème d'identité pour l'émetteur : le client utilisant l'adresse "
                    + adresse(l.url())
                    + " devrait signer ses messages " + emetteurUrl + " et non " + emetteurMsg + ".";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageChat.ERREUR_EMET, msgErreur));
                break;
            }
            if (connexions[emetteurMsg] === undefined) {
                let msgErreur = "problème de Web socket : la connexion n'est plus active. Fermer l'onglet et se reconnecter.";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageChat.ERREUR_EMET, msgErreur));
                break;
            }
            if (connexions[destinataireMsg] === undefined) {
                let msgErreur = "destinataire inconnu ou non connecté. Attendre sa connexion ou essayer un autre destinataire.";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageChat.ERREUR_DEST, msgErreur));
                break;
            }
            // Contrôle des communications 
            if (!reseauConnecte.noeud(emetteurMsg).aPourVoisin(destinataireMsg)) {
                let msgErreur = "communication interdite : le noeud émetteur "
                    + emetteurMsg + " n'est pas vosin du noeud destinataire " + destinataireMsg + ".";
                console.log("- " + msgErreur);
                l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageChat.INTERDICTION, msgErreur));
            }
            // Fonctionnement normal
            let lienDestinaire: LienWebSocket<FormatMessageChat> = connexions[destinataireMsg];
            let lienEmetteur: LienWebSocket<FormatMessageChat> = connexions[emetteurMsg];
            lienDestinaire.envoyerAuClientDestinataire(creerMessageTransit(msg));
            lienEmetteur.envoyerAuClientDestinataire(creerMessageAR(msg));
            break;
        default:
            let msgErreur = "type de message non reconnu : le type doit être " + TypeMessageChat.COM.toString() + " et non " + m.type + ".";
            console.log("- " + msgErreur);
            l.envoyerAuClientDestinataire(creerMessageRetourErreur(msg, TypeMessageChat.ERREUR_TYPE, msgErreur));
            break;
    }
});

serveurCanaux.enregistrerTraitementFermeture((l: LienWebSocket<FormatMessageChat>) => {
    let id: Identifiant = identifiantDansAdresse(l.url());
    if ((connexions[id] === undefined) || (!reseauConnecte.possedeNoeud(id))) {
        console.log("* Impossibilité de fermer la connexion par Web socket : " + id + " est déjà déconnecté.");
        connexions[id] = l;
        return;
    }
    console.log("* " + (new Date()) + " - Fermeture de la connexion par Web socket : " + id + " est maintenant déconnecté.");
    let n = reseauConnecte.noeud(id);
    reseauConnecte.retirerNoeud(n);
    delete connexions[id];
    anneau.ajouterNoeud(n);
});

serveurCanaux.demarrer();

