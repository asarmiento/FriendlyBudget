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

    console.log('hola mundo 4')
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('tokenExpiration', expirationDate)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    console.log('hola mundo 5')
    const timer = setTimeout(function () {
      // context.dispatch('autoLogout')
    }, expiresIn)

    console.log('hola mundo 6')
    context.commit('setToken', {
      token: response.data.access_token,
      tokenExpiration: expirationDate,
      timer: timer,
      user: response.data.user
    })
    console.log('hola mundo 7')
    this.$router.push('/inicio')
    return response.data
  }).catch(e => {
    alert('Error: ' + e)
    return e
  })
}

export function trySessionAction (context) {
  const token = localStorage.getItem('token')
  console.log(token)
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
