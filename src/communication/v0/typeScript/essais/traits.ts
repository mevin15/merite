import {
    composerTraits
} from "../bibliotheque/js/trait";

abstract class I {
    f() : void {
        console.log("coucou de f");
    }
}

abstract class J {
    g() : void {
        console.log("coucou de g");
    }
}

class C implements I, J {
    f: () => void;
    g : () => void;
}

composerTraits(C, [I, J]);

let c = new C();
c.f();
c.g();

