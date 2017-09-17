export const ADD_NEW_TILE = 'ADD_NEW_TILE'
export const CREATE_TILE = 'CREATE_TILE'

export function createTile(tileId) {
  return (dispatch) => {
    dispatch({
      type: CREATE_TILE,
      payload: { tileId }
    })
  }
}

export function addNewTile() {
  return (dispatch) => {
    dispatch({ type: ADD_NEW_TILE })
  }
}
