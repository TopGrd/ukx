import Store from './store'
import applyMiddleware from './middleware'

function createStore(reducer, state) {
  return new Store(reducer, state)
}

export {
  createStore,
  applyMiddleware,
}
