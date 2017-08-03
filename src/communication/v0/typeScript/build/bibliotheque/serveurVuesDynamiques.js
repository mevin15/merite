"use strict";
// obsolète
exports.__esModule = true;
var express = require("express");
var sysFichier = require("fs");
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
    Interaction.prototype.servirVueDynamiquement = function (prefixe, remplacement) {
        this._reponse.render(prefixe, remplacement);
    };
    Interaction.prototype.servirContenuSimple = function (contenu) {
        this._reponse.send(contenu);
    };
    return Interaction;
}());
exports.Interaction = Interaction;
var ServeurVuesDynamiques = (function () {
    function ServeurVuesDynamiques(hote, port) {
        this.appli = express();
        this.hote = hote;
        this.port = port;
    }
    ServeurVuesDynamiques.prototype.demarrer = function () {
        var _this = this;
        var ceServeur = this;
        this.appli.listen(this.port, this.hote, function () {
            console.log("* " + (new Date()) + " - Le serveur écoute le port " + _this.port + " de l'hôte " + _this.hote + ".");
        });
    };
    /*
    Les pages se terminant par suffixe sont paramétrées.
    Attention : le typage de la paramétrisation n'est pas vérifié.
    */
    ServeurVuesDynamiques.prototype.definirParametrisationVuesDynamique = function (suffixe, rep, cles) {
        this.appli.engine(suffixe, function (chemin, remplacement, continuation) {
            sysFichier.readFile(chemin, function (err, contenu) {
                if (err)
                    return continuation(err);
                var rendu = contenu.toString();
                cles.forEach(function (c, i, tab) {
                    rendu = rendu.replace("#" + c + "#", remplacement[c]);
                });
                return continuation(null, rendu);
            });
        });
        this.appli.set('view engine', suffixe); // enregistre la paramétrisation
        this.appli.set('views', rep); // spécifie le répertoire des vues dynamiques
    };
    ServeurVuesDynamiques.prototype.specifierRepertoireScriptsEmbarques = function (rep) {
        this.appli.use(express.static(rep)); // répertoire local visible
    };
    ServeurVuesDynamiques.prototype.enregistrerVueDynamique = function (chemin, calculDynamique) {
        this.appli.get(chemin, function (requete, reponse, suite) {
            calculDynamique(new Interaction(requete, reponse, suite));
        });
    };
    return ServeurVuesDynamiques;
}());
exports.ServeurVuesDynamiques = ServeurVuesDynamiques;
//# sourceMappingURL=serveurVuesDynamiques.js.map