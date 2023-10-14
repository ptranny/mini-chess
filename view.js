import { lookup } from './model.js'

// ------------- VIEW ------------- //
export function makeBoard(game) {
  const board = document.getElementById('board')

  for (let row = 0; row < game.board.length; row++) {
    for (let col = 0; col < game.board.length; col++) {
      const tile = board.appendChild(document.createElement('div'))
      tile.classList.add('tile')
      tile.id = row.toString() + col.toString()

      if ((row + col) % 2 === 0) tile.classList.add('grey')
    }
  }
}

export function render(game) {
  // Move on-screen pieces based on game state
  // Create pieces if they don't already exist e.g. on first render() call
  for (let row = 0; row < game.board.length; row++) {
    for (let col = 0; col < game.board.length; col++) {
      const pieceId = game.board[row][col]

      if (pieceId) {
        const tileId = row.toString() + col.toString()
        const tile = document.getElementById(tileId)
        const piece = tile.appendChild(
          document.getElementById(pieceId) || createPiece(pieceId)
        )

        // Toggle the draggable attribute for pieces according to which player is active
        // Add a 'draggable' class for styling purposes
        if (lookup[pieceId].player === game.activePlayer) {
          piece.draggable = true
          piece.classList.add('draggable')
        } else {
          piece.draggable = false
          piece.classList.remove('draggable')
        }
      }
    }
  }

  // Display active player
  document.getElementById(
    'player'
  ).innerText = `Current player: ${game.activePlayer}`
}

function createPiece(pieceId) {
  const piece = document.createElement('img')
  piece.src = lookup[pieceId].image
  piece.id = pieceId
  piece.classList.add('piece')

  return piece
}
