import React, { Component } from 'react'
import { connect } from 'react-redux'

import Tile from '../Tile'
import { tiles } from '../../../redux/actions'

import styles from './styles.scss'

class Board extends Component {

  componentDidMount() {
    this.props.addNewTile()
  }

  render() {
    return (
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
        {[...Array(16)].map((x, i) =>
          <Tile id={i + 1} key={i} />
        )}
        </div>
      </div>
    )
  }
}

export default connect(null, tiles)(Board)
