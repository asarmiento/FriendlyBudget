
export function isAuthenticated (state) {
  return !!state.token
}
export function token (state) {
  return state.token
}
export function didAutoLogout (state) {
  return state.didAutoLogout
}
export function userName (state) {
  return localStorage.getItem('user')
}
export function CustomerGetter (state) {
  return state.customer
}
