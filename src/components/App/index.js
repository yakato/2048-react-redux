import React, { Component } from 'react'

import Board from './Board'
import styles from './styles.scss'

class App extends Component {

  testMove() {

  }

  render() {
    return (
      <article className={styles.app}>
        <header className={styles.header}>2048 in React</header>
        <button onClick={this.testMove}>Test</button>
        <Board />
      </article>
    )
  }
}

export default App
