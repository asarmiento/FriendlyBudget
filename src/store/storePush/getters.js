export function countProductGetter (state) {
  console.log('getters', state.productsCard)
  return JSON.parse(state.productsCard)
}
