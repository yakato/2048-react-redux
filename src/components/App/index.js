import React, { Component } from 'react'

import Board from './Board'
import styles from './styles.scss'

class App extends Component {
  render() {
    return (
      <article className={styles.app}>
        <header className={styles.header}>2048 in React</header>
        <Board />
      </article>
    )
  }
}

export default App
