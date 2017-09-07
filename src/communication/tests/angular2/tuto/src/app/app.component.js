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
var noeud_service_1 = require("./noeud.service");
var AppComponent = (function () {
    function AppComponent(serviceNoeuds) {
        this.serviceNoeuds = serviceNoeuds;
        this.titre = 'Tchact via Angular';
    }
    AppComponent.prototype.getReseau = function () {
        var _this = this;
        this.serviceNoeuds.getNoeudsLentement().then(function (r) { _this.reseau = r; });
    };
    AppComponent.prototype.selectionner = function (n) {
        console.log("noeud : " + n.nom);
        this.noeudCourant = n;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getReseau();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'appli',
        styles: ["\n  .selected {\n    background-color: #CFD8DC !important;\n    color: white;\n  }\n  .reseau {\n    margin: 0 0 2em 0;\n    list-style-type: none;\n    padding: 0;\n    width: 15em;\n  }\n  .reseau li {\n    cursor: pointer;\n    position: relative;\n    left: 0;\n    background-color: #EEE;\n    margin: .5em;\n    padding: .3em 0;\n    height: 1.6em;\n    border-radius: 4px;\n  }\n  .reseau li.selected:hover {\n    background-color: #BBD8DC !important;\n    color: white;\n  }\n  .reseau li:hover {\n    color: #607D8B;\n    background-color: #DDD;\n    left: .1em;\n  }\n  .reseau .text {\n    position: relative;\n    top: -3px;\n  }\n  .reseau .badge {\n    display: inline-block;\n    font-size: small;\n    color: white;\n    padding: 0.8em 0.7em 0 0.7em;\n    background-color: #607D8B;\n    line-height: 1em;\n    position: relative;\n    left: -1px;\n    top: -4px;\n    height: 1.8em;\n    margin-right: .8em;\n    border-radius: 4px 0 0 4px;\n  }\n  "],
        template: "\n    <h1>{{titre}}</h1>\n    <h2>Le r\u00E9seau</h2>\n    <ul class=\"reseau\">\n      <li *ngFor=\"let n of reseau\" [class.selected]=\"n === noeudCourant\" (click)=\"selectionner(n)\">\n        <!-- chaque noeud du r\u00E9seau -->\n        <span class=\"badge\">{{n.id}}</span> {{n.nom}}\n      </li>\n    </ul>\n    <noeud [noeud]=\"noeudCourant\"></noeud>\n  ",
        providers: [noeud_service_1.NoeudService]
    }),
    __metadata("design:paramtypes", [noeud_service_1.NoeudService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map