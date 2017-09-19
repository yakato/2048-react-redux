import {
  CREATE_TILE,
  INITIALIZE_BOARD,
  MOVE_TILES
} from '../actions/tiles'

const initialState = {
  tilesById: {},
  tilesByColumn: {
    1: [],
    2: [],
    3: [],
    4: [],
  },
  tilesByRow: {
    1: [],
    2: [],
    3: [],
    4: [],
  },
  tilesByPosition: {},
  emptyCells: [],
  numberOfTiles: 0,
}

const getTileById = (state, tileId) => (state.tilesById[tileId])
const generatePositionKey = (x,y) => (`${x}::${y}`)

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
      const newEmptyCellsArray = [ ...state.emptyCells ]
      newEmptyCellsArray.splice(newEmptyCellsArray.indexOf(randomEmptyCell),1)
      const id = state.numberOfTiles + 1
      const newTile = {
        x: randomEmptyCell.x,
        y: randomEmptyCell.y,
        value: '2',
        id: id,
      }
      const position = generatePositionKey(newTile.x, newTile.y)
      return {
        ...state,
        emptyCells: newEmptyCellsArray,
        tilesById : {
          ...state.tilesById,
          [id]: newTile
        },
        numberOfTiles: id,
        tilesByRow: {
          ...state.tilesByRow,
          [newTile.x]: [...state.tilesByRow[newTile.x], id]
        },
        tilesByColumn: {
          ...state.tilesByColumn,
          [newTile.y]: [...state.tilesByColumn[newTile.y], id]
        },
        tilesByPosition: {
          ...state.tilesByPosition,
          [position]: id
        }
      }

    case MOVE_TILES:
      const direction = action.payload.direction
      const newState = { ...state }
      if(direction === 'right') {
        //y 321
        for (let y = 3; y > 0; y--) {
          newState.tilesByColumn[y].forEach((tileId) => {
            let currentTile = getTileById(newState, tileId)
            if(currentTile) {
              while(currentTile.y + 1 <= 4 && !newState.tilesByPosition[generatePositionKey(currentTile.x, currentTile.y+1)]) {
                const oldPosition = generatePositionKey(currentTile.x, currentTile.y)
                newState.emptyCells = [ ...newState.emptyCells, { x: currentTile.x, y: currentTile.y } ]

                currentTile.y = currentTile.y + 1

                newState.emptyCells = newState.emptyCells.filter((obj) => JSON.stringify(obj) !== JSON.stringify({ x: currentTile.x, y: currentTile.y }))
                const newPosition = generatePositionKey(currentTile.x, currentTile.y)
                //remove unused positions
                newState.tilesByPosition[oldPosition] = undefined
                //remove currentTile from previous position
                newState.tilesByColumn[y] = newState.tilesByColumn[y].filter((id) => id !== currentTile.id)
                //add to current columns
                newState.tilesByColumn[currentTile.y] = [ ...newState.tilesByColumn[currentTile.y], currentTile.id ]
                //update positions
                newState.tilesByPosition[newPosition] = currentTile.id
              }
            }
          })
        }
      }
      return newState
    default:
      return state
  }
}
