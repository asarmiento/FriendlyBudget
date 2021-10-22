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
    products = lists
  } else {
    products = []
    products.push(payload)
  }
  localStorage.setItem('productsCard', JSON.stringify(products))
  console.log('probando', products)
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
    products = lists
  } else {
    products = []
    products.push(payload)
  }
  localStorage.setItem('productsCard', JSON.stringify(products))
  console.log('probando1', products)

  context.commit('addProductMutation', {
    products: products
  })
}
export function setProduct (context, payload) {
  context.commit('productMuttation', {
    product: payload
  })
}
export function setUpdateState (context) {
  const products = localStorage.getItem('productsCard')
  if (products) {
    const listsProduct = JSON.parse(products)
    console.log('acction', listsProduct)
    context.commit('addProductMutation', {
      product: listsProduct
    })
  }
}
export function deleteProductAction (context) {
  localStorage.setItem('productsCard', [])
  context.commit('addProductMutation', {
    product: []
  })
}
