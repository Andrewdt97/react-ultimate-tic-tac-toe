class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(3).fill(null).map(()=>Array(3).fill(null)),
      currentTurn: 'X',
      hasWinner: false
    }
  }
  
  // checkWin = (squares) => {
  //   let valuesOnDiagnal = [null, null, null];
  //   for (let i = 0; i < 3; i++) {
  //     valuesOnDiagnal[i] = squares[i][i]
  //     // columns
  //     if (squares[i].every(x => x == squares[i][0])) {
  //       return squares[i][0]
  //     // rows
  //     } else if (squares.every(x => x[i] == squares[0][i])) {
  //       return squares[0][i]
  //     } else if (valuesOnDiagnal.every(x => x != null && x == valuesOnDiagnal[0])) {
  //       return valuesOnDiagnal[0]
  //     }
  //   }
  //   return null;
  // }
  
  
  handleClick = (x, y) = > {
    this.props.onClick(x, y)
  }
  renderSquare = (x, y) => {
    return <Square 
             value={this.state.squares[x][y]}
             onClick={() => this.handleClick(x, y)} />
  };
  
  render() {
      return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(1, 0)}
          {this.renderSquare(2, 0)}
        </div>
        <div className="board-row">
          {this.renderSquare(0, 1)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(2, 1)}
        </div>
        <div className="board-row">
          {this.renderSquare(0, 2)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(2, 2)}
        </div>
      </div>
    );
    }
  }

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: Array(3).fill(null).map(()=>Array(3).fill({
        squares: Array(3).fill(null).map(()=>Array(3).fill(null)),
        hasWinner: null,
      })),
      currentTurn: 'X',
      hasWinner: false,
    }
  }
  
  handleClick = (boardX, boardY, x, y) => {
    const newBoard = this.state.boards.slice();
    const newSquares = this.state.boards[x][y].squares.slice();
    newSquares[x][y] = this.state.currentTurn;
    newBoard[boardX][boardY].squares = newSquares;
    // let hasWinner = this.checkWin(newSquares);
    // if (hasWinner != null) {
    //   this.setState({
    //   ...this.state,
    //   squares: newSquares,
    //   currentTurn: hasWinner,
    //    hasWinner: true
    // });
    // } else {
      const nextTurn = this.state.currentTurn === 'X' ? 'O' : 'X';
      this.setState({
        ...this.state,
        boards: newBoards,
        currentTurn: nextTurn,
      });
    // }
  };
  
  renderBoard = (x, y) => {
    return (<Board boardInfo={this.state.boards[x,y]}
              onClick={(squareX, squareY) => this.handleClick(x, y, squareX, squareY)}
              />)
  };
  
  render() {
    let status = undefined;
    if (this.state.hasWinner) {
      status = this.state.currentTurn + " has won!"
      return (
        <div className="winning-letter">{this.state.currentTurn}</div>
      )
    } else {
      status = `Next player: ${this.state.currentTurn}`;
    }
      
    return (
      <div className="game">
        <div className="status">{status}</div>
        <div className="game-board">
          <div className="board-row">
            {this.renderBoard(0,0)}
            {this.renderBoard(1,0)}
            {this.renderBoard(2,0)}
          </div>
          <div className="board-row">
            {this.renderBoard(1,0)}
            {this.renderBoard(1,1)}
            {this.renderBoard(1,2)}
          </div>
          <div className="board-row">
            {this.renderBoard(2,0)}
            {this.renderBoard(2,1)}
            {this.renderBoard(2,2)}
          </div>
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
