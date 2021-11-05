export function addProductMutation (state, playload) {
  state.productsCard = playload.product
  state.totales = playload.totales
}
export function listProductMutation (state, playload) {
  state.listsProducts = playload
}
export function listSelectProductMutation (state, playload) {
  console.log('listSelectProductMutation', playload.products)
  state.listsSelectProducts = playload.products
}
export function listBrandsMutation (state, playload) {
  state.listsBrands = playload.products
}
export function listCategoriesMutation (state, playload) {
  state.listsCategories = playload.products
}
export function productMuttation (state, playload) {
  state.product = playload
}
export function messageMuttation (state, playload) {
  state.product = playload.message
}
