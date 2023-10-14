// ------------ MODEL ------------ //
export const lookup = {
  bk: {
    player: 'black',
    image: 'images/bk.png',
    rule: king,
  },
  bq: {
    player: 'black',
    image: 'images/bq.png',
  },
  wk: {
    player: 'white',
    image: 'images/wk.png',
    rule: king,
  },
  wq: {
    player: 'white',
    image: 'images/wq.png',
  },
}

// The Game constructor function makes a new object that stores the state of the current game
// State includes the position of the pieces on the board and the current active player
export function Game(startingBoard) {
  this.activePlayer = 'black'
  this.board = startingBoard

  this.update = (pieceId, currentTile, nextTile) => {
    // Make sure move is allowed according to the rule for the piece
    if (isLegalMove(pieceId, currentTile, nextTile)) {
      // Change state to reflect new location of the piece
      const [nextRow, nextCol] = nextTile
      const [currentRow, currentCol] = currentTile

      this.board[nextRow][nextCol] = this.board[currentRow][currentCol]
      this.board[currentRow][currentCol] = null

      // Switch player
      this.activePlayer = this.activePlayer === 'black' ? 'white' : 'black'
    }
  }
}

// currentTile and nextTile are array coordinates like [0, 0]
function isLegalMove(pieceId, currentTile, nextTile) {
  // If the piece has a specific rule then return the result of that rule
  // If no specific rule exists the move is allowed by default
  return lookup[pieceId].hasOwnProperty('rule')
    ? lookup[pieceId].rule(currentTile, nextTile)
    : true
}

// MOVEMENT RULES

// Kings can move one square in any direction
function king(currentTile, nextTile) {
  const [currentRow, currentCol] = currentTile
  const [nextRow, nextCol] = nextTile

  return (
    Math.abs(currentRow - nextRow) <= 1 && Math.abs(currentCol - nextCol) <= 1
  )
}
