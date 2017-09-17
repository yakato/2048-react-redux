export const CREATE_TILE = 'CREATE_TILE'
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD'

export function initializeBoard(tileId) {
  return (dispatch) => { dispatch({ type: INITIALIZE_BOARD }) }
}

export function createTile(tileId) {
  return (dispatch) => { dispatch({ type: CREATE_TILE }) }
}
