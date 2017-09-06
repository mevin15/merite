export type Couleur = 
    "rgb(153,180, 153)" | "rgb(209,138, 138)"
    | "rgb(255, 255, 255)" | "rgb(0,0,0)" | "rgb(255, 0, 0)"
    | "rgb(225, 225, 0)" | "rgb(128, 0, 128)" | "rgb(0, 128, 128)"
    | "rgb(0, 225, 0)" | "rgb(135, 135, 135)" | "rgb(50, 50, 50)"
    | "rgb(17, 17, 17)" | "rgb(229, 229, 229)" | "rgb(119, 181, 254)"
    | "rgb(66, 91, 138)";

export const BLEU_TURQUIN : Couleur = "rgb(66, 91, 138)";


export const BLANC : Couleur = "rgb(255, 255, 255)"; 

export const NOIR : Couleur = "rgb(0,0,0)"; 
export const FOND_NOIR : Couleur = "rgb(17, 17, 17)";

export const GRIS_NOIR : Couleur = "rgb(50, 50, 50)";

export const ROUGE : Couleur = "rgb(255, 0, 0)";

export const JAUNE : Couleur = "rgb(225, 225, 0)";

export const VIOLET : Couleur = "rgb(128, 0, 128)";

export const BLEU_CANARD : Couleur = "rgb(0, 128, 128)";

export const BLEU_CIEL : Couleur = "rgb(119, 181, 254)";

export const VERT : Couleur = "rgb(0, 225, 0)";

export const GRIS : Couleur = "rgb(135, 135, 135)";

export const GRIS_CLAIR : Couleur = "rgb(229, 229, 229)";

export const TOUS : Couleur = GRIS;

export const FOND : Couleur = GRIS_CLAIR;

export const COULEUR_SEPARATION : Couleur = BLEU_CIEL;

export const OMBRE_RECEPTION : Couleur = TOUS;

export const OMBRE_EMISSION : Couleur = ROUGE; 

export class SuiteCouplesFondEncre {
    private fonds : Couleur[];
    private encres : Couleur[];
    private pos : number;

    constructor(){
        this.fonds = [JAUNE, BLEU_CANARD, VIOLET, VERT]; /* TODO etendre ! */
        this.encres = [NOIR, BLANC, BLANC, NOIR]; /* TODO etendre ! */
        this.pos = 0;
    }

    courant() : {fond : Couleur, encre : Couleur } {
        let r : {fond : Couleur, encre : Couleur } = { fond : this.fonds[this.pos], encre : this.encres[this.pos]};
        this.pos = (this.pos + 1)%(this.encres.length);
        return r;
    }
}

export const COUPLE_FOND_ENCRE : {fond : Couleur, encre : Couleur } = {
    fond : ROUGE,
    encre : BLANC
}