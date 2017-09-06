import { Mutable, Unite } from "../bibliotheque/types"

export let x : number = 2;

console.log(x.toString());

interface IN {
    a: number;
    b: string;
}

interface OUT {
    a: number;
}

let y : IN = { a : 3, b : "vv"}

// impossible de définir une projection simplement à partir des types IN et OUT.

let z : undefined = undefined;

interface E extends Mutable {
    b : string;
}

interface L {
    readonly b : string;
}

let e : E = {  b : "coco", mutable : Unite.ZERO};
let l : L = e;
//l.b = "zaza"; // impossible !
l = { b : "zaza"};
//l.b = "coco"; // impossible !
// e = l; // erreur captée grâce au champ mutable
e.b = "coco";
console.log("coco ? " + l.b);

// let x1 : string = undefined; // interdit par l'option du compilateur "strictNullChecks": true

//let x1 : any = "coco"; // Problème de typage ! repéré grâce à tslint
//let y1 : number = x1;