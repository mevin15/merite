"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var liste_noeuds_1 = require("./liste-noeuds");
var NoeudService = (function () {
    function NoeudService() {
    }
    NoeudService.prototype.getNoeuds = function () {
        return Promise.resolve(liste_noeuds_1.RESEAU);
    };
    NoeudService.prototype.getNoeudsLentement = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 2 second delay
            setTimeout(function () { return resolve(_this.getNoeuds()); }, 2000);
        });
    };
    return NoeudService;
}());
NoeudService = __decorate([
    core_1.Injectable()
], NoeudService);
exports.NoeudService = NoeudService;
//# sourceMappingURL=noeud.service.js.map