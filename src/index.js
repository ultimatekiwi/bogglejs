import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { chunk } from 'lodash';
import _ from "lodash";


const cubes = [ 'AAEEGN', 'ELRTTY', 'AOOTTW', 'ABBJOO', 'EHRTVW', 'CIMOTU', 'DISTTY', 'EIOSST', 'DELRVY', 'ACHOPS', 'HIMNQU', 'EEINSU', 'EEGHNW', 'AFFKPS', 'HLNNRZ', 'DEILRX' ];

// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

function NewGame(props) {
  return (
    <button onClick={props.onClick}>
      {"Create New Board"}
    </button>
  );
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }



//   handleClick(i) {
//     const squares = this.state.squares.slice();
//     squares[i] = cubes[i][Math.floor(Math.random()*6)];  //6 for the possible faces on that cube
// //    squares[i] = 'X';
// //    this.setState({squares: squares});
//     this.setState(   {squares: squares});  
//   }

//   renderSquare(i) {
//     return (
//       <Square
//         value={this.state.squares[i]}
//         onClick={() => this.handleClick(i)}
//       />
//     );
//   }

    render() {
    const status = 'Next player: X';
    const { boardState } = this.props;

    // What is happening in the next 10 lines? Fuck me if I can explain it.
    const boardRows = boardState.map((row, rowIdx) => (
      <div className="board-row" key={rowIdx}>
        {row.map((square, squareIdx) => (
          <span className="square" key={squareIdx}>{square}</span>
        ))}
      </div>
    ))
    
// so this boardRows variable is really an array of 4 React.Div objects,
// each of them having 4 React.Span children

    
    return (
        <div>
        <div className="status">{status}</div>
          {boardRows}

        </div>

    );
  }


// lol fuck it, copy-paste for the moment.
  // render() {
  //   const status = 'Next player: X';

  //   return (
  //     <div>
  //       <div className="status">{status}</div>
  //       <div className="board-row">
  //         {this.renderSquare(0)}
  //         {this.renderSquare(1)}
  //         {this.renderSquare(2)}
  //         {this.renderSquare(3)}
  //       </div>
  //       <div className="board-row">
  //         {this.renderSquare(4)}
  //         {this.renderSquare(5)}
  //         {this.renderSquare(6)}
  //         {this.renderSquare(7)}
  //       </div>
  //       <div className="board-row">
  //         {this.renderSquare(8)}
  //         {this.renderSquare(9)}
  //         {this.renderSquare(10)}
  //         {this.renderSquare(11)}
  //       </div>
  //       <div className="board-row">
  //         {this.renderSquare(12)}
  //         {this.renderSquare(13)}
  //         {this.renderSquare(14)}
  //         {this.renderSquare(15)}
  //       </div>
  //     </div>
  //   );
  // }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: []
    }
  }



  shuffleBoard() {
    // TODO: generate a random 4x4 board here
    const newBoard = chunk(  _.shuffle(cubes.map((x) => x[Math.floor(Math.random()*6)])), 4)
//    const newBoard = [['M', 'A', 'R', 'C'], ['U', 'S', '=', 'L'], ['E', 'X', 'L', 'U'], ['T', 'H', 'O', 'R']]
    this.setState({
      boardState: newBoard
    })
  }

  componentDidMount() {
    this.shuffleBoard()
  }


  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board boardState={this.state.boardState}/>
          
        </div>
        <div className="game-info">
          <div className="game-info">{"Testing Board.render"}</div>
          <NewGame
            onClick={() => this.shuffleBoard()}
          />
          <div>
            {/* <p>Testing adding text to Game render</p> */}
          </div>
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
