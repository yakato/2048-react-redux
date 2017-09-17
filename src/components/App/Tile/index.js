import React, { Component } from 'react'

import { tiles } from '../../../redux/actions'
import styles from './styles.scss'

class Tile extends Component {
  generateClass (value) {
    return value ? `tile${value}` : ''
  }

  render() {
    const classForNumber = this.props.value ? styles[this.generateClass(this.props.value)] : ''
    return (
      <div className={styles.tile + ' ' + classForNumber}>
        {this.props.value}
      </div>
    )
  }
}

export default Tile
