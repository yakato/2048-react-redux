import {
  CREATE_TILE,
  MOVE_TILES,
  RIGHT,
  LEFT,
  UP
} from './constants'

const initialState = {
  tilesById: {},
  score: 0,
  gameOver: false,
  maxValue: 0,
  tilesHasBeenMoved: false,
  mergeImpossible: {},
}

const buildEmptyPositions = (tiles) => {
  const result = new Set()
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      result.add(""+x+y)
    }
  }
  tiles.forEach(tile => {
    result.delete(""+tile.x+tile.y)
  })
  return result
}

const mergeTiles = (array) => {
  const filteredArray = array.filter(val => val !== undefined)
  for(let i = filteredArray.length - 1; i > 0; i --) {
    if(filteredArray[i].value === filteredArray[i-1].value) {
      const sumValue = filteredArray[i-1].value *= 2
      score += sumValue
      maxValue = Math.max(sumValue, maxValue)
      filteredArray.splice(i, 1)
    }
  }
  return filteredArray
}

const moveTiles = (array) => {
  const emptyArray = Array(4 - array.length)
  return emptyArray.concat(array)
}

const buildBoard = (tiles, direction) => {
  let board = [Array(4), Array(4),Array(4),Array(4)]
  tiles.forEach((tile) => {
    if( direction === RIGHT || direction === LEFT) {
      board[tile.y][tile.x] = tile
    } else {
      board[tile.x][tile.y] = tile
    }
  })
  return board
}

const updateBoard = (board, direction) => {
  let newBoard = board.map((row) => {
    if(direction === UP || direction === LEFT) {
      return moveTiles(mergeTiles(row.reverse())).reverse()
    } else {
      return moveTiles(mergeTiles(row))
    }
  })

  return newBoard.map((row) => {
    return row.map((tile, position) => {
      if( direction === RIGHT || direction === LEFT) {
        return { ...tile, x: position }
      } else {
        return { ...tile, y: position }
      }
    })
  })
}

let emptyPositions = buildEmptyPositions([])
let maxTileId = 0
let score = 0
let maxValue = 0

export default (state = initialState, action) => {
  switch (action.type) {

    case CREATE_TILE:
      if (emptyPositions.size > 0) {
        const randomCell = Array.from(emptyPositions)[Math.floor(Math.random()*emptyPositions.size)]
        emptyPositions.delete(randomCell)
        const newId = ++maxTileId
        const newValue =  Math.random() < 0.1 ? 4 : 2
        const newTile = { id: newId, x: parseInt(randomCell[0], 10), y: parseInt(randomCell[1], 10), value: newValue }
        const newTilesById = { ...state.tilesById, [newId]: newTile }
        return { ...state, tilesById: newTilesById, tilesHasBeenMoved: false }
      } else { return state }

    case MOVE_TILES:
      if (emptyPositions.size === 0
        && Object.keys(state.mergeImpossible).length === 4
        && Object.keys(state.mergeImpossible).every(key => state.mergeImpossible[key] === true)) {
        state.gameOver = true
      }
      const direction = action.payload.direction
      let board = buildBoard(Object.values(state.tilesById), direction)
      board = updateBoard(board, direction)
      const updatedTilesById = [].concat.apply([], board).reduce((obj, tile) => {
        obj[tile.id] = tile
        return obj
      }, {})
      emptyPositions = buildEmptyPositions(Object.values(updatedTilesById))
      const compare = JSON.stringify(state.tilesById) === JSON.stringify(updatedTilesById)
      let mergeImpossible = {}
      if (compare) {
        mergeImpossible = { ...state.mergeImpossible, [direction]: true }
      }
      return {
        ...state,
        tilesById: updatedTilesById,
        tilesHasBeenMoved: true,
        mergeImpossible: mergeImpossible,
        score,
        maxValue
      }

    default:
      return state
  }
}
