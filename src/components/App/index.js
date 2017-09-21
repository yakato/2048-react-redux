import React, { Component } from 'react'
import { connect } from 'react-redux'

import Board from './Board'
import styles from './styles.scss'

class App extends Component {

  render() {
    return (
      <article className={styles.app}>
        <header className={styles.header}>2048 in React</header>
        {this.props.gameOver ? <div>GameOver</div> : null}
        <Board />
      </article>
    )
  }
}

const mapsStateToProps = (state) => {
  return {
    gameOver: !state.tiles.emptyCells.length
  }
}

export default connect(mapsStateToProps)(App)
