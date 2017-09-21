import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initializeBoard, createTile } from '../../../redux/actions/tiles'
import Cell from '../Cell'
import Tile from '../Tile'
import styles from './styles.scss'

class Board extends Component {
  componentWillMount() {
    this.props.initializeBoard()
    this.props.createTile()
  }

  componentWillReceiveProps(nextProps) {
    return nextProps.tilesHasBeenMoved === true ? setTimeout(() => this.props.createTile(), 500) : null
  }

  renderTiles() {
    const { tiles } = this.props
    return Object.keys(tiles).map((key, index) =>  {
      return <Tile key={index} value={tiles[key].value} x={tiles[key].x} y={tiles[key].y} />
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
    tilesHasBeenMoved: state.tiles.tilesHasBeenMoved
  }
}

export default connect(
  mapStateToProps,
  {
    initializeBoard,
    createTile
  }
)(Board)
