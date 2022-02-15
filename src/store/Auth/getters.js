
export function isAuthenticated (state) {
  return !!state.token
}
export function token (state) {
  return state.token
}
export function loginUrlGetters (state) {
  return state.loginUrl
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
export function numerationGetter (state) {
  return state.numeration
}
