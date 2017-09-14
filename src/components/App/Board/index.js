import React, { Component } from 'react'

import Tile from '../Tile'
import styles from './styles.scss'

class Board extends Component {
  render() {
    return (
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
        </div>
      </div>
    )
  }
}

export default Board
