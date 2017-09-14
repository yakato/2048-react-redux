import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const store = createStore(
  createLogger,
  applyMiddleware(thunk)
)

export default store
