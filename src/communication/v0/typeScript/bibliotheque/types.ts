// Revue 02/08 - Testé.

import { jamais } from "./outils";

export enum Unite { un }

// Problème / readonly properties
// Cf. https://github.com/Microsoft/TypeScript/issues/13347
// Interface with readonly property is assignable to interface with mutable property.
// Remède : par défaut, les champs sont en lecture seulement. Lorsque ce n'est pas le cas, on rajoute 
//   un champ (mutable : Unite). Lorsqu'il s'agit de champs indexés, on introduit un champ table contenant 
//   la structure. Voir FormatTableIN ci-dessous. 
export interface Mutable {
    mutable: Unite
}

type EnLecture<T> = {
    readonly [P in keyof T]: T[P];
}

// Types formats JSON : FormatX par convention
// Format ::= { (etiquette : Format)*} | { [x : string] : Format }

// Modèle générique d'une enveloppe d'un document JSON
// TEX : type de sortie (souvent format JSON en lecture seulement)
// TIN : type d'entrée pour l'état en format JSON ou non (confiné, permettant des modifications)
// E : étiquettes utiles pour une représentation (cf. méthode net)
// La différence entre TIN et TEX permet de gérer la mutabilité et la visibilité de la structure 
//   de données, souvent au format JSON.
// Une fonction de conversion de TIN ves TEX est requise.
export abstract class Enveloppe<TIN, TEX, E extends string> {
    protected etat: TIN;
    protected inEnEx: (x: TIN) => TEX;
    constructor(inEnEx: (x: TIN) => TEX, etat: TIN) {
        this.etat = etat;
        this.inEnEx = inEnEx;
    };
    ex(): TEX {
        return this.inEnEx(this.etat);
    }
    // transformation brute du json de type TIN en string
    brut(): string {
        return JSON.stringify(this.etat);
    };
    // représentation dans un json simplifié
    abstract net(etiquette: E): string;
    abstract representer(): string;
}

/*
 * Table mutable.
*/
export interface FormatTableIN<T> extends Mutable {
    readonly table: { [cle: string]: T }
}

export interface FormatTableEX<T> {
    readonly table: { readonly [cle: string]: T }
}

export class ModuleTable {

    pourChaque<T>(
        f: (cle: string, val: T, tab?: { [cle: string]: T }) => void,
        t: FormatTableEX<T>
    ): void {
        for (let c in t.table) {
            f(c, t.table[c], t.table);
        }
    }


    valeur<T>(t: FormatTableEX<T>, cle: string): T {
        return t.table[cle];
    }
    contient<T>(t: FormatTableEX<T>, cle: string): boolean {
        if (t.table[cle]) {
            return true;
        }
        return false;;
    }
    image<T>(t: FormatTableEX<T>): T[] {
        let tab: T[] = [];
        this.pourChaque((c, v) => {
            tab.push(v);
        }, t);
        return tab;
    }
    domaine<T>(t: FormatTableEX<T>): string[] {
        let tab: string[] = [];
        this.pourChaque((c, v) => {
            tab.push(c);
        }, t);
        return tab;
    }

    taille<T>(t: FormatTableEX<T>): number {
        let n: number = 0;
        this.pourChaque((c, v) => {
            n++;
        }, t);
        return n;
    }

    foncteur<T, S>(t: FormatTableEX<T>, f: (x: T) => S): { [cle: string]: S } {
        let r: { [cle: string]: S }
            = {};
        this.pourChaque((c, v) => {
            r[c] = f(v);
        }, t);
        return r;
    }

    selectionCle<T>(t: FormatTableEX<T>): string {
        // sélection d'une clé
        for (let c in t.table) { // une seule itération
            return c;
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    }

    ajouter<T>(t: FormatTableIN<T>, cle: string, x: T): void {
        t.table[cle] = x;
    }

    retirer<T>(t: FormatTableIN<T>, cle: string): void {
        delete t.table[cle];
    }

}

export const MODULE_TABLE = new ModuleTable();

export function conversionFormatTable<TIN, TEX>(conv: (x: TIN) => TEX)
    : (t: FormatTableIN<TIN>) => FormatTableEX<TEX> {
    return (
        (t: FormatTableIN<TIN>) => {
            let r: { [cle: string]: TEX } = {};
            MODULE_TABLE.pourChaque((c, v) => {
                r[c] = conv(v);
            }, t);
            return { table: r };
        });
}
export type EtiquetteTable = 'taille' | 'graphe' | 'domaine' | 'image';



export class TableImmutable<TEX>
    extends Enveloppe<FormatTableEX<TEX>, FormatTableEX<TEX>, EtiquetteTable> {
    constructor(etat: FormatTableEX<TEX>) {
        super((x) => x, etat);
    }
    net(e: EtiquetteTable): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map((v, i, t) => JSON.stringify(v)).toString();
            case 'graphe': return this.brut();
        }
        return jamais(e);
    }
    representer(): string {
        return this.net('graphe');
    }
    image(): TEX[] {
        return MODULE_TABLE.image(this.ex());
    }
    domaine(): string[] {
        return MODULE_TABLE.domaine(this.ex());
    }

    taille(): number {
        return MODULE_TABLE.taille(this.ex());
    }

    foncteur<SEX>(f: (x: TEX) => SEX): TableImmutable<SEX> {
        return creerTableImmutable(
            { table: MODULE_TABLE.foncteur(this.ex(), f) }
        );
    }
}

export function creerTableImmutable<TEX>(t: FormatTableEX<TEX>)
    : TableImmutable<TEX> {
    return new TableImmutable(t);
}

export class Table<TIN, TEX>
    extends Enveloppe<FormatTableIN<TIN>, FormatTableEX<TEX>, EtiquetteTable> {

    constructor(valInVersEx: (x: TIN) => TEX, etat: FormatTableIN<TIN>) {
        super(conversionFormatTable(valInVersEx), etat);
    }

    net(e: EtiquetteTable): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map((v, i, t) => JSON.stringify(v)).toString();
            case 'graphe': return this.brut();
        }
        return jamais(e);
    }
    representer(): string {
        return this.net('graphe');
    }
    image(): TEX[] {
        return MODULE_TABLE.image(this.ex());
    }
    domaine(): string[] {
        return MODULE_TABLE.domaine(this.etat);
    }
    selectionCle(): string {
        return MODULE_TABLE.selectionCle(this.etat);
    }
    taille(): number {
        return MODULE_TABLE.taille(this.etat);
    }
    estVide(): boolean {
        return this.taille() === 0;
    }

    ajouter(cle: string, x: TIN): void {
        MODULE_TABLE.ajouter(this.etat, cle, x);
    }
    retirer(cle: string): void {
        MODULE_TABLE.retirer(this.etat, cle);
    }
}

export function creerTableVide<TIN, TEX>(valInVersEx: (x: TIN) => TEX) {
    return new Table(valInVersEx, { table: {}, mutable: Unite.un });
}
// Identifiant
// à utiliser avec Sorte = 'sorte à identifier' (chaine singleton)
// Usage : 
// - let id :Identifiant<'sorte'>
// - lecture : id.sorte de type string
// - création :  { sorte : "identite"} 
// Permet de typer les identifiants par sorte.
// Les identifiants sont toujours accéder via un champ nommé ID ou ID_x.

export type Identifiant<Sorte extends string> = {
    readonly val: string;
    readonly sorte: Sorte;
}

export interface FormatIdentifiableIN<Sorte extends string> extends Mutable {
    ID: Identifiant<Sorte>; // en majuscule par exception
}

export interface FormatIdentifiableEX<Sorte extends string> {
    readonly ID: Identifiant<Sorte>; // en majuscule par exception
}

export interface Identification<Sorte extends string> {
    identifier(s: Sorte): Identifiant<Sorte>;
}

export class IdentificationParCompteur<Sorte extends string>
    implements Identification<Sorte> {
    private compteur: number;
    constructor(private prefixe: string) {
        this.compteur = 0;
    }
    identifier(s: Sorte): Identifiant<Sorte> {
        let id: string = this.prefixe + this.compteur;
        this.compteur++;
        return { val: id, sorte: s };
    }

}

export function creerIdentificationParCompteur<
    Sorte extends string
    >(prefixe: string)
    : Identification<Sorte> {
    return new IdentificationParCompteur(prefixe);
}

/*
* Table utilisant des identificateurs comme clé.
* Remarque : les tables précédentes fondées sur les tables en JSON utilisent nécessdairemetn le type string pour les clés. 
*/
export class TableIdentification<Sorte extends string, TIN, TEX>
    extends Enveloppe<FormatTableIN<TIN>, FormatTableEX<TEX>, EtiquetteTable> {
    protected sorte: Sorte;

    constructor(
        sorte: Sorte,
        valInVersEx: (x: TIN) => TEX,
        pop: FormatTableEX<TIN> = { table: {} }) {
        super(conversionFormatTable(valInVersEx), { table: pop.table, mutable: Unite.un });
        this.sorte = sorte;
    }

    net(e: EtiquetteTable): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().map((v, i, t) => JSON.stringify(v)).toString();
            case 'image': return this.image().map((v, i, t) => JSON.stringify(v)).toString();
            case 'graphe': return JSON.stringify(this.ex().table);
        }
        return jamais(e);
    }
    representer(): string {
        return this.net('graphe');
    }

    protected valeurIN(ID_sorte: Identifiant<Sorte>): TIN {
        return MODULE_TABLE.valeur(this.etat, ID_sorte.val);
    }

    valeur(ID_sorte: Identifiant<Sorte>): TEX {
        return MODULE_TABLE.valeur(this.ex(), ID_sorte.val);
    }
    contient(ID_sorte: Identifiant<Sorte>): boolean {
        return MODULE_TABLE.contient(this.ex(), ID_sorte.val);
    }

    image(): TEX[] {
        return MODULE_TABLE.image(this.ex());
    }
    domaine(): Identifiant<Sorte>[] {
        return MODULE_TABLE.domaine(this.ex()).
            map((s) => { return { val: s, sorte: this.sorte } });
    }
    selectionCle(): Identifiant<Sorte> {
        return {
            val: MODULE_TABLE.selectionCle(this.etat),
            sorte: this.sorte
        };
    }
    taille(): number {
        return MODULE_TABLE.taille(this.etat);
    }
    estVide(): boolean {
        return this.taille() === 0;
    }
    ajouter(ID_sorte: Identifiant<Sorte>, x: TIN): void {
        MODULE_TABLE.ajouter(this.etat, ID_sorte.val, x);
    }

    retirer(ID_sorte: Identifiant<Sorte>): void {
        MODULE_TABLE.retirer(this.etat, ID_sorte.val);
    }
}
export function creerTableIdentificationVide<
    Sorte extends string, TIN, TEX>(
    sorte: Sorte,
    valInVersEx: (x: TIN) => TEX) {
    return new TableIdentification<Sorte, TIN, TEX>(
        sorte, valInVersEx);
}

export function creerTableIdentification<
    Sorte extends string, TIN, TEX>(
    sorte: Sorte,
    valInVersEx: (x: TIN) => TEX,
    pop: FormatTableEX<TIN>
    ) {
    return new TableIdentification<Sorte, TIN, TEX>(
        sorte, valInVersEx, pop);
}

