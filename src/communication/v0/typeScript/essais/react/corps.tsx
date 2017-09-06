import * as React from "react";

import styled from "styled-components";

import { Individu, Message } from "./typesInterface";

import { Admin } from "./admin";
import { Action } from "./action";



import { Couleur, FOND, COULEUR_SEPARATION, BLANC, NOIR, ROUGE, JAUNE, VIOLET, BLEU_CANARD, VERT, TOUS } from "./couleur";

const ApresAdmin = styled.div`
    background: ${COULEUR_SEPARATION};
    position: fixed;
    top: 0;
    left: 24vw;
    width: calc(1vw);
    height: calc(100vh);
    border-style: solid;
    border-width: 0 0.33vw;
    border-top-color: ${BLANC};
    border-right-color: ${BLANC};
    border-bottom-color: ${BLANC};
    border-left-color: ${BLANC};
`;

const ApresAction = styled.div`
    background: ${COULEUR_SEPARATION};
    position: fixed;
    top: 0;
    right: 0;
    width: 1vw;
    height: 100vh;
    border-style: solid;
    border-width: 0 0.33vw;
    border-top-color: ${BLANC};
    border-right-color: ${BLANC};
    border-bottom-color: ${BLANC};
    border-left-color: ${BLANC};
`;

interface ProprietesCorps {
  // see https://github.com/Microsoft/TypeScript/issues/8588
  className?: string;
}

interface EtatCorps {
  selection: Individu;
  messages: Message[];
}

class CorpsBrut extends React.Component<ProprietesCorps, EtatCorps> {

  private individusObjets: Individu[];
  private individuSujet: Individu;
  private toutIndividu: Individu;

  constructor(props: ProprietesCorps) {
    super(props);

    this.individusObjets = [];
    let zaza = {
      nom: "Zaza",
      fond: JAUNE,
      encre: NOIR,
    };
    this.individusObjets.push(zaza);
    let toto = {
      nom: "Toto",
      fond: VIOLET,
      encre: BLANC,
    };
    this.individusObjets.push(toto);
    let titi = {
      nom: "Titi",
      fond: BLEU_CANARD,
      encre: BLANC,
    };
    this.individusObjets.push(titi);
    let sissi = {
      nom: "Sissi",
      fond: VERT,
      encre: NOIR,
    };
    this.individusObjets.push(sissi);
    this.individuSujet = {
      nom: "Momo",
      fond: ROUGE,
      encre: BLANC,
    };
    this.toutIndividu = {
      nom: "tous",
      fond: TOUS,
      encre: NOIR,
    };
    let msgs: Message[] = [];

    msgs.push({
      emetteur: this.individuSujet,
      destinataire: zaza,
      contenu: "coucou zaza. Cette ligne est très longue et mérite d'être étendue vers la droite. Cela se fait automatiquement.\nA bientôt.\nMomo.",
      cachet: "12:43"
    })

    msgs.push({
      emetteur: zaza,
      destinataire: this.individuSujet,
      contenu: "Effectivement. La longueur des lignes est ajustée automatiquement entre une valeur min et une max.\nA bientôt. \nZaza",
      cachet: "12:47"
    })

    msgs.push({
      emetteur: this.individuSujet,
      destinataire: sissi,
      contenu: "coucou sissi. Ligne courte sans extension.\nA bientôt.",
      cachet: "12:49"
    })

    msgs.push({
      emetteur: this.individuSujet,
      destinataire: toto,
      contenu: "coucou toto. On peut écrire un long texte avec extension et passage à la ligne automatique. "
      + "Pour forcer la passage à la ligne, on utilise antislash n dans une chaîne et la balise br en html.\nA bientôt.",
      cachet: "12:56"
    })

    msgs.push({
      emetteur: toto,
      destinataire: this.individuSujet,
      contenu: "coucou momo.\nMessages envoyés : à gauche.\nMessages reçus : à droite."
      + "\nLes couleurs permettent de distinguer les différents interlocuteurs.",
      cachet: "13:09"
    })

    msgs.push({
      emetteur: this.individuSujet,
      destinataire: this.toutIndividu,
      contenu: "J'utilise une pastille rouge. Mais peut-être tout émetteur l'utilisera. A voir !\n"
      + "Titi utilise le bleu canard, Toto le violet et le gris est réservé à la diffusion à tous.\nA+",
      cachet: "13:39"
    })

    msgs.push({
      emetteur: titi,
      destinataire: this.individuSujet,
      contenu: "coucou Momo.\nLe temps augmente vers le bas : les messages les plus récents sont en bas, les plus anciens en haut. "
      + "Lorsque la pile des messages émis et reçus grandit, elle s'étend vers le haut ; "
      + "quand elle dépasse les limites de sa fenêtre, un ascenseur apparaît à droite, pour permettre le défilement."
      + "\nA+",
      cachet: "14:47"
    })

    msgs.push({
      emetteur: this.individuSujet,
      destinataire: sissi,
      contenu: "Fin.\nSi je voulais écrire un nouveau message, "
      + "je sélectionnerais à gauche mon destinataire puis écrirais le message dans le cadre noir. "
      + "Sa hauteur s'ajuste automatiquement à celle du texte.",
      cachet: "18:45"
    })

    this.state = {
      selection: this.toutIndividu,
      messages: msgs
    };
    this.modifierSelection = this.modifierSelection.bind(this);
  }

  modifierSelection(i: Individu) {
    this.setState({ selection: i });
  }

  render() {
    return (
      <div className={this.props.className}>
        <Admin sujet={this.individuSujet} objets={this.individusObjets} tous={this.toutIndividu}
          selection={this.state.selection} modifSelection={this.modifierSelection} />
        <ApresAdmin />
        <Action sujet={this.individuSujet} messages={this.state.messages} selection={this.state.selection} />
        <ApresAction />
      </div>
    );
  }
}

export const Corps = styled(CorpsBrut) `
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${FOND}
`;

