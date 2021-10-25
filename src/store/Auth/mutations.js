
export function setToken (state, playload) {
  state.token = playload.token
  state.tokenExpiration = playload.tokenExpiration
  state.timer = playload.timer
  state.user = playload.user
  state.customer = playload.customer
}
export function setCustomer (state, playload) {
  state.customer = playload.customer
}
