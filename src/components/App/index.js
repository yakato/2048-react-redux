import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moveTiles } from '../../redux/actions/tiles'
import Board from './Board'
import styles from './styles.scss'

class App extends Component {

  handleTest(e, direction) {
    this.props.moveTiles(direction)
  }

  render() {
    const direction = 'right'
    return (
      <article className={styles.app}>
        <header className={styles.header}>2048 in React</header>
        <button onClick={(e) => this.handleTest(e, direction)}>Test</button>
        <Board />
      </article>
    )
  }
}

export default connect(null, { moveTiles })(App)
