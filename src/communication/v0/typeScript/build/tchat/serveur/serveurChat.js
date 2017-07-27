"use strict";
// Obsolète
exports.__esModule = true;
var communication_1 = require("../../bibliotheque/communication");
var tchat_1 = require("../commun/tchat");
var serveur_1 = require("../../bibliotheque/serveur");
var serveurVuesDynamiques_1 = require("../../bibliotheque/serveurVuesDynamiques");
var anneau = tchat_1.creerAnneauTchat(["titi", "toto", "coco", "sissi"]);
var reseauConnecte = new communication_1.TableNoeuds();
var connexions = {};
var hote = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
var port1 = 3000; // Ressource 1
var port2 = 1234; // Ressouce 2
function adresseConnexion(hote, port, id) {
    return hote + ":" + port + "/" + id;
}
function identifiantDansAdresse(ad) {
    return ad.pathname.slice(1);
}
// Vue dynamique (page paramétrée x.tchat -> x.html)
var serveurVues = new serveurVuesDynamiques_1.ServeurVuesDynamiques(hote, port1);
serveurVues.definirParametrisationVuesDynamique("tchat", ".", ["adresse", "centreNoeud", "voisinsNoeud", "saisieEnvoiMessages"]);
serveurVues.specifierRepertoireScriptsEmbarques("build");
serveurVues.enregistrerVueDynamique("/", function (i) {
    var id;
    // sélection d'un noeud
    for (id in anneau.noeuds()) {
        break;
    }
    // Cas où le réseau est vide
    if (id === undefined) {
        console.log("* " + (new Date()) + " - Connexion impossible d'un client : le réseau est complet.");
        i.servirContenuSimple("Tchat - Client - Réseau complet ! Il est impossible de se connecter : le réseau est déjà complet.");
        return;
    }
    // Cas où la sélection d'un noeud a réussi
    var n = anneau.noeud(id);
    var repCentreNoeud = n.centre().brut();
    var voisinsNoeud = n.voisinsEnJSON();
    var repVoisinsNoeud = JSON.stringify(voisinsNoeud);
    var contenuFormulaire = "";
    /*
    for (let idV in voisinsNoeud) {
        contenuFormulaire = contenuFormulaire + elementSaisieEnvoi("message_" + idV, "boutonEnvoi_" + idV,
            "Envoyer un message à " + n.voisin(idV).enJSON().pseudo + ".");
    }
    */
    var r = {
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
var serveurCanaux = new serveur_1.ServeurLiensWebSocket(port2, hote);
serveurCanaux.enregistrerTraitementConnexion(function (l) {
    var id = identifiantDansAdresse(l.url());
    if ((connexions[id] === undefined) && (reseauConnecte.possedeNoeud(id))) {
        console.log("* " + (new Date()) + " - Connexion de " + id + " par Web socket.");
        connexions[id] = l;
        return;
    }
    var msgErreur = "Connexion par Web socket impossible pour " + id + " : soit le noeud est déjà connecté soit il est inconnu.";
    console.log("* " + msgErreur);
    l.envoyerAuClientDestinataire(tchat_1.creerMessageErreurConnexion(id, msgErreur));
});
serveurCanaux.enregistrerTraitementMessages(function (l, m) {
    var msg = new tchat_1.MessageTchat(m);
    console.log("* Traitement d'un message");
    console.log("- brut : " + msg.brut());
    console.log("- net : " + msg.net());
    switch (m.type) {
        case tchat_1.TypeMessageTchat.COM:
            var emetteurUrl = identifiantDansAdresse(l.url());
            var emetteurMsg = m.emetteur;
            var destinataireMsg = m.destinataire;
            // Contrôle de l'émetteur et du destinataire
            if (emetteurUrl !== emetteurMsg) {
                var msgErreur_1 = "problème d'identité pour l'émetteur : le client utilisant l'adresse "
                    + serveur_1.adresse(l.url())
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
            lienDestinaire.envoyerAuClientDestinataire(tchat_1.creerMessageTransit(msg));
            lienEmetteur.envoyerAuClientDestinataire(tchat_1.creerMessageAR(msg));
            break;
        default:
            var msgErreur = "type de message non reconnu : le type doit être " + tchat_1.TypeMessageTchat.COM.toString() + " et non " + m.type + ".";
            console.log("- " + msgErreur);
            l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_TYPE, msgErreur));
            break;
    }
});
serveurCanaux.enregistrerTraitementFermeture(function (l) {
    var id = identifiantDansAdresse(l.url());
    if ((connexions[id] === undefined) || (!reseauConnecte.possedeNoeud(id))) {
        console.log("* Impossibilité de fermer la connexion par Web socket : " + id + " est déjà déconnecté.");
        connexions[id] = l;
        return;
    }
    console.log("* " + (new Date()) + " - Fermeture de la connexion par Web socket : " + id + " est maintenant déconnecté.");
    var n = reseauConnecte.noeud(id);
    reseauConnecte.retirerNoeud(n);
    delete connexions[id];
    anneau.ajouterNoeud(n);
});
serveurCanaux.demarrer();
//# sourceMappingURL=serveurChat.js.map