import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tiles } from '../../../redux/actions'
import Cell from '../Cell'
import Tile from '../Tile'
import styles from './styles.scss'

class Board extends Component {
  componentWillMount() {
    this.props.initializeBoard()
    this.props.createTile()
  }

  renderTiles() {
    const tiles = this.props.tiles
    for (const key of Object.keys(this.props.tiles)) {
      return <Tile value={tiles[key].value} x={tiles[key].x} y={tiles[key].y}/>
    }

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
    tiles: state.tiles.tilesById
  }
}

export default connect(mapStateToProps, tiles)(Board)
