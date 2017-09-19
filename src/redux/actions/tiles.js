export const CREATE_TILE = 'CREATE_TILE'
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD'
export const MOVE_TILES = 'MOVE_TILES'

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
