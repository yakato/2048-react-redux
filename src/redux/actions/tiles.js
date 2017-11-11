import {
  CREATE_TILE,
  MOVE_TILES,
} from '../reducers/constants'

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
