import React, { View } from 'react-native'
import GameBoard from './containers/GameBoard'
import GameStore from './stores/GameStore'

const gameStore = new GameStore()

export default class FasterFaster extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <GameBoard gameStore={gameStore} />
      </View>
    )
  }
}
