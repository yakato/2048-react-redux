import React, { Component } from 'react'

import Cell from '../Cell'
import styles from './styles.scss'

class Board extends Component {

  render() {
    return (
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
        {[...Array(16)].map((x, i) =>
          <Cell key={i} />
        )}
        </div>
      </div>
    )
  }
}

export default Board
