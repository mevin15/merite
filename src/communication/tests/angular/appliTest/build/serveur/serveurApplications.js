"use strict";
exports.__esModule = true;
var express = require("express");
/*
Serveur utilisant Express
http://expressjs.com/en/api.html
*/
/*
Classe à développer
*/
var Interaction = (function () {
    function Interaction(requete, reponse, suite) {
        this._requete = requete;
        this._reponse = reponse;
        this._suite = suite;
    }
    Interaction.prototype.servirVue = function (prefixe) {
        this._reponse.render(prefixe);
    };
    Interaction.prototype.servirContenuSimple = function (contenu) {
        this._reponse.send(contenu);
    };
    Interaction.prototype.servirContenuJSON = function (contenu) {
        this._reponse.json(contenu);
    };
    return Interaction;
}());
exports.Interaction = Interaction;
var ServeurApplications = (function () {
    function ServeurApplications(hote, port) {
        this.appli = express();
        this.hote = hote;
        this.port = port;
    }
    ServeurApplications.prototype.demarrer = function () {
        var _this = this;
        var ceServeur = this;
        this.appli.listen(this.port, this.hote, function () {
            console.log("* " + (new Date()) + " - Le serveur écoute le port " + _this.port + " de l'hôte " + _this.hote + ".");
        });
    };
    ServeurApplications.prototype.specifierRepertoireScriptsEmbarques = function (rep) {
        this.appli.use(express.static(rep)); // répertoire local visible
    };
    ServeurApplications.prototype.enregistrerReponseRequeteGET = function (chemin, calcul) {
        this.appli.get(chemin, function (requete, reponse, suite) {
            calcul(new Interaction(requete, reponse, suite));
        });
    };
    ServeurApplications.prototype.enregistrerReponseRequetePOST = function (chemin, calcul) {
        this.appli.post(chemin, function (requete, reponse, suite) {
            calcul(new Interaction(requete, reponse, suite));
        });
    };
    return ServeurApplications;
}());
exports.ServeurApplications = ServeurApplications;
//# sourceMappingURL=serveurApplications.js.map