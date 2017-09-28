/**
 * compose = (f, g, ...) => ((x) => f(g(...(x))))
 * right -> left
 */
function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg)
}

/**
 * applyMiddleware(...middlewares)(store)
 * applyMiddleware(...middlewares)({ ...store, dispatch })
 * -> applyMiddleware(...middlewares)(createStore)(reducer, state)
 * -> applyMiddleware(...middlewares)(createStore)(reducer, state)
 */

export default function applyMiddleware(...middlewares) {
  // eslint-disable-next-line
  return createStore => (reducer, state) => {
    const store = createStore(reducer, state)
    let {
      dispatch,
    } = store
    let chain = []
    // store api
    const middlewareApi = {
      // use closure  acess changed dispatch
      dispatch: action => dispatch(action),
      getState: store.getState,
    }
    // ({ dispatch, getState }) => ()
    chain = middlewares.map(middleware => middleware(middlewareApi))
    /**
     * ({ dispatch, getState }) => (dipatch) => ()
     * -> ({ dispatch, getState }) => (next) => (action) => ()
     * -> (store) => (next) => (action) => ()
     */
    dispatch = compose(...chain)(store.dispatch)
    // return store
    return {
      ...store,
      dispatch,
    }
  }
}
