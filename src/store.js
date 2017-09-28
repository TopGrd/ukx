class Store {
  constructor(reducer, state = []) {
    this.reducer = reducer
    this.state = state
    this.events = []
    this.dispatch = this.dispatch.bind(this)
    this.getState = this.getState.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action)
    this.events.forEach(evt => evt())
  }

  subscribe(evt) {
    this.events.push(evt.bind(this))
  }

  getState() {
    return this.state
  }

  unsubscribe(evt) {
    const index = this.events.findIndex(e => evt === e)
    this.events.splice(index, 1)
  }
}

export default Store
