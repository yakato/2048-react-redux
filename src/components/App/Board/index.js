import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initializeBoard, createTile, moveTiles } from '../../../redux/actions/tiles'
import Cell from '../Cell'
import Tile from '../Tile'
import styles from './styles.scss'

class Board extends Component {

  componentWillMount() {
    this.props.initializeBoard()
    this.props.createTile()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    return nextProps.tilesHasBeenMoved === true ? setTimeout(() => this.props.createTile(), 500) : null
  }


  handleKeyDown(event) {
    event.preventDefault()
    switch(true) {
      case event.keyCode === 37: return this.props.moveTiles('left')
      case event.keyCode === 38: return this.props.moveTiles('up')
      case event.keyCode === 39: return this.props.moveTiles('right')
      case event.keyCode === 40: return this.props.moveTiles('down')
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
    tilesHasBeenMoved: state.tiles.tilesHasBeenMoved
  }
}

export default connect(
  mapStateToProps,
  {
    initializeBoard,
    createTile,
    moveTiles,
  }
)(Board)
