import { take, put, call, select } from 'redux-saga/effects'
import _ from 'lodash'
import Types from '../actions/types'
import Actions from '../actions'
import { delay } from '../utils'
import { getEmptyTilesArray } from '../selectors/tilesSelector'

export function * watchTilesSpawnRequest () {
  while (yield take(Types.TILES_SPAWN_REQUEST)) {
    while (true) {
      // const {stop, tick} = yield race({
      //   stop: take('STOP'),
      //   tick: call(wait, ONE_SECOND)
      // })
      // if ( !stop ) {
      // yield put(Actions.tick())
      // } else {
      //   break;
      // }
      yield call(delay, 1000)
      const emptyTiles = yield select(getEmptyTilesArray)
      const randomEmptyTile = emptyTiles[_.random(0, emptyTiles.length - 1)]
      if (randomEmptyTile) {
        yield put(Actions.turnOnTile(randomEmptyTile.id))
      }
    }
  }
}
