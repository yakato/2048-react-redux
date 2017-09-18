import {
  CREATE_TILE,
  INITIALIZE_BOARD,
  MOVE_TILE
} from '../actions/tiles'

const initialState = {
  tilesById: {},
  emptyCells: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case INITIALIZE_BOARD:
      const emptyPositions = []
      for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
          emptyPositions.push({ x: i, y: j })
        }
      }
      return { ...state, emptyCells: emptyPositions }

    case CREATE_TILE:
      const randomEmptyCell = state.emptyCells[Math.floor(Math.random()*state.emptyCells.length)]
      const newEmptyCellsArray = state.emptyCells
      newEmptyCellsArray.splice(newEmptyCellsArray.indexOf(randomEmptyCell),1)
      const size = Object.keys(state.tilesById).length
      const id = size ? size + 1 : 1
      const newTile = {
        x: randomEmptyCell.x,
        y: randomEmptyCell.y,
        value: '2'
      }
      return {
        ...state,
        emptyCells: newEmptyCellsArray,
        tilesById : { ...state.tilesById, [id]: newTile }
      }

    case MOVE_TILE:

      return state
    default:
      return state
  }
}
