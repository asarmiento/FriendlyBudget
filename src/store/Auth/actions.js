import { api } from 'boot/axios'
export function sendSessionAction (context, payload) {
  console.log('hola mundo 2')
  const url = '/login-web'
  api.post(url, payload).then(r => {
    const response = r.data
    // this.axios.defaults.headers.common.Authorization = 'Bearer ' + r.data.access_token
    api.defaults.headers.common.Authorization = `${response.data.token_type} ${response.data.access_token}`
    console.log(api.defaults.headers.common.Authorization)
    const expiresIn = +response.data.expires_at * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('numeration', JSON.stringify({ consecutive: getNumeration(response.data.user, response.data.numeration), number: response.data.numeration }))
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('tokenExpiration', expirationDate)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('customer', JSON.stringify(response.data.customer))
    localStorage.setItem('products', JSON.stringify(response.data.products))
    const timer = setTimeout(function () {
      // context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setToken', {
      token: response.data.access_token,
      tokenExpiration: expirationDate,
      timer: timer
    })
    context.commit('setDataAll', {
      user: response.data.user,
      numeration: getNumeration(response.data.user),
      customer: response.data.customer,
      products: response.data.products
    })
    this.$router.push('/inicio')
    return response.data
  }).catch(e => {
    this.$q.notify('Error: ' + e)
    return e
  })
}

export function tryCustomerAction (context) {
  const customer = localStorage.getItem('customer')
  if (customer != null) {
    context.commit('setCustomer', {
      customer: JSON.parse(customer)
    })
  }
}
export function tryListproductsAction (context) {
  const products = localStorage.getItem('products')
  if (products != null) {
    context.commit('setListProducts', {
      customer: JSON.parse(products)
    })
  }
}
export function trySessionAction (context) {
  const token = localStorage.getItem('token')
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
export function tryNumerationAction (context) {
  const numeration = JSON.parse(localStorage.getItem('numeration'))
  context.commit('setNumerationMutation', {
    numeration: numeration
  })
}
export function logoutAction (context) {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiration')
  localStorage.removeItem('productsCard')
  localStorage.removeItem('user')
  localStorage.removeItem('customer')
  localStorage.removeItem('listsCategories')
  localStorage.removeItem('listsSelectProducts')
  localStorage.removeItem('products')
  localStorage.removeItem('listsBrands')
  localStorage.removeItem('listsproducts')
  localStorage.removeItem('numeration')
  api.defaults.headers.common.Authorization = ''
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
