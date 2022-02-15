import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { api } from 'boot/axios'
// import store from '../store/index'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store /* , ssrContext */ }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    linkActiveClass: 'active',
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })
  const whiteList = ['/login', '/403']

  function hasPermission (Router) {
    if (whiteList.indexOf(Router.path) !== -1) {
      return true
    }

    return true
  }
  Router.beforeEach(async (to, from, next) => {
    if (store.getters['authModules/loginUrlGetters']) {
      api.defaults.baseURL = store.getters['authModules/loginUrlGetters']
    }
    const token = store.getters['authModules/token']
    console.log(token)
    console.log('userInfo')
    if (token !== null) {
      const userInfo = store.getters['authModules/userName']

      if (userInfo) {
        try {
          // await store.dispatch('user/getUserInfo')
          next()
        } catch (e) {
          if (whiteList.indexOf(to.path) !== -1) {
            next()
          } else {
            next('/login')
          }
        }
      } else {
        if (hasPermission(to)) {
          next()
        } else {
          next({ path: '/403', replace: true })
        }
      }
    } else {
      console.log('hola 1')
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }
  })
  return Router
})
