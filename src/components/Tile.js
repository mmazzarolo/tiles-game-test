import React, { Animated, Easing, PropTypes, StyleSheet, Text } from 'react-native'
import { CELL_SIZE, CELL_PADDING, TILE_SIZE, BORDER_RADIUS, LETTER_SIZE } from '../themes/metrics'

export default class Tile extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    col: PropTypes.number,
    row: PropTypes.number,
    isActive: PropTypes.bool,
    onPress: PropTypes.func
  }

  state = {
    tilt: new Animated.Value(0)
  }

  shouldComponentUpdate (nextProps) {
    return !(this.props.isActive === nextProps.isActive)
  }

  _handleTap = () => {
    const tilt = this.state.tilt
    tilt.setValue(1) // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start(() => this.props.onPress(this.props.id))
    // }).start()
    // this.props.onPress(this.props.id)
  }

  _renderEmptyTile = () => {
    const { col, row } = this.props
    const tileStyle = {
      position: 'absolute',
      left: col * CELL_SIZE + CELL_PADDING,
      top: row * CELL_SIZE + CELL_PADDING,
      width: TILE_SIZE,
      height: TILE_SIZE,
      borderRadius: BORDER_RADIUS
    }

    return (
      <Animated.View style={tileStyle} onStartShouldSetResponder={this._handleTap} />
    )
  }

  _renderFullTile = () => {
    const { id, col, row } = this.props
    const perspective = CELL_SIZE * 8
    const rotateX = this.state.tilt.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-40deg']
    })
    const tileStyle = {
      position: 'absolute',
      left: col * CELL_SIZE + CELL_PADDING,
      top: row * CELL_SIZE + CELL_PADDING,
      width: TILE_SIZE,
      height: TILE_SIZE,
      borderRadius: BORDER_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#BEE1D2',
      elevation: 4,
      transform: [{ perspective }, { rotateX }]
    }

    return (
      <Animated.View style={tileStyle} onStartShouldSetResponder={this._handleTap}>
        <Text style={styles.text}>{id}</Text>
      </Animated.View>
    )
  }

  render () {
    console.log(`render tile ${this.props.id}`)
    const { isActive } = this.props
    return isActive ? this._renderFullTile() : this._renderEmptyTile()
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent'
  }
})
