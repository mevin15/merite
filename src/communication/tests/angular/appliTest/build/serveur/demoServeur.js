"use strict";
exports.__esModule = true;
var liste_1 = require("../commun/liste");
var serveurApplications_1 = require("./serveurApplications");
function initialiser(c) {
    for (var id in liste_1.noms) {
        c[id] = {
            "nom": liste_1.noms[id],
            "couleur": liste_1.couleurs[id]
        };
    }
}
var clients = {};
initialiser(clients);
console.log(JSON.stringify(clients));
var clientsConnectes = {};
var hote = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
var port = 3000; // Ressource 1
var serveur = new serveurApplications_1.ServeurApplications(hote, port);
serveur.specifierRepertoireScriptsEmbarques("dist");
serveur.enregistrerReponseRequetePOST("/nom", function (i) {
    var id;
    // sélection d'un noeud
    for (id in clients) {
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
serveur.enregistrerReponseRequeteGET("/", function (i) {
    i.servirVue("dist/index");
});
serveur.demarrer();
//# sourceMappingURL=demoServeur.js.map