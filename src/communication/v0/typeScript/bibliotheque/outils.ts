export function dateFr(d: Date) : string {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (new Date(d)).toLocaleString("fr-FR", options);
}

export function dateFrLog(d: Date) : string {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (new Date(d)).toLocaleString("fr-FR", options);
}