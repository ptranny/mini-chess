// ------------ MODEL ------------ //
type Piece = {
  player: string
  image: string
  rule?: (currentTile: Coordinate, nextTile: Coordinate) => boolean
}

interface Dictionary<T> {
  [key: string]: T
}

export const lookup: Dictionary<Piece> = {
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
type Board = (string | null)[][]
export type Coordinate = [number, number]

export class Game {
  board: Board
  activePlayer: string = 'black'

  constructor(startingBoard: Board) {
    this.board = startingBoard
  }

  update = (pieceId: string, currentTile: Coordinate, nextTile: Coordinate) => {
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

function isLegalMove(
  pieceId: string,
  currentTile: Coordinate,
  nextTile: Coordinate
) {
  // If the piece has a specific rule then return the result of that rule
  // If no specific rule exists the move is allowed by default
  return lookup[pieceId].hasOwnProperty('rule')
    ? lookup[pieceId].rule?.(currentTile, nextTile)
    : true
}

// MOVEMENT RULES

// Kings can move one square in any direction
function king(currentTile: Coordinate, nextTile: Coordinate) {
  const [currentRow, currentCol] = currentTile
  const [nextRow, nextCol] = nextTile

  return (
    Math.abs(currentRow - nextRow) <= 1 && Math.abs(currentCol - nextCol) <= 1
  )
}
