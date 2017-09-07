"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var communication_1 = require("./communication");
var CanalClient = (function () {
    function CanalClient(adresse) {
        this.adresse = adresse;
        this.lienServeur = new WebSocket('ws://' + this.adresse, 'echo-protocol');
    }
    ;
    // Effet : send(String)
    CanalClient.prototype.envoyerMessage = function (msg) {
        this.lienServeur.send(msg.enSerie());
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementAReception = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var msg = JSON.parse(e.data);
            traitement(new communication_1.Message(msg));
        });
    };
    ;
    return CanalClient;
}());
exports.CanalClient = CanalClient;
;
var Noeud = (function () {
    function Noeud(listeVoisins) {
        this._listeVoisins = listeVoisins.slice(0);
    }
    ;
    Noeud.prototype.nombreVoisins = function () {
        return this._listeVoisins.length;
    };
    ;
    Noeud.prototype.obtenirVoisin = function (i) {
        return this._listeVoisins[i];
    };
    ;
    return Noeud;
}());
exports.Noeud = Noeud;
;
//# sourceMappingURL=client.js.map