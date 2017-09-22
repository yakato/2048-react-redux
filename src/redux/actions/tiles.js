import {
  CREATE_TILE,
  INITIALIZE_BOARD,
  MOVE_TILES,
} from '../reducers/constants'

export function initializeBoard() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_BOARD })
  }
}

export function createTile() {
  return (dispatch) => {
    dispatch({ type: CREATE_TILE })
  }
}

export function moveTiles(direction) {
  return (dispatch) => {
    dispatch({ type: MOVE_TILES, payload: { direction } })
  }
}
