// Revue 31/07 OK - Testé

export enum Alphabet {
    ZERO,
    UN
}

export type Mot = Alphabet[];

export function representerMot(mot: Mot): string {
    return "[" + mot.map((v, i, t) => Alphabet[v]).toString().replace(',', '.') + "]";
}

export function binaire(n: number): Mot {
    let s: string[] = Array.from(n.toString(2));
    return s.map((v, i, t) => {
        switch (v) {
            case '0': return Alphabet.ZERO;
            case '1': return Alphabet.UN;
            default : 
                throw new Error(
                    "[Erreur : binaire(" + n.toString + ") non défini.");
        }
    });
}        

export function premiersBinaires(n : number) : Mot[] {
    let r = [];
    for(let i = 0; i < n; i++){
        r.push(i);
    }
    return r.map((v, i, tab) => binaire(v));
}