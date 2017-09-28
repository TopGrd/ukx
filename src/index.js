import {
  createStore,
  applyMiddleware,
} from './ukx'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'add':
      return {
        users: [
          ...state.users,
          action.payload,
        ],
      }

    case 'remove':
    {
      const index = state.users.findIndex(user => user.name === action.payload.name)
      state.users.splice(index, 1)
      return state
    }

    default:
      return state
  }
}

const initialState = {
  users: [{
    name: 'jack',
    company: 'migu+',
  }],
}

const logger = store => next => (action) => {
  console.log('dispatch action', action)
  console.log('state', store.getState())
  next(action)
  console.log('dispatched', store.getState())
}

const logger2 = store => next => (action) => {
  console.log('logger2 start', store.getState())
  next(action)
  console.log('logger2 end', store.getState())
}

const store = applyMiddleware(logger2, logger)(createStore)(userReducer, initialState)

store.subscribe(() => {
  console.log('add', store.getState())
})

store.dispatch({
  type: 'add',
  payload: {
    name: 'liming',
    company: 'migu music',
  },
})

console.log(store)
