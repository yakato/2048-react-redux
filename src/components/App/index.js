import React, { Component } from 'react'
import { connect } from 'react-redux'

import Board from './Board'
import styles from './styles.scss'

class App extends Component {

  render() {
    return (
      <article className={styles.app}>
        <header className={styles.header}>2048 in React</header>
        <div className={styles.score}>Score: {this.props.score}</div>
        {this.props.gameOver ?
          <div className={styles.gameOverOverlay}>
            <div className={styles.gameOverTxt}>GameOver</div>
          </div> : null}
        {this.props.maxValue === 2048 ?
          <div className={styles.winOverlay}>
            <div className={styles.winTxt}>Congrats!</div>
          </div> : null}
        <Board />
      </article>
    )
  }
}

const mapsStateToProps = (state) => {
  return {
    gameOver: state.tiles.gameOver,
    score: state.tiles.score,
    maxValue: state.tiles.maxValue
  }
}

export default connect(mapsStateToProps)(App)
