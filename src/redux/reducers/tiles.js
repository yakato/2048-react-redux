import {
  CREATE_TILE,
  INITIALIZE_BOARD,
  MOVE_TILES
} from '../actions/tiles'

const initialState = {
  tilesById: {},
  emptyCells: [],
  numberOfTiles: 0,
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
      const id = state.numberOfTiles + 1
      const newTile = {
        x: randomEmptyCell.x,
        y: randomEmptyCell.y,
        value: '2'
      }
      return {
        ...state,
        emptyCells: newEmptyCellsArray,
        tilesById : { ...state.tilesById, [id]: newTile },
        numberOfTiles: id
      }

    case MOVE_TILES:
      const updatedTiles = state.tilesById
      Object.keys(updatedTiles).map((key, index) =>  {
        return console.log(updatedTiles[key].x, updatedTiles[key].y)
      })
      return state
    default:
      return state
  }
}
