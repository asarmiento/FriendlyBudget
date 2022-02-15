import { api } from '../boot/axios'

const HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const user = {
  login: function (data) {
    return api.post('/api/auth/login',
      data,
      {
        headers: HEADERS
      }
    )
  },
  logout: function () {
    return api.get('/api/auth/logout',
      {
        headers: HEADERS
      }
    )
  }
}

export { user }
