export const CREATE_TILE = 'CREATE_TILE'
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD'
export const MOVE_TILE = 'MOVE_TILE'

export function initializeBoard(tileId) {
  return ({ type: INITIALIZE_BOARD })
}

export function createTile(tileId) {
  return ({ type: CREATE_TILE })
}

export function moveTile(tileId) {
  return ({ type: MOVE_TILE })
}
