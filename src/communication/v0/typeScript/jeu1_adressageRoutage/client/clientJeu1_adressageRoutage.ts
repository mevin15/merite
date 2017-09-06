import { 
    Identifiant,
    creerTableImmutable
 } from "../../bibliotheque/types";
import {
} from "../../bibliotheque/communication";
import {
    elementParId, recupererEntree, initialiserEntree, contenuBalise, poster, posterNL,
    gererEvenementDocument, gererEvenementElement,
    elementSaisieEnvoi, initialiserDocument
} from "../../bibliotheque/vueClient";
import { CanalClient, creerCanalClient } from "../../bibliotheque/client";
import {
    hote, port2,
    NoeudJeu1EX, creerNoeudJeu1EX,
    SommetJeu1, FormatSommetJeu1EX, creerSommetJeu1,
    FormatMessageJeu1EX, EtiquetteMessageJeu1, MessageJeu1,
    FormatConfigurationJeu1EX, EtiquetteConfigurationJeu1, creerConfigurationJeu1,
        decomposerConfiguration,        
    FormatErreurJeu1EX, EtiquetteErreurJeu1,
    ErreurJeu1, creerErreurJeu1,
    PopulationLocale, creerPopulationLocale, 
    Utilisateur, creerUtilisateur
} from '../commun/jeu1_adressageRoutage';


console.log("* Chargement du script");

const adresseServeur: string = hote + ":" + port2;

type CanalJeu1 = CanalClient<
    FormatErreurJeu1EX, 
    FormatConfigurationJeu1EX, 
    FormatMessageJeu1EX, FormatMessageJeu1EX, EtiquetteMessageJeu1>;

// A initialiser
var canal: CanalJeu1;
var noeud: NoeudJeu1EX;
var population : PopulationLocale;
var utilisateur : Utilisateur;



function envoyerMessage(texte: string, destinataire: Identifiant<'sommet'>) {
    /*
    let msg: MessageJeu1 = creerMessageCommunication(noeud.centre().enJSON().id, destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + representerMessage(msg));
    canal.envoyerMessage(msg);
    */
}

// A exécuter après chargement de la page
// - pas d'interruption de la fonction
function initialisation(): void {
    console.log("* Initialisation après chargement du DOM");

    console.log("- du canal de communication avec le serveur d'adresse " + adresseServeur);
    canal = creerCanalClient(adresseServeur);

    console.log("- du traitement des messages");
    canal.enregistrerTraitementMessageRecu((m: FormatMessageJeu1EX) => {
        /*let msg = new MessageTchat(m);
        console.log("* Réception");
        console.log("- du message brut : " + msg.brut());
        console.log("- du message net : " + representerMessage(msg));
        posterNL('logChats', representerMessage(msg));
        */
    });

    console.log("- du traitement de la configuration");
    canal.enregistrerTraitementConfigurationRecue((c: FormatConfigurationJeu1EX) => {
        let config = creerConfigurationJeu1(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.representation());
        console.log("* Initialisation du noeud du réseau");
        let decConfig = decomposerConfiguration(config);
        noeud = creerNoeudJeu1EX(decConfig[0]);
        population = creerPopulationLocale(decConfig[1]);
        utilisateur = creerUtilisateur(decConfig[2]);
        voir();
    });

    console.log("- du traitement d'une erreur rédhibitoire");
    canal.enregistrerTraitementErreurRecue((err: FormatErreurJeu1EX) => {
        let erreur = creerErreurJeu1(err);
        console.log("* Réception");
        console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
        console.log("- de l'erreur rédhibitoire nette : " + erreur.representation());
        console.log("* Initialisation du document");
        initialiserDocument(erreur.representation());
    });

}

function voir(): void {
    console.log("* Consolidation de la vue");
    console.log("- adresse, domaine, domaines voisins, utilisateur, autres utilisateurs du domaine");
    poster("adresseServeur", adresseServeur);
    poster("centre", creerSommetJeu1(noeud.ex().centre).representation());
    poster("voisins", creerTableImmutable(noeud.ex().voisins).representation());
    poster("utilisateur", utilisateur.representation());
    poster("utilisateursDomaine", population.representation());

    /*
    console.log("- formulaire");
    let voisinsNoeud = noeud.voisins();
    let contenuFormulaire = "";
    for (let idV in voisinsNoeud) {
        poster("formulaire", elementSaisieEnvoi("message_" + idV, "boutonEnvoi_" + idV,
            "Envoyer un message à " + representerSommet(voisinsNoeud[idV]) + "."));
    }
    let type = "click";
    for (const idV in voisinsNoeud) {
        console.log("- Element " + idV + " : enregistrement d'un gestionnaire pour l'événement " + type);
        gererEvenementElement("boutonEnvoi_" + idV, type, e => {
            let entree = recupererEntree("message_" + idV);
            initialiserEntree("message_" + idV, "");
            console.log("* Entree : " + entree);
            envoyerMessage(entree, ID(idV));
        });
    }
    */
    /*
      <input type="text" id="message_id1"> 
      <input class="button" type="button" id="boutonEnvoi_id1" value="Envoyer un message à {{nom id1}}."
         onClick="envoyerMessage(this.form.message.value, "id1")">
    */

}

// Gestion des événements pour le document
console.log("* Enregistrement de l'initialisation au chargement");
gererEvenementDocument('DOMContentLoaded', initialisation);
/*
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', initialisation());
</script>

*/


