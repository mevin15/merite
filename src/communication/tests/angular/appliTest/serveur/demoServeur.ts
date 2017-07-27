import * as url from 'url';

import { noms, couleurs } from "../commun/liste"
import { ServeurApplications, Interaction } from "./serveurApplications"

function initialiser(c: { [cle: string]: { "nom": string, "couleur": string } }) {
    for (let id in noms) {
        c[id] = {
            "nom": noms[id],
            "couleur": couleurs[id]
        };
    }
}

const clients: { [cle: string]: { "nom": string, "couleur": string } } = {};

initialiser(clients);

console.log(JSON.stringify(clients));

const clientsConnectes: { [cle: string]: { "nom": string, "couleur": string } } = {};

const hote: string = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
const port = 3000; // Ressource 1


const serveur: ServeurApplications = new ServeurApplications(hote, port);

serveur.specifierRepertoireScriptsEmbarques("dist");

serveur.enregistrerReponseRequetePOST("/nom", (i: Interaction) => {
    let id: string;
    // sélection d'un noeud
    for (id in clients) { // une seule itération
        break;
    }
    // Cas où le réseau est vide
    if (id === undefined) {
        console.log("* " + (new Date()) + " - Connexion impossible d'un client : le réseau est complet.");
        i.servirContenuJSON({ "erreur": "Réseau complet ! Il est impossible de se connecter : le réseau est déjà complet." });
        return;
    }
    // Cas où la sélection d'un noeud a réussi
    i.servirContenuJSON(id);
    clientsConnectes[id] = {
        "nom": clients[id].nom,
        "couleur": clients[id].couleur
    };
    clients[id] = undefined;
    console.log("* " + (new Date()) + " - Récupération par un client de son nom");
    console.log("- identité : " + id);
});

serveur.enregistrerReponseRequeteGET("/", (i: Interaction) => {
    i.servirVue("dist/index");
});

serveur.demarrer();



