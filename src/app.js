import React, { View } from 'react-native'
import GameBoard from './containers/GameBoard'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

export default class FasterFaster extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <GameBoard />
        </Provider>
      </View>
    )
  }
}
