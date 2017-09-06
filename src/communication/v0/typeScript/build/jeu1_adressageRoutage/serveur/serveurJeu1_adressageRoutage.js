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
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
var types_1 = require("../../bibliotheque/types");
var binaire_1 = require("../../bibliotheque/binaire");
var serveurConnexions_1 = require("../../bibliotheque/serveurConnexions");
var serveurApplications_1 = require("../../bibliotheque/serveurApplications");
var jeu1_adressageRoutage_1 = require("../commun/jeu1_adressageRoutage");
var ServeurJeu1 = (function (_super) {
    __extends(ServeurJeu1, _super);
    function ServeurJeu1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServeurJeu1;
}(serveurConnexions_1.ServeurLiensWebSocket));
var LienJeu1 = (function (_super) {
    __extends(LienJeu1, _super);
    function LienJeu1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LienJeu1;
}(serveurConnexions_1.LienWebSocket));
var anneau = jeu1_adressageRoutage_1.creerAnneauJeu1([binaire_1.binaire(0), binaire_1.binaire(1), binaire_1.binaire(2), binaire_1.binaire(3)]);
//const reseauConnecte: TableNoeudsJeu1 = creerTableVideNoeuds();
var utilisateursParDomaine = jeu1_adressageRoutage_1.assemblerPopulationParDomaine(anneau, [binaire_1.binaire(0), binaire_1.binaire(1)]);
var utilisateursConnectesParDomaine = jeu1_adressageRoutage_1.assemblerPopulationParDomaine(anneau, []);
var connexions = types_1.creerTableIdentificationVide('utilisateur', function (x) { return x; });
var repertoireHtml = shell.pwd() + "/build";
var serveurAppli = new serveurApplications_1.ServeurApplications(jeu1_adressageRoutage_1.hote, jeu1_adressageRoutage_1.port1);
serveurAppli.specifierRepertoireScriptsEmbarques("build");
{
    var racine_1 = "/";
    var ressource_1 = "clientJeu1.html";
    serveurAppli.enregistrerReponseARequeteGET(racine_1, function (i) {
        var d = types_1.creerDateMaintenant();
        console.log("* " + d.representationLog() + " - Service de " + ressource_1 + " en " + racine_1);
        i.servirFichier(repertoireHtml, ressource_1);
    });
}
serveurAppli.demarrer();
var serveurCanaux = new ServeurJeu1(jeu1_adressageRoutage_1.port2, jeu1_adressageRoutage_1.hote);
serveurCanaux.enregistrerTraitementConnexion(function (l) {
    var ids;
    try {
        ids = utilisateursParDomaine.selectionnerUtilisateur();
    }
    catch (e) {
        var d_1 = types_1.creerDateMaintenant();
        console.log("* " + d_1.representationLog() + " - " + e.message);
        console.log("* " + d_1.representationLog() + " - Connexion impossible d'un client : le réseau est complet.");
        l.envoyerMessageErreur(jeu1_adressageRoutage_1.composerErreurJeu1("Jeu 1 (adressage - routage) - Il est impossible de se connecter : le réseau est déjà complet.", d_1.ex()));
        return false;
    }
    var ID_dom = ids[0];
    var ID_util = ids[1];
    if (connexions.contient(ID_util)
        || utilisateursConnectesParDomaine.contientUtilisateur(ID_dom, ID_util)) {
        var d_2 = types_1.creerDateMaintenant();
        console.log("* " + d_2.representationLog() + " - Connexion impossible d'un client : le réseau est corrompu.");
        l.envoyerMessageErreur(jeu1_adressageRoutage_1.composerErreurJeu1("Jeu 1 (adressage - routage) - Réseau corrompu ! Il est impossible de se connecter : le réseau est corrompu. Contacter l'administrateur.", d_2.ex()));
        return false;
    }
    // Cas où la sélection d'un utilisateur est réussie
    var d = types_1.creerDateMaintenant();
    console.log("* " + d.representationLog()
        + " - Connexion de l'utilisateur " + ID_util.val
        + " du domaine " + ID_dom.val + " par Web socket.");
    connexions.ajouter(ID_util, l);
    var n = anneau.noeud(ID_dom);
    var pop = utilisateursParDomaine.valeur(ID_dom);
    var u = utilisateursParDomaine.utilisateur(ID_dom, ID_util);
    var config = jeu1_adressageRoutage_1.composerConfigurationJeu1(n, pop, u, d.ex());
    console.log("- envoi au client d'adresse " + l.adresseClient());
    console.log("  - de la configuration brute " + config.brut());
    console.log("  - de la configuration nette " + config.representation());
    l.envoyerConfiguration(config);
    utilisateursConnectesParDomaine.ajouterUtilisateur(ID_dom, u);
    utilisateursParDomaine.retirerUtilisateur(ID_dom, ID_util);
    return true;
});
serveurCanaux.enregistrerTraitementMessages(function (l, m) {
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
serveurCanaux.enregistrerTraitementFermeture(function (l, r, desc) {
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
//# sourceMappingURL=serveurJeu1_adressageRoutage.js.map