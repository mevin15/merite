"use strict";
// obsolète - cf. serveurConnexions
exports.__esModule = true;
// Un module commençant par un import
var http = require("http");
var websocket = require("websocket");
function adresse(u) {
    return u.href; // TODO incomplet avec 127.0.0.1 réolu en merite graĉe à /etc/hosts
}
exports.adresse = adresse;
var LienWebSocket = (function () {
    function LienWebSocket(r) {
        this._connexion = r.accept('echo-protocol', r.origin);
        this._url = r.resourceURL;
        /* TODO
        console.log("url socket : " + r.resource);
        console.log("url socket : " + r.httpRequest.url);
        console.log("- auth: " + this._url.auth);
        console.log("- hostname: " + this._url.hostname);
        console.log("- port: " + this._url.port);
        console.log("- protocol : " + this._url.protocol);
        console.log("- search: " + this._url.search);
        console.log("- href: " + this._url.href);
        console.log("- path: " + this._url.path);
        console.log("- pathname: " + this._url.pathname);
        */
    }
    LienWebSocket.prototype.url = function () {
        return this._url;
    };
    LienWebSocket.prototype.enregistrerTraitementMessages = function (traitementMessages) {
        var ceLien = this;
        this._connexion.on('message', function (message) {
            console.log("* Réception par Web socket d'un message");
            console.log("- adresse : " + adresse(ceLien.url()));
            console.log("- message brut : " + message.utf8Data.toString());
            var msg = JSON.parse(message.utf8Data.toString());
            console.log("- parsing : " + JSON.stringify(msg));
            traitementMessages(ceLien, msg);
        });
        console.log("- Enregistrement du traitement des messages.");
    };
    LienWebSocket.prototype.enregistrerTraitementFermeture = function (traitementFermeture) {
        var _this = this;
        var ceLien = this;
        this._connexion.on('close', function (raison, description) {
            traitementFermeture(ceLien);
            console.log("- Déconnexion du client utilisant l'adresse " + adresse(_this.url()) + ".");
            console.log("- raison : " + raison + " ; description : " + description);
        });
        console.log("- Enregistrement du traitement de la fermeture de la connexion par Web socket.");
    };
    LienWebSocket.prototype.envoyerAuClientDestinataire = function (m) {
        console.log("- Envoi au client utilisant l'adresse " + adresse(this.url()));
        console.log("  - du message brut : " + m.brut());
        console.log("  - du message net : " + m.net());
        this._connexion.sendUTF(m.brut());
    };
    return LienWebSocket;
}());
exports.LienWebSocket = LienWebSocket;
var ServeurLiensWebSocket = (function () {
    function ServeurLiensWebSocket(port, hote) {
        this.port = port;
        this.hote = hote;
    }
    ServeurLiensWebSocket.prototype.enregistrerTraitementConnexion = function (traitementConnexion) {
        this.traiterConnexion = traitementConnexion;
    };
    ServeurLiensWebSocket.prototype.enregistrerTraitementFermeture = function (traitementFermeture) {
        this.traiterFermeture = traitementFermeture;
    };
    ServeurLiensWebSocket.prototype.enregistrerTraitementMessages = function (traitementMessages) {
        this.traiterMessages = traitementMessages;
    };
    ServeurLiensWebSocket.prototype.demarrer = function () {
        var serveurHTTP = http.createServer(function (requete, reponse) { });
        var ceServeur = this;
        var p = this.port;
        var h = this.hote;
        serveurHTTP.listen(p, h, function () {
            console.log("* " + (new Date()) + " - Le serveur écoute le port " + p + " de l'hôte " + h + ".");
        });
        var serveurWS = new websocket.server({
            httpServer: serveurHTTP
        });
        serveurWS.on('request', function (r) {
            var l = new LienWebSocket(r);
            ceServeur.traiterConnexion(l);
            // Applique le traitement après conversion au bon format de chaque message
            l.enregistrerTraitementMessages(ceServeur.traiterMessages);
            // Réagit à la fermeture de la connexion
            l.enregistrerTraitementFermeture(ceServeur.traiterFermeture);
        });
    };
    return ServeurLiensWebSocket;
}());
exports.ServeurLiensWebSocket = ServeurLiensWebSocket;
//# sourceMappingURL=serveur.js.map