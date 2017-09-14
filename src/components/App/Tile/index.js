import React, { Component } from 'react'

import styles from './styles.scss'

class Tile extends Component {

  generateClass (value) {
    return value ? `tile${value}` : ''
  }

  render() {
    const tileNumber = this.generateClass(this.props.value)
    return (
      <div className={styles.tile + ' ' + styles[tileNumber]}>
        {this.props.value}
      </div>
    )
  }
}

export default Tile
