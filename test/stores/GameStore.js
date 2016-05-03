import test from 'ava'
import GameStore from '../../src/stores/GameStore'

test(t => {
  const gameStore = new GameStore()
  const tilesLength = gameStore.tiles.length
  t.is(tilesLength, 24)
})
