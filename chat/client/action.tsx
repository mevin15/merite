import * as React from "react";
import styled from "styled-components";
import Scrollbars from "react-custom-scrollbars";
import { DateImmutable } from "../../bibliotheque/types"
import { ContainerAction } from "./containerAction";
import { Individu, Message } from "./typesInterface";
import { Couleur, FOND } from "./couleur";

interface ProprietesAction {
  // see https://github.com/Microsoft/TypeScript/issues/8588
  className?: string;
  sujet : Individu;
  messages : Message[];
  selection : Individu;
  envoiMessage : (m : Message, d : DateImmutable) => void;
}

class ContenuAction extends React.Component<ProprietesAction, {}> {
  render() {
    return (
        <div className={this.props.className}>
            <Scrollbars style={{ width: "74vw", height: "100vh" }}>
                <ContainerAction
                    sujet={this.props.sujet} 
                    messages={this.props.messages} 
                    selection={this.props.selection}
                    envoiMessage={this.props.envoiMessage}
                />
            </Scrollbars>
      </div>
    );
  }
}

export const Action = styled(ContenuAction)`
    background: ${FOND};
    position: fixed;
    top: 0;
    right: 1vw;
`;
