export const CREATE_TILE = 'CREATE_TILE'
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD'
export const MOVE_TILE = 'MOVE_TILE'

export function initializeBoard(tileId) {
  return (dispatch) => { dispatch({ type: INITIALIZE_BOARD }) }
}

export function createTile(tileId) {
  return (dispatch) => { dispatch({ type: CREATE_TILE }) }
}

export function moveTile(tileId) {
  return (dispatch) => { dispatch({ type: MOVE_TILE }) }
}
