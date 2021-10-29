
export function setToken (state, playload) {
  state.token = playload.token
  state.tokenExpiration = playload.tokenExpiration
  state.timer = playload.timer
  state.user = playload.user
  state.customer = playload.customer
  state.numeration = playload.numeartion
}
export function setCustomer (state, playload) {
  state.customer = playload.customer
}
export function setNumerationMutation (state, playload) {
  state.numeration = playload.numeration
}
