import { Notify } from 'quasar'

export function sendSessionAction (context, payload) {
  console.log('hola mundo 2')
  const url = `${process.env.VUE_APP_API}/login`
  try {
    this.$axios.post(url, payload).then(r => {
      return r
    }).catch(e => {
      Notify.create('Error: ' + e.response.status)
      return e
    })
  } catch (e) {
    const errorLogin = new Error(
      e.message || 'Failed to authenticate. Check your login data.'
    )
    throw errorLogin
  }
}
