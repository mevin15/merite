"use strict";
exports.__esModule = true;
var shell = require("shelljs");
var communication_1 = require("../../bibliotheque/communication");
var tchat_1 = require("../commun/tchat");
var serveurConnexions_1 = require("../../bibliotheque/serveurConnexions");
var serveurApplications_1 = require("../../bibliotheque/serveurApplications");
var outils_1 = require("../../bibliotheque/outils");
var anneau = tchat_1.creerAnneauTchat(["titi", "toto", "coco", "sissi"]);
var reseauConnecte = new communication_1.TableNoeuds();
var connexions = {};
var repertoireHtml = shell.pwd() + "/build";
function selectionIdentifiant() {
    // sélection d'un noeud
    for (var id in anneau.noeuds()) {
        return id;
    }
    return undefined;
}
// Vue dynamique (page paramétrée x.tchat -> x.html)
var serveurAppli = new serveurApplications_1.ServeurApplications(tchat_1.hote, tchat_1.port1);
serveurAppli.specifierRepertoireScriptsEmbarques("build");
{
    var racine_1 = "/";
    var ressource_1 = "clientTchat1.html";
    serveurAppli.enregistrerReponseARequeteGET(racine_1, function (i) {
        var d = new Date();
        console.log("* " + outils_1.dateFrLog(d) + " - Service de " + ressource_1 + " en " + racine_1);
        i.servirFichier(repertoireHtml, ressource_1);
    });
}
serveurAppli.demarrer();
var serveurCanaux = new serveurConnexions_1.ServeurLiensWebSocket(tchat_1.port2, tchat_1.hote);
serveurCanaux.enregistrerTraitementConnexion(function (l) {
    var id = selectionIdentifiant();
    if (id === undefined) {
        var d_1 = new Date();
        console.log("* " + outils_1.dateFrLog(d_1) + " - Connexion impossible d'un client : le réseau est complet.");
        l.envoyerMessageErreur(tchat_1.creerMessageErreur("Tchat - Client - Réseau complet ! Il est impossible de se connecter : le réseau est déjà complet.", d_1));
        return false;
    }
    if ((connexions[id] !== undefined) || (reseauConnecte.possedeNoeud(id))) {
        var d_2 = new Date();
        console.log("* " + outils_1.dateFrLog(d_2) + " - Connexion impossible d'un client : le réseau est corrompu.");
        l.envoyerMessageErreur(tchat_1.creerMessageErreur("Tchat - Client - Réseau corrompu ! Il est impossible de se connecter : le réseau est corrompu. Contacter l'administrateur.", d_2));
        return false;
    }
    // Cas où la sélection d'un noeud a réussi
    var d = new Date();
    console.log("* " + outils_1.dateFrLog(d) + " - Connexion de " + id + " par Web socket.");
    connexions[id] = l;
    var n = anneau.noeud(id);
    var config = tchat_1.creerConfiguration(n, d);
    console.log("- envoi au client d'adresse " + l.adresseClient());
    console.log("  - de la configuration brute " + config.brut());
    console.log("  - de la configuration nette " + config.net());
    l.envoyerConfiguration(config);
    anneau.retirerNoeud(n);
    reseauConnecte.ajouterNoeud(n);
    return true;
});
serveurCanaux.enregistrerTraitementMessages(function (l, m) {
    var msg = new tchat_1.MessageTchat(m);
    console.log("* Traitement d'un message");
    console.log("- brut : " + msg.brut());
    console.log("- net : " + msg.net());
    switch (m.type) {
        case tchat_1.TypeMessageTchat.COM:
            var emetteurUrl = l.configuration().enJSON().centre.id;
            var emetteurMsg = m.emetteur;
            var destinataireMsg = m.destinataire;
            // Contrôle de l'émetteur et du destinataire
            if (emetteurUrl !== emetteurMsg) {
                var msgErreur_1 = "problème d'identité pour l'émetteur : le client utilisant l'adresse "
                    + l.adresseClient()
                    + " devrait signer ses messages " + emetteurUrl + " et non " + emetteurMsg + ".";
                console.log("- " + msgErreur_1);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_EMET, msgErreur_1));
                break;
            }
            if (connexions[emetteurMsg] === undefined) {
                var msgErreur_2 = "problème de Web socket : la connexion n'est plus active. Fermer l'onglet et se reconnecter.";
                console.log("- " + msgErreur_2);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_EMET, msgErreur_2));
                break;
            }
            if (connexions[destinataireMsg] === undefined) {
                var msgErreur_3 = "destinataire inconnu ou non connecté. Attendre sa connexion ou essayer un autre destinataire.";
                console.log("- " + msgErreur_3);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_DEST, msgErreur_3));
                break;
            }
            // Contrôle des communications 
            if (!reseauConnecte.noeud(emetteurMsg).aPourVoisin(destinataireMsg)) {
                var msgErreur_4 = "communication interdite : le noeud émetteur "
                    + emetteurMsg + " n'est pas vosin du noeud destinataire " + destinataireMsg + ".";
                console.log("- " + msgErreur_4);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.INTERDICTION, msgErreur_4));
            }
            // Fonctionnement normal
            var lienDestinaire = connexions[destinataireMsg];
            var lienEmetteur = connexions[emetteurMsg];
            var msgTransit = tchat_1.creerMessageTransit(msg);
            console.log("- Envoi en transit au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgTransit.brut());
            console.log("  - du message net : " + msgTransit.net());
            lienDestinaire.envoyerAuClientDestinataire(msgTransit);
            var msgAR = tchat_1.creerMessageAR(msg);
            console.log("- Envoi en accusé de réception au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgAR.brut());
            console.log("  - du message net : " + msgAR.net());
            lienEmetteur.envoyerAuClientDestinataire(msgAR);
            break;
        default:
            var msgErreur = "type de message non reconnu : le type doit être " + tchat_1.TypeMessageTchat.COM.toString() + " et non " + m.type + ".";
            console.log("- " + msgErreur);
            l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_TYPE, msgErreur));
            break;
    }
});
serveurCanaux.enregistrerTraitementFermeture(function (l, r, desc) {
    var id = l.configuration().enJSON().centre.id;
    if ((connexions[id] === undefined) || (!reseauConnecte.possedeNoeud(id))) {
        console.log("* Impossibilité de fermer la connexion par Web socket : " + id + " est déjà déconnecté.");
        connexions[id] = l;
        return;
    }
    console.log(" * " + outils_1.dateFrLog(new Date()) + " - Déconnexion du client utilisant l'adresse " + l.adresseClient() + ".");
    console.log("- identité : " + l.configuration().enJSON().centre.id);
    console.log("- raison : " + r + " ; description : " + desc);
    var n = reseauConnecte.noeud(id);
    reseauConnecte.retirerNoeud(n);
    delete connexions[id];
    anneau.ajouterNoeud(n);
});
serveurCanaux.demarrer();
//# sourceMappingURL=serveurTchat.js.map