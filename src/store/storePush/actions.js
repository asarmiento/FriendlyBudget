export function addProductAction (context, payload) {
  let products = []
  if (localStorage.getItem('productsCard')) {
    const lists = JSON.parse(localStorage.getItem('productsCard'))
    lists.forEach(term => {
      if (term.product_id === payload.product_id) {
        term.amount = parseFloat(payload.amount) + parseFloat(term.amount)
      }
    })
    const pasas = lists.filter((el) => el.product_id === payload.product_id)
    if (pasas.length === 0) {
      lists.push(payload)
    }
    console.log('probando', pasas, lists)
    products = lists
  } else {
    products = []
    products.push(payload)
  }
  localStorage.setItem('productsCard', JSON.stringify(products))
  context.commit('addProductMutation', {
    products: products
  })
}
export function updateProductAction (context, payload) {
  let products = []
  if (localStorage.getItem('productsCard')) {
    const lists = JSON.parse(localStorage.getItem('productsCard'))
    lists.forEach(term => {
      if (term.product_id === payload.product_id) {
        term.amount = payload.amount
      }
    })
    const pasas = lists.filter((el) => el.product_id === payload.product_id)
    if (pasas.length === 0) {
      lists.push(payload)
    }
    console.log('probando', pasas, lists)
    products = lists
  } else {
    products = []
    products.push(payload)
  }
  localStorage.setItem('productsCard', JSON.stringify(products))
  context.commit('addProductMutation', {
    products: products
  })
}
