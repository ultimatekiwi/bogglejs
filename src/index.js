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

class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
  }

  render() {
    return (
      <div>
        <ul>
          {(this.state.words).map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

}

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A word was submitted: ' + this.state.value);
    event.preventDefault();
    this.addWord(this.state.value);
  }

  render() {
    return (
      <form>
        {/* <label>
          Word: */}
          <input type="text" placeholder="Enter a word!" value={this.state.value} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        {/* </label> */}
        <input type="submit" value="Submit" />        
      </form>
    );
  }


}



function NewGame(props) {
  return (
    <button onClick={props.onClick}>
      {"New Board"}
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

}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [],
      wordList: ['first', 'another']
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

  // addWord(word) {
  //   const theWords = this.state.wordList;
  //   theWords.push(word);  //I can push a value onto a const array, right?
  //   this.setState({wordList: theWords});
  // }
  addWord2(word) {
    console.log("shit idk how I should make an updateable list of words. ARG: " + word)
    const theWords = this.state.wordList;
    theWords.concat(word);
    this.setState({
      wordList: theWords
    })
  }

  addWord(word) {
	this.setState(prevState => ({
		wordList: [...prevState.wordList, word]
	}))
}




  render() {
    return (

      <div className="game">
        <div className="game-board">
          <Board boardState={this.state.boardState}/>
            <div className="button">
              <NewGame onClick={() => this.shuffleBoard()}/>
            </div>
        </div>

        <div className="game-info">
          <div className="form">
            <WordForm />
          </div>
          <div className="word-list">
            {"Word List:"}
            <WordList wordList={this.state.wordList}/>
            </div>
          
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
