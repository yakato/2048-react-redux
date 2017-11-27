import React, { Component } from 'react'

import styles from './styles.scss'

class Tile extends Component {
  generateClass (value) {
    return value ? `tile${value}` : ''
  }

  calculatePosition(x, y) {
    const top = y * 110 + 10
    const left = x * 110 + 10
    return { top, left }
  }

  render() {
    const { x, y, value } = this.props
    const { top, left } = this.calculatePosition(x,y)
    const classForNumber = this.props.value ? styles[this.generateClass(this.props.value)] : ''
    return (
      <div  style={{top: top + 'px', left: left + 'px'}}
            className={styles.tile + ' ' + classForNumber}>
        {value}
      </div>
    )
  }
}

export default Tile
