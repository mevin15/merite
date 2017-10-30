import { FormatNoeudMutable, NoeudMutable, NoeudEnveloppeMutable, creerCentreSansVoisins, EtiquetteNoeud, FormatNoeudImmutable, NoeudImmutable, NoeudEnveloppeImmutable } from "../../bibliotheque/communication";
import { creerTableImmutable } from "../../bibliotheque/types/table";
import { jamais } from "../../bibliotheque/outils";
import {FormatSommetChat, creerSommetChat} from './sommetChat';

export type FormatNoeudChatMutable = FormatNoeudMutable<FormatSommetChat>;
export type NoeudChatMutable = NoeudMutable<FormatSommetChat>;

class NoeudChatEnveloppeMutable extends NoeudEnveloppeMutable<FormatSommetChat>{
    // renvoie un string correspondant a la valeur du parametre appelé
    net(e: EtiquetteNoeud): string {
        let s = this.val();
        switch (e) {
            case 'centre': return creerSommetChat(s.centre).representation();
            case 'voisins':
                return creerTableImmutable(s.voisins).representation();
        }
        return jamais(e);
    }

    // renvoie la representation d'un noeud mutable en string
    representation(): string {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    }
}

export function creerNoeudChatMutable(n: FormatNoeudChatMutable)  : NoeudChatMutable {
    return new NoeudChatEnveloppeMutable(n);
}

export function creerNoeudSansVoisinsChatMutable(centre: FormatSommetChat): NoeudChatMutable {
    return new NoeudChatEnveloppeMutable(creerCentreSansVoisins(centre));
}

export type FormatNoeudChatImmutable = FormatNoeudImmutable<FormatSommetChat>;

export type NoeudChatImmutable = NoeudImmutable<FormatSommetChat>;

class NoeudChatEnveloppeImmutable extends NoeudEnveloppeImmutable<FormatSommetChat>{
    // renvoie un string correspondant a la valeur du parametre appelé
    net(e: EtiquetteNoeud): string {
        let s = this.val();
        switch (e) {
            case 'centre': return creerSommetChat(s.centre).representation();
            case 'voisins':
                return creerTableImmutable(s.voisins).representation();
        }
        return jamais(e);
    }

    // renvoie la representation d'un noeud mutable en string
    representation(): string {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    }
}

export function creerNoeudChatImmutable(n: FormatNoeudChatImmutable) : NoeudChatImmutable{
    return new NoeudChatEnveloppeImmutable(n);
}
