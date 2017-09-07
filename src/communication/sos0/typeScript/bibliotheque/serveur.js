"use strict";
exports.__esModule = true;
// Un module commençant par un import
var http = require("http");
var websocket = require("websocket");
var communication_1 = require("./communication");
var ServeurLienWebSocket = (function () {
    function ServeurLienWebSocket(port, traitement) {
        var _this = this;
        this.port = port;
        this.total = 0;
        this.lienClients = [];
        this.traitement = function (m) { return traitement(_this, m); };
    }
    ServeurLienWebSocket.prototype.demarrer = function () {
        var serveurHTTP = http.createServer(function (requete, reponse) { });
        var celuiCi = this;
        var p = this.port;
        serveurHTTP.listen(p, function () {
            console.log((new Date()) + " Le serveur écoute le port " + p + ".");
        });
        var serveurWS = new websocket.server({
            httpServer: serveurHTTP
        });
        serveurWS.on('request', function (r) {
            var connexion = r.accept('echo-protocol', r.origin);
            var id = celuiCi.total++;
            celuiCi.lienClients[id] = connexion;
            console.log((new Date()) + " Connexion acceptée [" + id + "]");
            // Applique le traitement après conversion au bon format de chaque message
            connexion.on('message', function (message) {
                var msg = JSON.parse(message.utf8Data);
                celuiCi.traitement(new communication_1.Message(msg));
            });
            // Supprime l'utilisateur en cas de fermeture
            connexion.on('close', function (raison, description) {
                delete celuiCi.lienClients[id];
                console.log((new Date()) + " Client " + id + " à l'adresse " + connexion.remoteAddress + " déconnecté.");
            });
        });
    };
    ServeurLienWebSocket.prototype.diffuser = function (m) {
        for (var i in this.lienClients) {
            console.log("Diffusion de : " + m.enSerie());
            this.lienClients[i].sendUTF(m.enSerie);
        }
    };
    return ServeurLienWebSocket;
}());
exports.ServeurLienWebSocket = ServeurLienWebSocket;
