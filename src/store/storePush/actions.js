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
  console.log('probando', products, totalAll(products))
  context.commit('addProductMutation', {
    products: products,
    totales: totalAll(products)
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
    products: products,
    totales: totalAll(products)
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
      product: listsProduct,
      totales: totalAll(listsProduct)
    })
  }
}
export function deleteProductAction (context) {
  localStorage.setItem('productsCard', [])
  context.commit('addProductMutation', {
    product: [],
    totales: []
  })
}

function totalAll (products) {
  let price = Number(0)
  let totalIva = Number(0)
  let rate = 0
  let discount = Number(0)
  let total = Number(0)
  // eslint-disable-next-line no-unused-vars
  let subTotal = Number(0)
  let iva
  products.forEach(value => {
    rate = Number(value.rate)
    if (Number(value.discount) > 0) {
      discount += Number(value.discount)
    }
    if (rate > 0) {
      iva = Number('1.') + (Number(rate) / 100)
      price = Number(value.price) - (Number(value.price) / Number(iva))
    } else {
      price = Number(value.price)
      iva = 0
    }
    totalIva = Number(totalIva) + Number(iva)
    subTotal = Number(subTotal) + Number(price)
    console.log('subtotal', subTotal)
  })
  total = Number(subTotal) - Number(discount) + Number(totalIva)
  const totalAll = { subtotal: subTotal, discount: discount, total: total, totalIva: totalIva }
  console.log('totales', totalAll)
  return totalAll
}
