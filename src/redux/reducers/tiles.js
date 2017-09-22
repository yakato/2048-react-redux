import {
  CREATE_TILE,
  INITIALIZE_BOARD,
  MOVE_TILES,
  RIGHT,
  LEFT,
  UP,
  DOWN
} from './constants'

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
  tilesHasBeenMoved: false,
  currentTurn: 0,
}

const getTileById = (state, tileId) => (state.tilesById[tileId])
const generatePositionKey = (x,y) => (`${x}::${y}`)

const calculatePosition = (state, currentTile, vector, axis) => {
  const oldPosition = generatePositionKey(currentTile.x, currentTile.y)
  const oldVar = currentTile[axis]
  state.emptyCells = [ ...state.emptyCells, { x: currentTile.x, y: currentTile.y } ]
  vector === 'plus' ? currentTile[axis] = currentTile[axis] + 1 : currentTile[axis] = currentTile[axis] - 1
  state.emptyCells = state.emptyCells.filter((obj) => obj.x !== currentTile.x || obj.y !== currentTile.y)
  const newPosition = generatePositionKey(currentTile.x, currentTile.y)
  state.tilesByPosition[oldPosition] = undefined
  state.tilesByPosition[newPosition] = currentTile.id
  if(axis === 'y') {
    state.tilesByColumn[oldVar] = state.tilesByColumn[oldVar].filter((id) => id !== currentTile.id)
    state.tilesByColumn[currentTile.y] = [ ...state.tilesByColumn[currentTile.y], currentTile.id ]
  } else if (axis === 'x') {
    state.tilesByRow[oldVar] = state.tilesByRow[oldVar].filter((id) => id !== currentTile.id)
    state.tilesByRow[currentTile.x] = [ ...state.tilesByRow[currentTile.x], currentTile.id ]
  }
  state.tilesHasBeenMoved = true
  return state
}

const mergeTiles = (state, currentTile, nextTile, currentTurn, vector, axis) => {
  if(nextTile && nextTile.value === currentTile.value && nextTile.mergedTurn !== currentTurn && currentTile.mergedTurn !== currentTurn) {
    state.emptyCells = [ ...state.emptyCells, { x: currentTile.x, y: currentTile.y } ]
    state.emptyCells = state.emptyCells.filter((obj) => obj.x !== nextTile.x || obj.y !== nextTile.y)
    state.tilesByPosition[generatePositionKey(nextTile.x, nextTile.y)] = currentTile.id
    state.tilesByPosition[generatePositionKey(currentTile.x, currentTile.y)] = undefined
    if(axis === 'y') {
      state.tilesByColumn[nextTile.y] = state.tilesByColumn[nextTile.y].filter((id) => id !== nextTile.id)
      state.tilesByColumn[nextTile.y] = [ ...state.tilesByColumn[nextTile.y], currentTile.id ]
      state.tilesByRow[nextTile.x] = state.tilesByRow[nextTile.x].filter((id) => id !== nextTile.id)
    } else if(axis === 'x') {
      state.tilesByRow[nextTile.x] = state.tilesByRow[nextTile.x].filter((id) => id !== nextTile.id)
      state.tilesByRow[nextTile.x] = [ ...state.tilesByRow[nextTile.x], currentTile.id ]
      state.tilesByColumn[nextTile.y] = state.tilesByColumn[nextTile.y].filter((id) => id !== nextTile.id)
    }
    state.tilesById[currentTile.id].value = 2 * currentTile.value
    vector === 'plus' ? currentTile[axis] = currentTile[axis] + 1 : currentTile[axis] = currentTile[axis] - 1
    delete state.tilesById[nextTile.id]
    state.tilesById[currentTile.id].mergedTurn = currentTurn
  }
  return state
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
      if(state.emptyCells.length) {
        const randomEmptyCell = state.emptyCells[Math.floor(Math.random()*state.emptyCells.length)]
        const newEmptyCellsArray = [ ...state.emptyCells ]
        newEmptyCellsArray.splice(newEmptyCellsArray.indexOf(randomEmptyCell),1)
        const id = state.numberOfTiles + 1
        // const newValue = [2, 4][Math.floor(Math.random()*2)] //todo
        const newTile = {
          x: randomEmptyCell.x,
          y: randomEmptyCell.y,
          value: 2,
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
          },
          tilesHasBeenMoved: false
        }
      } else return state

    case MOVE_TILES:
      const direction = action.payload.direction
      const newState = { ...state }
      newState.currentTurn++
      newState.tilesHasBeenMoved = false
      const currentTurn = newState.currentTurn
      if(direction === RIGHT) {
        for (let y = 4; y > 0; y--) {
          newState.tilesByColumn[y].forEach((tileId) => {
            let currentTile = getTileById(newState, tileId)
            if(currentTile) {
              while(currentTile.y + 1 <= 4 && !newState.tilesByPosition[generatePositionKey(currentTile.x, currentTile.y + 1)]) {
                calculatePosition(newState, currentTile, 'plus', 'y')
              }
              const nextTile = getTileById(state, state.tilesByPosition[generatePositionKey(currentTile.x, currentTile.y + 1)])
              mergeTiles(newState, currentTile, nextTile, currentTurn, 'plus', 'y')
            }
          })
        }
      } else if(direction === LEFT) {
        for (let y = 1; y < 5; y++) {
          newState.tilesByColumn[y].forEach((tileId) => {
            let currentTile = getTileById(newState, tileId)
            if(currentTile) {
              while(currentTile.y - 1 >= 1 && !newState.tilesByPosition[generatePositionKey(currentTile.x, currentTile.y - 1)]) {
                calculatePosition(newState, currentTile, 'minus', 'y')
              }
              const nextTile = getTileById(state, state.tilesByPosition[generatePositionKey(currentTile.x, currentTile.y - 1)])
              mergeTiles(newState, currentTile, nextTile, currentTurn, 'minus', 'y')
            }
          })
        }
      } else if(direction === UP) {
        for (let x = 1; x < 5; x++) {
          newState.tilesByRow[x].forEach((tileId) => {
            let currentTile = getTileById(newState, tileId)
            if(currentTile) {
              while(currentTile.x - 1 >= 1 && !newState.tilesByPosition[generatePositionKey(currentTile.x - 1, currentTile.y)]) {
                calculatePosition(newState, currentTile, 'minus', 'x')
              }
              const nextTile = getTileById(state, state.tilesByPosition[generatePositionKey(currentTile.x - 1, currentTile.y)])
              mergeTiles(newState, currentTile, nextTile, currentTurn, 'minus', 'x')
            }
          })
        }
      } else if(direction === DOWN) {
        for (let x = 4; x > 0; x--) {
          newState.tilesByRow[x].forEach((tileId) => {
            let currentTile = getTileById(newState, tileId)
            if(currentTile) {
              while(currentTile.x + 1 <= 4 && !newState.tilesByPosition[generatePositionKey(currentTile.x + 1, currentTile.y)]) {
                calculatePosition(newState, currentTile, 'plus', 'x')
              }
              const nextTile = getTileById(state, state.tilesByPosition[generatePositionKey(currentTile.x + 1, currentTile.y)])
              mergeTiles(newState, currentTile, nextTile, currentTurn, 'plus', 'x')
            }
          })
        }
      }
      return newState
    default:
      return state
  }
}
