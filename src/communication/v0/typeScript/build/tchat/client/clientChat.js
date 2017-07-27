"use strict";
exports.__esModule = true;
var vueClient_1 = require("../../bibliotheque/vueClient");
console.log("* Chargement du script");
/* Test - déclaration d'une variable externe - Possible
cf. declare
*/
function centreNoeud() {
    return JSON.parse(vueClient_1.contenuBalise(document, 'centre'));
}
function voisinsNoeud() {
    var v = JSON.parse(vueClient_1.contenuBalise(document, 'voisins'));
    var r = [];
    var id;
    for (id in v) {
        r.push(v[id]);
    }
    return r;
}
function adresseServeur() {
    return vueClient_1.contenuBalise(document, 'adresseServeur');
}
/*
type CanalChat = CanalClient<FormatMessageTchat>;

// A initialiser
var canal: CanalChat;
var noeud: Noeud<FormatSommetTchat>;


function envoyerMessage(texte: string, destinataire: Identifiant) {
    let msg: MessageTchat = creerMessageCommunication(noeud.centre().enJSON().id, destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + msg.net());
    canal.envoyerMessage(msg);
    initialiserEntree('message_' + destinataire, "");
}

// A exécuter après chargement de la page
function initialisation(): void {
    console.log("* Initialisation après chargement du DOM ...")
    noeud = creerNoeud<FormatSommetTchat>(centreNoeud(), voisinsNoeud(), creerSommetTchat);
    canal = new CanalClient<FormatMessageTchat>(adresseServeur());

    canal.enregistrerTraitementAReception((m: FormatMessageTchat) => {
        let msg = new MessageTchat(m);
        console.log("- Réception du message brut : " + msg.brut());
        console.log("- Réception du message net : " + msg.net());
        posterNL('logChats', msg.net());
    });

    console.log("* ... du noeud et du canal côté client en liaison avec le serveur : " + adresseServeur());

    // Gestion des événements pour les éléments du document.
    //document.getElementById("boutonEnvoi").addEventListener("click", <EventListenerOrEventListenerObject>(e => {alert("click!");}), true);
    let id: Identifiant;
    let v = noeud.voisins();
    for (id in v) {
        console.log("id : " +id);
        let idVal = id;
        gererEvenementElement("boutonEnvoi_" + idVal, "click", e => {
            console.log("id message_" + idVal);
            console.log("entree : " + recupererEntree("message_" + idVal));
            envoyerMessage(recupererEntree("message_" + idVal), idVal);
        });
    }

    
    <form id="envoi">
    
      <input type="text" id="message_id1">
          
      <input class="button" type="button" id="boutonEnvoi_id1" value="Envoyer un message à {{nom id1}}."
         onClick="envoyerMessage(this.form.message.value, "id1")">
    </form>
        
    
    console.log("* ... et des gestionnaires d'événements sur des éléments du document.");


}

// Gestion des événements pour le document
console.log("* Enregistrement de l'initialisation");
gererEvenementDocument('DOMContentLoaded', initialisation);

<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', initialisation());
</script>



*/
//# sourceMappingURL=clientChat.js.map