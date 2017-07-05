import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Case extends React.Component {
	constructor(){
		super();
		this.state = {
			valeur : "0",
		}
	}
	
  render() {
    return (
      <button className="square" onClick={()=> this.setState({valeur : "1"})}>
        {this.state.valeur}
      </button>
    );
  }
}

class Board extends React.Component {
  renderCase(i) {
    return <Case />;
  }

  render() {
    return (
      <div>
        <div className="status">Message à transmettre :</div>
        <div className="board-row">
          {this.renderCase(0)}
          {this.renderCase(1)}
          {this.renderCase(2)}
          {this.renderCase(3)}
          {this.renderCase(4)}
          {this.renderCase(5)}
          {this.renderCase(6)}
          {this.renderCase(7)}
          {this.renderCase(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
