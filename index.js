import { Game } from './model.js'
import { start } from './controller.js'

start(
  new Game([
    [null, 'bk', 'bq', null],
    [null, null, null, null],
    [null, null, null, null],
    [null, 'wq', 'wk', null],
  ])
)
