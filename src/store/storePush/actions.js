import { api } from 'boot/axios'
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
export function sendDataPreSale (context, payload) {
  const date = new Date()
  const user = JSON.parse(localStorage.getItem('user'))
  const numeration = (localStorage.getItem('numeration'))
  const customer = JSON.parse(localStorage.getItem('customer'))
  const products = JSON.parse(localStorage.getItem('productsCard'))
  console.log(user)
  const data = {
    invoice: {
      aplicada: 1,
      branch_office_id: 3,
      canceled: 1,
      changing: 0,
      created_at: date,
      date: date,
      date_presale: date,
      due_date: date,
      devolucionInvoice: 0,
      facturaDePreventa: 'Preventa',
      id: 10079,
      invoice_type_id: 2,
      latitud: 8.679402599999999523561200476251542568206787109375,
      longitud: -83.0636980999999963160007609985768795013427734375,
      note: null,
      numeration: numeration,
      paid: 0,
      discount: 0.0,
      paid_up: null,
      payment_method_id: 1,
      percent_discount: null,
      product_invoice: products,
      result: false,
      sale: {
        aplicada: 1,
        applied: 1,
        cash_desk_id: user.cash[0].id,
        created_at: date,
        customer_id: customer.id,
        customer_name: customer.company_name,
        email: customer.email,
        devolucion: 0,
        facturaDePreventa: 'Preventa',
        id: 10079,
        invoice_id: 10079,
        reserved: 0,
        sale_type: 2,
        subida: 1,
        updated_at: date,
        viewed: 0
      },
      subida: 1,
      subtotal: 3999.9996,
      subtotal_exempt: 3999.9996,
      subtotal_taxed: 0.0,
      tax: 0.0,
      time_presale: date,
      times: date,
      total: 3999.9996,
      user_id: user.id,
      user_id_applied: user.id
    }
  }
  api.post('/invoices/upload-orders-customer', data).then(response => {
    const result = response.data
    context.commit('messageMuttation', {
      message: result
    })
  }).catch(error => {
    context.commit('messageMuttation', {
      message: error.response.data
    })
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
