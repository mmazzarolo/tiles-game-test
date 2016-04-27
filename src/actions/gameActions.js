import createAction from '../actions/createAction'
import Types from '../actions/types'

const turnOnTile = (tileId) =>
  createAction(Types.TURN_ON_TILE, { tileId })

const turnOffTile = (tileId) =>
  createAction(Types.TURN_OFF_TILE, { tileId })

const startSpawningTiles = () =>
  createAction(Types.TILES_SPAWN_REQUEST)

export default {
  turnOnTile,
  turnOffTile,
  startSpawningTiles
}
