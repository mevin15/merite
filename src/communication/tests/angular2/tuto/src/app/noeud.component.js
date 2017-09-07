"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var noeud_1 = require("./noeud");
var NoeudComponent = (function () {
    function NoeudComponent() {
    }
    return NoeudComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", noeud_1.Noeud)
], NoeudComponent.prototype, "noeud", void 0);
NoeudComponent = __decorate([
    core_1.Component({
        selector: 'noeud',
        template: "\n  <div *ngIf=\"noeud\">\n    <h2>{{noeud.nom}}</h2>\n    <div><label>id: </label>{{noeud.id}}</div>\n    <div>\n      <label>nom: </label>\n      <input [(ngModel)]=\"noeud.nom\" placeholder=\"nom\">\n    </div>\n    </div>\n    <div *ngIf=\"!noeud\">\n    <h2>Noeud non initialis\u00E9</h2>\n    </div>"
    })
], NoeudComponent);
exports.NoeudComponent = NoeudComponent;
//# sourceMappingURL=noeud.component.js.map