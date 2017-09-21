import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moveTiles, createTile } from '../../redux/actions/tiles'
import Board from './Board'
import styles from './styles.scss'

class App extends Component {

  handleKeyDown(event) {
    event.preventDefault()
    switch(true) {
      case event.keyCode === 37: return this.props.moveTiles('left')
      case event.keyCode === 38: return this.props.moveTiles('up')
      case event.keyCode === 39: return this.props.moveTiles('right')
      case event.keyCode === 40: return this.props.moveTiles('down')
      default: break
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillUpdate(nextProps, nextState) {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

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

export default connect(mapsStateToProps, { moveTiles, createTile })(App)
