import Immutable from 'seamless-immutable'
import Types from '../actions/types'
import createReducer from '../reducers/createReducer'
import { BOARD_ROWS, BOARD_COLUMNS } from '../config/board'
import { times, leadingZero } from '../utils'

let tiles = {}
times(BOARD_ROWS * BOARD_COLUMNS, (n) => {
  const id = leadingZero(n + 1)
  const isActive = false
  const row = Math.floor(n / BOARD_COLUMNS)
  const col = Math.floor(n % BOARD_COLUMNS)
  const tile = { id, col, row, isActive }
  tiles[id] = tile
})

export const INITIAL_STATE = Immutable({
  tiles
})

const turnOnTile = (state, { tileId }) =>
  state.setIn(['tiles', tileId, 'isActive'], true)

const turnOffTile = (state, { tileId }) =>
  state.setIn(['tiles', tileId, 'isActive'], false)

const ACTION_HANDLERS = {
  [Types.TURN_ON_TILE]: turnOnTile,
  [Types.TURN_OFF_TILE]: turnOffTile
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
