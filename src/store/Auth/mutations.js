
export function setToken (state, payload) {
  state.token = payload.token
  state.tokenExpiration = payload.tokenExpiration
  state.timer = payload.timer
}
export function setUrl (state, payload) {
  state.loginUrl = payload.loginUrl
}
export function setDataAll (state, payload) {
  state.user = payload.user
  state.customer = payload.customer
  state.numeration = payload.numeration
  state.products = payload.products
}
export function setCustomer (state, payload) {
  state.customer = payload.customer
}
export function setNumerationMutation (state, payload) {
  state.numeration = payload.numeration
}
