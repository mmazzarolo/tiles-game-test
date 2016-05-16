import React, { PropTypes, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'
import Tile from '../components/Tile'
import { BOARD_ROWS, BOARD_COLUMNS } from '../config/board'
import { CELL_SIZE } from '../themes/metrics'

@observer
export default class GameBoard extends React.Component {
  static propTypes = {
    gameStore: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { startGame } = this.props.gameStore
    startGame()
  }

  _handleTilePress = (tile) => {
    console.log(`Pressed tile ${tile.id}`)
    tile.stop()
  }

  _renderTile = (tile) => {
    return <Tile key={tile.id} {...tile} onPress={() => this._handleTilePress(tile)} />
  }

  render () {
    const { tiles, score, hearts } = this.props.gameStore
    return (
      <View style={styles.container}>
        <Text>{score}</Text>
        <View style={styles.board}>
          {tiles.map(this._renderTile)}
        </View>
        <Text>{hearts}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  board: {
    width: CELL_SIZE * BOARD_COLUMNS,
    height: CELL_SIZE * BOARD_ROWS,
    backgroundColor: 'transparent'
  }
})
