import { makeBoard, render } from './view.js'

// ---------- CONTROLLER ---------- //
export function start(game) {
  makeBoard(game)
  render(game)
  bindTiles(game)
  bindPieces()
}

function bindPieces() {
  const pieces = document.getElementsByClassName('piece')

  for (const piece of pieces) {
    piece.ondragstart = handleDragStart
  }

  // Send the piece ID through the drag/drop API
  // This will be used later by the drop event so that we know which piece was being dragged
  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id)
  }
}

function bindTiles(game) {
  const tiles = document.getElementsByClassName('tile')

  for (const tile of tiles) {
    tile.ondragover = handleDragOver
    tile.ondrop = handleDrop
  }

  // This listener allows tiles to become drop targets
  function handleDragOver(e) {
    e.preventDefault()
  }

  // Main game loop happens here
  function handleDrop(e) {
    // Make sure the user is dropping into an empty tile
    if (!e.currentTarget.hasChildNodes()) {
      // Get the id of the piece being moved
      const pieceId = e.dataTransfer.getData('text/plain')

      // Get the starting coordinates
      // String coordinates have been converted to array coordinates e.g. e.g. '00' to [0,0]
      const currentTile = document
        .getElementById(pieceId)
        .parentNode.id.split('')
        .map((element) => Number(element))

      // Get the coordinates where the user is attempting to drop the piece
      const nextTile = e.currentTarget.id
        .split('')
        .map((element) => Number(element))

      // Update game state
      game.update(pieceId, currentTile, nextTile)

      // Update UI
      render(game)
    }
  }
}
