export function donneeDynamique(doc: Document, champ: string): string {
    return doc.getElementById(champ).innerHTML;
}

export function poster(doc: Document, champ: string, val: string): void {
    doc.getElementById(champ).innerHTML += val;
}
