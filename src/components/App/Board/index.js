import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createTile, moveTiles } from '../../../redux/actions/tiles'
import { RIGHT, LEFT, UP, DOWN } from '../../../redux/reducers/constants'
import Cell from '../Cell'
import Tile from '../Tile'
import styles from './styles.scss'

let pause = false

class Board extends Component {

  componentWillMount() {
    this.props.createTile()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    return nextProps.tilesHasBeenMoved === true ? setTimeout(this.props.createTile, 500) : null
  }

  handleKeyDown(event) {
    if (pause) return
    pause = true
    setTimeout(() => pause = false, 500)
    switch(event.keyCode) {
      case 37: return this.props.moveTiles(LEFT)
      case 38: return this.props.moveTiles(UP)
      case 39: return this.props.moveTiles(RIGHT)
      case 40: return this.props.moveTiles(DOWN)
      default: break
    }
  }

  renderTiles() {
    const { tiles } = this.props
    return Object.keys(tiles).map((key, index) =>  {
      return <Tile key={key} value={tiles[key].value} x={tiles[key].x} y={tiles[key].y} />
    })
  }

  render() {
    return (
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
        {[...Array(16)].map((x, i) =>
          <Cell key={i} />
        )}
        {this.renderTiles()}
        </div>
      </div>
    )
  }
}

Board.defaultProps = {
  tiles: {}
}

const mapStateToProps = (state) => {
  return {
    tiles: state.tiles.tilesById,
    tilesHasBeenMoved: state.tiles.tilesHasBeenMoved,
    currentTurn: state.tiles.currentTurn,
  }
}

export default connect(
  mapStateToProps,
  {
    createTile,
    moveTiles,
  }
)(Board)
