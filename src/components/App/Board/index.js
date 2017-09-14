import React, { Component } from 'react'

import Tile from '../Tile'
import styles from './styles.scss'

class Board extends Component {
  render() {
    return (
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          <Tile value="2"/>
          <Tile value="4"/>
          <Tile value="8"/>
          <Tile value="16"/>
          <Tile value="32"/>
          <Tile value="64"/>
          <Tile value="128"/>
          <Tile value="256"/>
          <Tile value="512"/>
          <Tile value="1024"/>
          <Tile value="2048"/>
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
