"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../bibliotheque/types");
exports.x = 2;
console.log(exports.x.toString());
var y = { a: 3, b: "vv" };
// impossible de définir une projection simplement à partir des types IN et OUT.
var z = undefined;
var e = { b: "coco", mutable: types_1.Unite.ZERO };
var l = e;
//l.b = "zaza"; // impossible !
l = { b: "zaza" };
//l.b = "coco"; // impossible !
// e = l; // erreur captée grâce au champ mutable
e.b = "coco";
console.log("coco ? " + l.b);
// let x1 : string = undefined; // interdit par l'option du compilateur "strictNullChecks": true
//let x1 : any = "coco"; // Problème de typage ! repéré grâce à tslint
//let y1 : number = x1; 
//# sourceMappingURL=conversions.js.map