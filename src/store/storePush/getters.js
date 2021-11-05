export function countProductGetter (state) {
  return state.productsCard
}
export function getProductGetter (state) {
  return state.product
}
export function getListsProductsGetter (state) {
  return state.listsProducts
}
export function listsSelectProductsGetter (state) {
  console.log('getters', state.listsSelectProducts)
  return state.listsSelectProducts
}
export function listsBrandsGetter (state) {
  return state.listsBrands
}
export function listsCategoriesGetter (state) {
  return state.listsCategories
}
export function getTotalCardGetter (state) {
  return state.totales
}
export function getMessageGetter (state) {
  return state.message
}
