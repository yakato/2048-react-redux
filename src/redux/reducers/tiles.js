import {
  CREATE_TILE,
  ADD_NEW_TILE
} from '../actions/tiles'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TILE:
      const newTile = { id: action.payload.tileId, value: ''}
        return [...state, newTile]

    case ADD_NEW_TILE:
      const filterEmptyTiles = state.filter(tile => {
        return tile.value === ''
      })
      const randomEmptyTile = filterEmptyTiles[Math.floor(Math.random()*filterEmptyTiles.length)]
      randomEmptyTile.value = 2
      return [ ...state ]

    default:
      return state
  }
}
