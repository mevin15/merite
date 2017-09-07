import * as React from "react";

import styled from "styled-components";

import { Individu, Message } from "./typesInterface";
import { Admin } from "./admin";
import { Action } from "./action";
import { Couleur, COUPLE_FOND_ENCRE_SUJET, COUPLE_FOND_ENCRE_TOUS, SuiteCouplesFondEncre, FOND, CADRE, SEPARATION_CADRE, TEXTE_ERREUR } from "./couleur";

import {
  TableImmutable, creerTableImmutable, Identifiant, creerIdentifiant,
  FormatDateFrEX, creerDate, DateImmutable
} from "../../bibliotheque/types";
import {
} from "../../bibliotheque/communication";
import {
  elementParId, recupererEntree, initialiserEntree, contenuBalise, poster, posterNL,
  gererEvenementDocument, gererEvenementElement,
  elementSaisieEnvoi, initialiserDocument
} from "../../bibliotheque/vueClient";
import { CanalClient, creerCanalClient } from "../../bibliotheque/client";
import {
  hote, port2,
  NoeudTchatImmutable, creerNoeudTchatEX,
  SommetTchat, creerSommetTchat,
  creerMessageCommunication,
  TypeMessageTchat, FormatMessageTchatEX, EtiquetteMessageTchat, MessageTchat,
  FormatConfigurationTchatEX, EtiquetteConfigurationTchat,
  ConfigurationTchat, creerConfigurationTchat,
  FormatErreurTchatEX, EtiquetteErreurTchat,
  ErreurTchat, creerErreurTchat,
  decomposerConfiguration
} from '../commun/tchat';

type CanalTchat
  = CanalClient<
  FormatErreurTchatEX,
  FormatConfigurationTchatEX,
  FormatMessageTchatEX, FormatMessageTchatEX, EtiquetteMessageTchat>;

const ApresAdmin = styled.div`
    background: ${CADRE};
    position: fixed;
    top: 0;
    left: 24vw;
    width: calc(1vw);
    height: calc(100vh);
    border-style: solid;
    border-width: 0 0.33vw;
    border-color: ${SEPARATION_CADRE};
`;

const ApresAction = styled.div`
    background: ${CADRE};
    position: fixed;
    top: 0;
    right: 0;
    width: 1vw;
    height: 100vh;
    border-style: solid;
    border-width: 0 0.33vw;
    border-color: ${SEPARATION_CADRE};
`;

function cachetDate(d: FormatDateFrEX): string {
  return creerDate(d).representation();
}

interface ProprietesCorps {
  // see https://github.com/Microsoft/TypeScript/issues/8588
  className?: string;
}

enum EtatInterfaceTchat {
  INITIAL,
  NORMAL,
  ERRONE
};

/*
  Etat contenant 
  - les attributs susceptibles d'être modifiés par des sous-composants,
  - un indicateur de l'état de l'interface, chaque valeur étant associée
    à des attributs du composant, modifiés uniquement en interne 
*/
interface EtatCorps {
  selection: Individu;
  messages: Message[];
  etatInterface: EtatInterfaceTchat;
}

const ID_TOUS: string = "TOUS";

/*
 * Degré du graphe limité à 4 - Cf. la liste des couples de couleurs.
 */
class CorpsBrut extends React.Component<ProprietesCorps, EtatCorps> {

  private adresseServeur: string;
  private canal: CanalTchat;
  private noeud: NoeudTchatImmutable;

  private messageErreur: string;

  private individusObjets: TableImmutable<Individu>;
  private individuSujet: Individu;
  private toutIndividu: Individu;

  constructor(props: ProprietesCorps) {
    super(props);
    this.adresseServeur = hote + ":" + port2;

    this.messageErreur = "Aucune erreur";

    this.toutIndividu = {
      id: creerIdentifiant('sommet', ID_TOUS),
      nom: "tous",
      fond: COUPLE_FOND_ENCRE_TOUS.fond,
      encre: COUPLE_FOND_ENCRE_TOUS.encre
    };

    this.state = {
      selection: this.toutIndividu,
      messages: [],
      etatInterface: EtatInterfaceTchat.INITIAL,
    };

    this.envoyerMessage = this.envoyerMessage.bind(this);
    this.modifierSelection = this.modifierSelection.bind(this);
  }

  modifierSelection(i: Individu) {
    this.setState({ selection: i });
  }

  envoyerMessage(m: Message) {
    if (m.destinataire.id.val === ID_TOUS) {
      console.log("* Diffusion du message")
      this.individusObjets.pourChaque((c, v) => {
        let msg: MessageTchat = creerMessageCommunication(m.emetteur.id, v.id, m.contenu);
        console.log("- brut : " + msg.brut());
        console.log("- net : " + msg.representation());
        this.canal.envoyerMessage(msg);
      });
      return;
    }
    let msg: MessageTchat = creerMessageCommunication(m.emetteur.id, m.destinataire.id, m.contenu);
    console.log("* Envoi du message");
    console.log("- brut : " + msg.brut());
    console.log("- net : " + msg.representation());
    this.canal.envoyerMessage(msg);
  }

  render(): JSX.Element {
    switch (this.state.etatInterface) {
      case EtatInterfaceTchat.NORMAL:
        return (
          <div className={this.props.className}>
            <Admin sujet={this.individuSujet} objets={this.individusObjets.image()} tous={this.toutIndividu}
              selection={this.state.selection} modifSelection={this.modifierSelection} />
            <ApresAdmin />
            <Action sujet={this.individuSujet} messages={this.state.messages} 
              selection={this.state.selection} envoiMessage={this.envoyerMessage}/>
            <ApresAction />
          </div>
        );
      case EtatInterfaceTchat.INITIAL:
        return (
          <h1>Connexion au serveur pour l'initialisation</h1>
        );
      case EtatInterfaceTchat.ERRONE:
        return (
          <div>
            <h1>Fin de l'application après l'erreur suivante : </h1>
            <div style={{color: TEXTE_ERREUR}}>
              {this.messageErreur}
            </div>
          </div>
        );
    }
  }

  /* TODO */
  componentDidMount(): void {
    console.log("* Initialisation après montage du corps");

    console.log("- du canal de communication avec le serveur d'adresse " + this.adresseServeur);
    this.canal = creerCanalClient(this.adresseServeur);

    console.log("- du traitement des messages");
    this.canal.enregistrerTraitementMessageRecu((m: FormatMessageTchatEX) => {
      let msg = new MessageTchat(m);
      console.log("* Réception");
      console.log("- du message brut : " + msg.brut());
      console.log("- du message net : " + msg.representation());
      let emetteur: Individu;
      let destinataire: Individu;
      let cachet: string = cachetDate(msg.ex().date);
      let contenu: string = msg.ex().contenu;
      if (this.individusObjets.contient(msg.ex().ID_emetteur.val)) {
        emetteur = this.individusObjets.ex().table[msg.ex().ID_emetteur.val];
        destinataire = this.individuSujet;
      } else {
        emetteur = this.individuSujet;
        destinataire = this.individusObjets.ex().table[msg.ex().ID_destinataire.val];
      }
      let msgAffichable: Message = {
        emetteur: emetteur,
        destinataire: destinataire,
        cachet: cachet,
        contenu: contenu
      };
      this.setState((etatAvant: EtatCorps) => ({
        messages: [...etatAvant.messages, msgAffichable]
      }));
    });

    console.log("- du traitement de la configuration");
    this.canal.enregistrerTraitementConfigurationRecue((c: FormatConfigurationTchatEX) => {
      let config = creerConfigurationTchat(c);
      console.log("* Réception");
      console.log("- de la configuration brute : " + config.brut());
      console.log("- de la configuration nette : " + config.representation());
      console.log("* Initialisation du noeud du réseau");
      this.noeud = creerNoeudTchatEX(decomposerConfiguration(config));
      this.individuSujet = {
        id: this.noeud.ex().centre.ID,
        nom: this.noeud.ex().centre.pseudo,
        fond: COUPLE_FOND_ENCRE_SUJET.fond,
        encre: COUPLE_FOND_ENCRE_SUJET.encre
      };
      let suite = new SuiteCouplesFondEncre();
      this.individusObjets =
        creerTableImmutable(this.noeud.ex().voisins).application(s => {
          let c = suite.courant();
          return {
            id: s.ID,
            nom: s.pseudo,
            fond: c.fond,
            encre: c.encre
          };
        });

      this.setState({
        etatInterface: EtatInterfaceTchat.NORMAL
      });

    });

    console.log("- du traitement d'une erreur rédhibitoire");
    this.canal.enregistrerTraitementErreurRecue((err: FormatErreurTchatEX) => {
      let erreur = creerErreurTchat(err);
      console.log("* Réception");
      console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
      console.log("- de l'erreur rédhibitoire nette : " + erreur.representation());
      console.log("* Affichage de l'erreur");
      this.messageErreur = erreur.representation();
      this.setState({
        etatInterface: EtatInterfaceTchat.ERRONE,
      });
    });

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
