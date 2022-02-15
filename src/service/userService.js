import { user } from '../api'
import { LocalStorage } from 'quasar'

const userService = {
  login: async function (data) {
    const res = await user.login(data)
    return res.data
  },
  logout: async function () {
    const res = await user.logout()
    return res.data
  },
  getUserInfo: async function () {
    return LocalStorage.getItem('userInfo') || {}
  },
  setUserInfo: function (userInfo) {
    LocalStorage.set('userInfo', userInfo)
  }
}

export { userService }
