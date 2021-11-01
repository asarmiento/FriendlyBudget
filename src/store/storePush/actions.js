import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'
export function addProductAction (context, payload) {
  let products = []
  if (localStorage.getItem('productsCard')) {
    const lists = JSON.parse(localStorage.getItem('productsCard'))
    lists.forEach(term => {
      if (term.product_id === payload.product_id) {
        term.amount = Number(payload.amount) + Number(term.amount)
        term.total = Number(term.amount) * Number(payload.price)
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
  context.commit('addProductMutation', {
    product: products,
    totales: totalAll(products)
  })
}
export function updateProductAction (context, payload) {
  let products = []
  if (localStorage.getItem('productsCard')) {
    const lists = JSON.parse(localStorage.getItem('productsCard'))
    lists.forEach(term => {
      if (term.product_id === payload.product_id) {
        term.amount = Number(payload.amount) + Number(term.amount)
        term.total = Number(term.amount) * Number(payload.price)
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

  context.commit('addProductMutation', {
    product: products,
    totales: totalAll(products)
  })
}

export function deleteProductListsAction (context, payload) {
  console.log(payload)
  this.state.productsCard.splice(this.state.productsCard.indexOf(payload), 1)
  console.log(this.state.productsCard)
  context.commit('addProductMutation', {
    product: this.state.productsCard,
    totales: totalAll(this.state.productsCard)
  })
}

export function decreaseProductAction (context, payload) {
  let products = []

  const lists = JSON.parse(localStorage.getItem('productsCard'))
  lists.forEach(term => {
    if (term.product_id === payload.product_id) {
      term.amount = Number(term.amount) - 1
      term.total = Number(term.amount) * Number(payload.price)
    }
  })
  const pasas = lists.filter((el) => el.product_id === payload.product_id)
  if (pasas.length === 0) {
    lists.push(payload)
  }
  products = lists

  localStorage.setItem('productsCard', JSON.stringify(products))

  context.commit('addProductMutation', {
    product: products,
    totales: totalAll(products)
  })
}
export function increaseProductAction (context, payload) {
  let products = []

  const lists = JSON.parse(localStorage.getItem('productsCard'))
  lists.forEach(term => {
    if (term.product_id === payload.product_id) {
      term.amount = Number(term.amount) + Number(1)
      term.total = Number(term.amount) * Number(payload.price)
    }
  })
  const pasas = lists.filter((el) => el.product_id === payload.product_id)
  if (pasas.length === 0) {
    lists.push(payload)
  }
  products = lists

  localStorage.setItem('productsCard', JSON.stringify(products))

  context.commit('addProductMutation', {
    product: products,
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
  const numeration = JSON.parse(localStorage.getItem('numeration'))
  const customer = JSON.parse(localStorage.getItem('customer'))
  const products = JSON.parse(localStorage.getItem('productsCard'))
  const totales = totalAll(products)
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
      numeration: numeration.consecutive,
      paid: 0,
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
      subtotal: totales.subtotal,
      subtotal_exempt: totales.totalExemp,
      subtotal_taxed: totales.totalTax,
      tax: totales.totalIva,
      discount: totales.discount,
      time_presale: date,
      times: date,
      total: totales.total,
      user_id: user.id,
      user_id_applied: user.id
    }
  }
  api.post('/invoices/upload-orders-customer', data).then(response => {
    const result = response.data
    const number = Number(numeration.number) + 1
    localStorage.setItem('productsCard', [])
    localStorage.setItem('numeration', JSON.stringify({ consecutive: getNumeration(user, number), number: number }))
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
  let priceTax = Number(0)
  let tax = Number(0)
  let totalIva = Number(0)
  let totalExemp = Number(0)
  let totalTax = Number(0)
  let rate = 0
  let discount = Number(0)
  let total = Number(0)
  let subTotal = Number(0)
  let iva = Number(0)
  products.forEach(value => {
    rate = Number(value.rate)
    if (Number(value.discount) > 0) {
      discount += Number(value.discount)
    }

    if (rate > 0) {
      tax = Number('1.') + (Number(rate) / 100)
      priceTax = ((value.price) / (tax))
      iva = (value.price) - priceTax
      iva = iva * value.amount
      priceTax = priceTax * value.amount
      console.log('verificando tax: ' + value.description, 'imp:', tax, 'priceImp:', priceTax, 'inva:', iva)
      totalTax += (priceTax)
      totalIva += (iva)
    } else {
      price = Number(value.price) * value.amount
      tax = 0

      totalExemp += (price)
      console.log('verificando exem: ' + value.description, price)
    }
    subTotal = (totalTax) + totalExemp

    console.log('verificando subtotal: ' + value.description, 'subtotal', subTotal, 'totaltax:', totalTax, 'totalExe', totalExemp, 'totaliva:', totalIva)
  })
  total = (subTotal) - (discount) + (totalIva)

  console.log('verificando total: ', subTotal, discount, total)
  const totalAll = { subtotal: subTotal, discount: discount, total: total, totalExemp: totalExemp, totalTax: totalTax, totalIva: totalIva }
  return totalAll
}

function getNumeration (customer, numeration) {
  let num
  let cont
  if (Number(numeration) === 0) {
    cont = customer.id + '02-000001'
  } else if (Number(numeration) > 0 && Number(numeration) < 10) {
    num = Number(numeration) + 1
    cont = customer.id + '02-00000' + num
  } else if (Number(numeration) >= 10 && Number(numeration) < 100) {
    num = Number(numeration) + 1
    cont = customer.id + '02-0000' + num
  } else if (Number(numeration) >= 100 && Number(numeration) < 1000) {
    num = Number(numeration) + 1
    cont = customer.id + '02-000' + num
  } else if (Number(numeration) >= 1000 && Number(numeration) < 10000) {
    num = Number(numeration) + 1
    cont = customer.id + '02-00' + num
  } else if (Number(numeration) >= 10000 && Number(numeration) < 100000) {
    num = Number(numeration) + 1
    cont = customer.id + '02-0' + num
  } else if (Number(numeration) >= 100000 && Number(numeration) < 1000000) {
    num = Number(numeration) + 1
    cont = customer.id + '02-0' + num
  } else {
    num = Number(numeration) + 1
    cont = customer.id + '02-' + num
  }

  return cont
}
