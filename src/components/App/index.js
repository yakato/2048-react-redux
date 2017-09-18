import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createTile, moveTile } from '../../redux/actions/tiles'
import Board from './Board'
import styles from './styles.scss'

class App extends Component {

  render() {
    return (
      <article className={styles.app}>
        <header className={styles.header}>2048 in React</header>
        <button onClick={this.props.move}>Test</button>
        <button onClick={this.props.createTile}>Add</button>
        <Board />
      </article>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTile: () => {
      dispatch(createTile())
    },

    move: () => {
      dispatch(moveTile())
    }
  }
}


export default connect(
  null,
  mapDispatchToProps
)(App)
