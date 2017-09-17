import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tiles } from '../../../redux/actions'
import styles from './styles.scss'

class Tile extends Component {
  generateClass (value) {
    return value ? `tile${value}` : ''
  }

  componentWillMount() {
    this.props.createTile(this.props.id)
  }

  render() {
    const classForNumber = this.props.value ? styles[this.generateClass(this.props.value)] : ''
    return (
      <div id={this.props.id} className={styles.tile + ' ' + classForNumber}>
        {this.props.value}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.tiles[ownProps.id] ? state.tiles[ownProps.id].value : ''
  }
}

export default  connect(mapStateToProps, tiles)(Tile)
