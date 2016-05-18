import { observable } from 'mobx'
import _ from 'lodash/fp'
import Tile from '../models/TileModel'
import { BOARD_ROWS, BOARD_COLUMNS } from '../config/board'
import { times, delay } from '../utils'
import {
  STARTING_HEARTS,
  STARTING_SCORE,
  STARTING_DIFFICULTY,
  DIFFICULTY_INCREMENT_STEP,
  DIFFICULTY_CYCLE_MILLISECONDS
} from '../config/game'

export default class GameStore {
  @observable tiles = []
  @observable hearts = STARTING_HEARTS
  @observable score = STARTING_SCORE
  @observable difficulty = STARTING_DIFFICULTY
  @observable isPlaying = false

  constructor () {
    times(BOARD_ROWS * BOARD_COLUMNS, (n) => {
      const id = n
      const isActive = false
      const row = Math.floor(n / BOARD_COLUMNS)
      const col = Math.floor(n % BOARD_COLUMNS)
      const tile = new Tile(this, id, row, col, isActive)
      this.tiles.push(tile)
    })
  }

  startGame = () => {
    this.isPlaying = true
    this.startDifficultyCycle()
    this.startSpawningTilesCycle()
  }

  getIsPlaying = () => {
    return this.isPlaying
  }

  startSpawningTilesCycle = async () => {
    while (this.isPlaying) {
      await delay(1000 - (100 * this.difficulty))
      this.startRandomTile()
    }
  }

  startDifficultyCycle = async () => {
    while (this.isPlaying) {
      await delay(DIFFICULTY_CYCLE_MILLISECONDS)
      this.difficulty += DIFFICULTY_INCREMENT_STEP
    }
  }

  incrementScore = () => {
    this.score ++
  }

  popOneHeart = () => {
    this.hearts --
  }

  startRandomTile = () => {
    const emptyTiles = this.getEmptyTiles()
    const randomEmptyTile = emptyTiles[_.random(0, emptyTiles.length - 1)]
    if (randomEmptyTile) this.tiles[randomEmptyTile.id].start()
  }

  getEmptyTiles = () => {
    return _.filter(['isActive', false])(this.tiles)
  }

}
