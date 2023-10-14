import { Game } from './model.js'
import { start } from './controller.js'

const myGame = new Game([
  [null, 'bk', 'bq', null],
  [null, null, null, null],
  [null, null, null, null],
  [null, 'wq', 'wk', null],
])

// Make board tiles (only have to do this once)
const board = document.getElementById('board')

for (let row = 0; row < myGame.board.length; row++) {
  for (let col = 0; col < myGame.board.length; col++) {
    const tile = board.appendChild(document.createElement('div'))
    tile.classList.add('tile')
    tile.id = row.toString() + col.toString()

    if ((row + col) % 2 === 0) tile.classList.add('grey')
  }
}

start(myGame)
