import _ from 'lodash'

export const getTilesArray = (state) => {
  let tiles = []
  Object.keys(state.game.tiles).sort().forEach((tileId) => tiles.push(state.game.tiles[tileId]))
  tiles.sort()
  return tiles
}

export const getEmptyTilesArray = (state) => {
  const tiles = getTilesArray(state)
  return _.filter(tiles, ['isActive', false])
}
