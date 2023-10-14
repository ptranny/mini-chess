import { Game } from './model.js'
import { start } from './controller.js'

// Make board tiles (only have to do this once)
const board = document.getElementById('board')
const boardSize = 4

for (let row = 0; row < boardSize; row++) {
  for (let col = 0; col < boardSize; col++) {
    const tile = board.appendChild(document.createElement('div'))
    tile.classList.add('tile')
    tile.id = row.toString() + col.toString()

    if ((row + col) % 2 === 0) tile.classList.add('grey')
  }
}

start(
  new Game([
    [null, 'bk', 'bq', null],
    [null, null, null, null],
    [null, null, null, null],
    [null, 'wq', 'wk', null],
  ])
)
