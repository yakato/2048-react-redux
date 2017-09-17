import React, { Component } from 'react'

import styles from './styles.scss'

class Tile extends Component {
  generateClass (value) {
    return value ? `tile${value}` : ''
  }

  calculatePosition(x, y) {
    const top = (x - 1) * 100 + 10 * x
    const left = (y - 1) * 100 + 10 * y
    return { top, left }
  }

  render() {
    const { x, y, value } = this.props
    const { top, left } = this.calculatePosition(x,y)
    const classForNumber = this.props.value ? styles[this.generateClass(this.props.value)] : ''
    return (
      <div style={{top: top + 'px', left: left + 'px'}} className={styles.tile + ' ' + classForNumber}>
        {value}
      </div>
    )
  }
}

export default Tile
