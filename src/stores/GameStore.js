import { observable } from 'mobx'
import _ from 'lodash/fp'
import Tile from '../models/TileModel'
import { BOARD_ROWS, BOARD_COLUMNS } from '../config/board'
import { times, delay } from '../utils'

export default class GameStore {
  @observable tiles = []
  @observable score = 0
  @observable hearts = 5
  @observable difficulty = 100
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
    this._startDifficultyCycle()
    this._startSpawningTilesCycle()
  }

  getIsPlaying = () => {
    return this.isPlaying
  }

  _startSpawningTilesCycle = async () => {
    while (this.isPlaying) {
      await delay(1000 - this.difficulty)
      this._startRandomTile()
    }
  }

  _startDifficultyCycle = async () => {
    while (this.isPlaying) {
      await delay(50)
      this.difficulty += 100
    }
  }

  incrementScore = () => {
    this.score ++
  }

  popOneHeart = () => {
    this.hearts --
  }

  _startRandomTile = () => {
    const emptyTiles = this._getEmptyTiles()
    const randomEmptyTile = emptyTiles[_.random(0, emptyTiles.length - 1)]
    if (randomEmptyTile) this.tiles[randomEmptyTile.id].start()
  }

  _getEmptyTiles = () => {
    return _.filter(['isActive', false])(this.tiles)
  }

}
