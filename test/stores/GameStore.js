import test from 'ava'
import GameStore from '../../src/stores/GameStore'
import { delay } from '../../src/utils'

test('Should start the game correctly', async t => {
  const gameStore = new GameStore()
  t.false(gameStore.getIsPlaying())
  gameStore.startGame()
  t.true(gameStore.getIsPlaying())
})

test('Should start removing tiles once started', async t => {
  const gameStore = new GameStore()
  const tilesLength = gameStore.tiles.length
  t.is(tilesLength, 24)
  t.is(gameStore._getEmptyTiles().length, 24)
  gameStore.startGame()
  await delay(2000)
  t.true(gameStore._getEmptyTiles().length < 24)
})
