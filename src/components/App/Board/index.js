import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initializeBoard, createTile, moveTiles } from '../../../redux/actions/tiles'
import Cell from '../Cell'
import Tile from '../Tile'
import styles from './styles.scss'

class Board extends Component {

  constructor(props) {
    super(props)
    this.keyPressed = false
  }

  componentWillMount() {
    this.props.initializeBoard()
    this.props.createTile()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    return nextProps.tilesHasBeenMoved === true ? setTimeout(this.props.createTile, 500) : null
  }

  componentDidUpdate() {
    this.keyPressed = false
  }

  handleKeyDown(event) {
    console.log(this.keyPressed)
    if(this.keyPressed) {
      return;
    } else {
      switch(event.keyCode) {
        case 37: return this._moveTiles('left', event)
        case 38: return this._moveTiles('up', event)
        case 39: return this._moveTiles('right', event)
        case 40: return this._moveTiles('down', event)
        default: break
      }
    }
  }

  _moveTiles(direction, event) {
    event.preventDefault()
    this.keyPressed = true
    this.props.moveTiles(direction)
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
    initializeBoard,
    createTile,
    moveTiles,
  }
)(Board)
