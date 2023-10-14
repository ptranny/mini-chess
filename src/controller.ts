import { makeBoard, render } from './view.js'
import { Game } from './model.js'
import type { Coordinate } from './model.js'

// ---------- CONTROLLER ---------- //
export function start(game: Game) {
  makeBoard(game)
  render(game)
  bindTiles(game)
  bindPieces()
}

function bindPieces() {
  const pieces = document.getElementsByClassName(
    'piece'
  ) as HTMLCollectionOf<HTMLElement>

  for (const piece of pieces) {
    piece.ondragstart = handleDragStart
  }

  // Send the piece ID through the drag/drop API
  // This will be used later by the drop event so that we know which piece was being dragged
  function handleDragStart(e: DragEvent) {
    e.dataTransfer?.setData('text/plain', (e.target! as HTMLElement).id)
  }
}

function bindTiles(game: Game) {
  const tiles = document.getElementsByClassName(
    'tile'
  ) as HTMLCollectionOf<HTMLElement>

  for (const tile of tiles) {
    tile.ondragover = handleDragOver
    tile.ondrop = handleDrop
  }

  // This listener allows tiles to become drop targets
  function handleDragOver(e: DragEvent) {
    e.preventDefault()
  }

  // Main game loop happens here
  function handleDrop(e: DragEvent) {
    // Make sure the user is dropping into an empty tile
    if (!(e.currentTarget as HTMLElement).hasChildNodes()) {
      // Get the id of the piece being moved
      const pieceId = e.dataTransfer!.getData('text/plain')

      // Get the starting coordinates
      // String coordinates have been converted to array coordinates e.g. e.g. '00' to [0,0]
      const currentTile = (
        document.getElementById(pieceId)!.parentNode as HTMLElement
      ).id
        .split('')
        .map((element) => Number(element)) as Coordinate

      // Get the coordinates where the user is attempting to drop the piece
      const nextTile = (e.currentTarget as HTMLElement).id
        .split('')
        .map((element: string) => Number(element)) as Coordinate

      // Update game state
      game.update(pieceId, currentTile, nextTile)

      // Update UI
      render(game)
    }
  }
}
