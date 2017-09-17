import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tiles } from '../../redux/actions'
import Board from './Board'
import styles from './styles.scss'

class App extends Component {

  testMoveRight(e) {
    e.preventDefault()
    this.props.moveTile()
  }

  addTile(e) {
    e.preventDefault()
    this.props.createTile()
  }

  render() {
    return (
      <article className={styles.app}>
        <header className={styles.header}>2048 in React</header>
        <button onClick={(e) => this.testMoveRight(e)}>Test</button>
        <button onClick={(e) => this.addTile(e)}>Add</button>
        <Board />
      </article>
    )
  }
}


export default connect(null, tiles)(App)
