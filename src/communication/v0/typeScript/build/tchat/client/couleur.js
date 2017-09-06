"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLEU_TURQUIN = "rgb(66, 91, 138)";
exports.BLANC = "rgb(255, 255, 255)";
exports.NOIR = "rgb(0,0,0)";
exports.FOND_NOIR = "rgb(17, 17, 17)";
exports.GRIS_NOIR = "rgb(50, 50, 50)";
exports.ROUGE = "rgb(255, 0, 0)";
exports.JAUNE = "rgb(225, 225, 0)";
exports.VIOLET = "rgb(128, 0, 128)";
exports.BLEU_CANARD = "rgb(0, 128, 128)";
exports.BLEU_CIEL = "rgb(119, 181, 254)";
exports.VERT = "rgb(0, 225, 0)";
exports.GRIS = "rgb(135, 135, 135)";
exports.GRIS_CLAIR = "rgb(229, 229, 229)";
exports.TOUS = exports.GRIS;
exports.FOND = exports.GRIS_CLAIR;
exports.COULEUR_SEPARATION = exports.BLEU_CIEL;
exports.OMBRE_RECEPTION = exports.TOUS;
exports.OMBRE_EMISSION = exports.ROUGE;
var SuiteCouplesFondEncre = (function () {
    function SuiteCouplesFondEncre() {
        this.fonds = [exports.JAUNE, exports.BLEU_CANARD, exports.VIOLET, exports.VERT]; /* TODO etendre ! */
        this.encres = [exports.NOIR, exports.BLANC, exports.BLANC, exports.NOIR]; /* TODO etendre ! */
        this.pos = 0;
    }
    SuiteCouplesFondEncre.prototype.courant = function () {
        var r = { fond: this.fonds[this.pos], encre: this.encres[this.pos] };
        this.pos = (this.pos + 1) % (this.encres.length);
        return r;
    };
    return SuiteCouplesFondEncre;
}());
exports.SuiteCouplesFondEncre = SuiteCouplesFondEncre;
exports.COUPLE_FOND_ENCRE = {
    fond: exports.ROUGE,
    encre: exports.BLANC
};
//# sourceMappingURL=couleur.js.map