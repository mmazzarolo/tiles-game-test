import React, { PropTypes, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../actions'
import Tile from '../components/Tile'
import { BOARD_ROWS, BOARD_COLUMNS } from '../config/board'
import { CELL_SIZE } from '../themes/metrics'
import { getTilesArray } from '../selectors/tilesSelector'

const mapStateToProps = (state) => ({
  tiles: getTilesArray(state)
})

class GameBoard extends React.Component {
  static propTypes = {
    tiles: PropTypes.array,
    startSpawningTiles: PropTypes.func,
    turnOffTile: PropTypes.func
  }

  componentDidMount () {
    const { startSpawningTiles } = this.props
    startSpawningTiles()
  }

  _handleTilePress = (id) => {
    const { turnOffTile } = this.props
    console.log(`Premuto su tile ${id}`)
    turnOffTile(id)
  }

  _renderTile = (tile) => {
    const { id, col, row, isActive } = tile
    return (
      <Tile
        key={id}
        id={id}
        col={col}
        row={row}
        isActive={isActive}
        onPress={this._handleTilePress}
      />
    )
  }

  render () {
    const { tiles } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {tiles.map(this._renderTile)}
        </View>
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

export default connect(mapStateToProps, Actions)(GameBoard)
