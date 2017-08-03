"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var shell = require("shelljs");
var types_1 = require("../../bibliotheque/types");
var communication_1 = require("../../bibliotheque/communication");
var tchat_1 = require("../commun/tchat");
var serveurConnexions_1 = require("../../bibliotheque/serveurConnexions");
var serveurApplications_1 = require("../../bibliotheque/serveurApplications");
var outils_1 = require("../../bibliotheque/outils");
var ServeurTchat = (function (_super) {
    __extends(ServeurTchat, _super);
    function ServeurTchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServeurTchat;
}(serveurConnexions_1.ServeurLiensWebSocket));
var LienTchat = (function (_super) {
    __extends(LienTchat, _super);
    function LienTchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LienTchat;
}(serveurConnexions_1.LienWebSocket));
/*class TableConnexions extends TableIdentification<'sommet', LienTchat, LienTchat> {
    constructor(etat : FormatTableIN<LienTchat>){
        super((x) => x, etat);
    }
}
*/
var anneau = tchat_1.creerAnneauTchat(["titi", "toto", "coco", "sissi"]);
var reseauConnecte = communication_1.creerReseauVide();
var connexions = types_1.creerTableIdentificationVide(function (x) { return x; });
var repertoireHtml = shell.pwd() + "/build";
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
var serveurCanaux = new ServeurTchat(tchat_1.port2, tchat_1.hote);
serveurCanaux.enregistrerTraitementConnexion(function (l) {
    var ID_sommet = anneau.selectionCle();
    if (ID_sommet === undefined) {
        var d_1 = new Date();
        console.log("* " + outils_1.dateFrLog(d_1) + " - Connexion impossible d'un client : le réseau est complet.");
        l.envoyerMessageErreur(tchat_1.composerErreurTchat("Tchat - Réseau complet ! Il est impossible de se connecter : le réseau est complet.", d_1));
        return false;
    }
    if ((connexions.valeur(ID_sommet) !== undefined) || (reseauConnecte.possedeNoeud(ID_sommet))) {
        var d_2 = new Date();
        console.log("* " + outils_1.dateFrLog(d_2) + " - Connexion impossible d'un client : le réseau est corrompu.");
        l.envoyerMessageErreur(tchat_1.composerErreurTchat("Tchat - Réseau corrompu ! Il est impossible de se connecter : le réseau est corrompu. Contacter l'administrateur.", d_2));
        return false;
    }
    // Cas où la sélection d'un noeud a réussi
    var d = new Date();
    console.log("* " + outils_1.dateFrLog(d) + " - Connexion de " + ID_sommet.sommet + " par Web socket.");
    connexions.ajouter(ID_sommet, l);
    var n = anneau.valeur(ID_sommet);
    var config = tchat_1.composerConfigurationJeu1(n, d);
    console.log("- envoi au client d'adresse " + l.adresseClient());
    console.log("  - de la configuration brute " + config.brut());
    console.log("  - de la configuration nette " + config.representer());
    l.envoyerConfiguration(config);
    anneau.retirerNoeud(n);
    reseauConnecte.ajouterNoeud(n);
    return true;
});
serveurCanaux.enregistrerTraitementMessages(function (l, m) {
    var msg = new tchat_1.MessageTchat(m);
    console.log("* Traitement d'un message");
    console.log("- brut : " + msg.brut());
    console.log("- net : " + msg.representer());
    switch (m.type) {
        case tchat_1.TypeMessageTchat.COM:
            var ID_emetteurUrl = l.configuration().ex().centre.ID;
            var ID_emetteurMsg = m.ID_emetteur;
            var ID_destinataireMsg = m.ID_destinataire;
            // Contrôle de l'émetteur et du destinataire
            if (!(ID_emetteurUrl.sommet === ID_emetteurMsg.sommet)) {
                var msgErreur_1 = "problème d'identité pour l'émetteur : le client utilisant l'adresse "
                    + l.adresseClient()
                    + " devrait signer ses messages " + ID_emetteurUrl + " et non " + ID_emetteurMsg + ".";
                console.log("- " + msgErreur_1);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_EMET, msgErreur_1));
                break;
            }
            if (connexions.valeur(ID_emetteurMsg) === undefined) {
                var msgErreur_2 = "problème de Web socket : la connexion n'est plus active. Fermer l'onglet et se reconnecter.";
                console.log("- " + msgErreur_2);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_EMET, msgErreur_2));
                break;
            }
            if (connexions.valeur(ID_destinataireMsg) === undefined) {
                var msgErreur_3 = "destinataire inconnu ou non connecté. Attendre sa connexion ou essayer un autre destinataire.";
                console.log("- " + msgErreur_3);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.ERREUR_DEST, msgErreur_3));
                break;
            }
            // Contrôle des communications 
            if (!reseauConnecte.sontVoisins(ID_emetteurMsg, ID_destinataireMsg)) {
                var msgErreur_4 = "communication interdite : le noeud émetteur "
                    + ID_emetteurMsg.sommet
                    + " n'est pas vosin du noeud destinataire " + ID_destinataireMsg.sommet + ".";
                console.log("- " + msgErreur_4);
                l.envoyerAuClientDestinataire(tchat_1.creerMessageRetourErreur(msg, tchat_1.TypeMessageTchat.INTERDICTION, msgErreur_4));
            }
            // Fonctionnement normal
            var lienDestinaire = connexions.valeur(ID_destinataireMsg);
            var lienEmetteur = connexions.valeur(ID_emetteurMsg);
            var msgTransit = msg.transit();
            console.log("- Envoi en transit au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgTransit.brut());
            console.log("  - du message net : " + msgTransit.representer());
            lienDestinaire.envoyerAuClientDestinataire(msgTransit);
            var msgAR = msg.avecAccuseReception();
            console.log("- Envoi en accusé de réception au client utilisant l'adresse " + lienDestinaire.adresseClient());
            console.log("  - du message brut : " + msgAR.brut());
            console.log("  - du message net : " + msgAR.representer());
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
    var ID_centre = l.configuration().ex().centre.ID;
    if ((connexions.valeur(ID_centre) === undefined) || (!reseauConnecte.possedeNoeud(ID_centre))) {
        console.log("* Impossibilité de fermer la connexion par Web socket : " + ID_centre.sommet + " est déjà déconnecté.");
        connexions.ajouter(ID_centre, l);
        return;
    }
    console.log(" * " + outils_1.dateFrLog(new Date())
        + " - Déconnexion du client " + ID_centre.sommet
        + " utilisant l'adresse " + l.adresseClient() + ".");
    console.log("- identité : " + l.configuration().ex().centre.ID);
    console.log("- raison : " + r + " ; description : " + desc);
    var n = reseauConnecte.valeur(ID_centre);
    reseauConnecte.retirerNoeud(n);
    connexions.retirer(ID_centre);
    anneau.ajouterNoeud(n);
});
serveurCanaux.demarrer();
//# sourceMappingURL=serveurTchat.js.map