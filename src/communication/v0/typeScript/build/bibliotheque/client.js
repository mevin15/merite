"use strict";
exports.__esModule = true;
var CanalClient = (function () {
    function CanalClient(adresse) {
        this.adresse = adresse;
        this.lienServeur = new WebSocket('ws://' + this.adresse, 'echo-protocol');
    }
    ;
    // Effet : send(String)
    CanalClient.prototype.envoyerMessage = function (msg) {
        this.lienServeur.send(msg.brut());
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementAReception = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var msg = JSON.parse(e.data);
            traitement(msg);
        });
    };
    ;
    return CanalClient;
}());
exports.CanalClient = CanalClient;
;
//# sourceMappingURL=client.js.map