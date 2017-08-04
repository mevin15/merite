import { creerTableImmutable, Identifiant } from "../../bibliotheque/types";
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
    NoeudTchatEX, creerNoeudTchatEX,
    SommetTchat, creerSommetTchat,
    creerMessageCommunication,
    TypeMessageTchat, FormatMessageTchatEX, EtiquetteMessageTchat, MessageTchat,
    FormatConfigurationTchatEX, EtiquetteConfigurationTchat,
    ConfigurationTchat, creerConfigurationTchat,
    FormatErreurTchatEX, EtiquetteErreurTchat,
    ErreurTchat, creerErreurTchat,
    decomposerConfiguration
} from '../commun/tchat';
import { dateFr } from "../../bibliotheque/outils"


console.log("* Chargement du script");

const adresseServeur: string = hote + ":" + port2;

type CanalTchat
    = CanalClient<
    FormatErreurTchatEX,
    FormatConfigurationTchatEX,
    FormatMessageTchatEX, FormatMessageTchatEX, EtiquetteMessageTchat>;

// A initialiser
var canal: CanalTchat;
var noeud: NoeudTchatEX;


function envoyerMessage(texte: string, ID_destinataire: Identifiant<'sommet'>) {
    let msg: MessageTchat = creerMessageCommunication(noeud.ex().centre.ID, ID_destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + msg.representer());
    canal.envoyerMessage(msg);
}

// A exécuter après chargement de la page
// - pas d'interruption de la fonction
function initialisation(): void {
    console.log("* Initialisation après chargement du DOM");

    console.log("- du canal de communication avec le serveur d'adresse " + adresseServeur);
    canal = creerCanalClient(adresseServeur);

    console.log("- du traitement des messages");
    canal.enregistrerTraitementMessageRecu((m: FormatMessageTchatEX) => {
        let msg = new MessageTchat(m);
        console.log("* Réception");
        console.log("- du message brut : " + msg.brut());
        console.log("- du message net : " + msg.representer());
        posterNL('logChats', msg.representer());
    });

    console.log("- du traitement de la configuration");
    canal.enregistrerTraitementConfigurationRecue((c: FormatConfigurationTchatEX) => {
        let config = creerConfigurationTchat(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.representer());
        console.log("* Initialisation du noeud du réseau");
        noeud = creerNoeudTchatEX(decomposerConfiguration(config));
        voir();

    });

    console.log("- du traitement d'une erreur rédhibitoire");
    canal.enregistrerTraitementErreurRecue((err: FormatErreurTchatEX) => {
        let erreur = creerErreurTchat(err);
        console.log("* Réception");
        console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
        console.log("- de l'erreur rédhibitoire nette : " + erreur.representer());
        console.log("* Initialisation du document");
        initialiserDocument(erreur.representer());
    });

}

function voir(): void {
    console.log("* Consolidation de la vue");
    console.log("- adresse, centre, voisins");
    poster("adresseServeur", adresseServeur);
    poster("centre", creerSommetTchat(noeud.ex().centre).representer());
    poster("voisins", creerTableImmutable(noeud.ex().voisins).representer());

    console.log("- formulaire");
    let contenuFormulaire = "";
    noeud.foncteurProceduralSurVoisins(v => {
        let ID_v = v.ID;
        poster("formulaire", elementSaisieEnvoi("message_" + ID_v.val, "boutonEnvoi_" + ID_v.val,
            "Envoyer un message à " + creerSommetTchat(v).representer() + "."));
    }
    );
    let type = "click";
    noeud.foncteurProceduralSurVoisins(v => {
        let ID_v = v.ID;
        console.log("- Element " + ID_v.val + " : enregistrement d'un gestionnaire pour l'événement " + type);
        gererEvenementElement("boutonEnvoi_" + ID_v.val, type, e => {
            let entree = recupererEntree("message_" + ID_v.val);
            initialiserEntree("message_" + ID_v.val, "");
            console.log("* Entree : " + entree);
            envoyerMessage(entree, ID_v);
        });
    });
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


