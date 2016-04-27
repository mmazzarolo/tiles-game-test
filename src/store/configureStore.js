import { createStore, applyMiddleware } from 'redux'
import R from 'ramda'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/'
import sagaMiddleware from 'redux-saga'
import sagas from '../sagas/'

const IS_DEBUGGING = __DEV__

// Silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE']

// Seamless-Immutable logger cleanup
const stateTransformer = (state) => {
  if (typeof state === 'object' && state !== null && Object.keys(state).length) {
    let newState = {}
    for (var i of Object.keys(state)) {
      if (state[i].asMutable) newState[i] = state[i].asMutable({ deep: true })
      else newState[i] = state[i]
    }
    return newState
  } else {
    return state
  }
}

// Create the logger
const logger = createLogger({
  collapsed: true,
  predicate: (getState, { type }) => IS_DEBUGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST)),
  stateTransformer
})

// A function which can create our store and auto-persist the data
export default () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      logger, sagaMiddleware(...sagas)
    )
  )

  return store
}
