const routes = [
  {
    path: '',
    component: () => import('layouts/MainLogin.vue'),
    children: [
      {
        path: '/login',
        component: () => import('pages/Login.vue'),
        meta: {
          isAllowBack: false
        }
      }
    ]
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/inicio',
        component: () => import('pages/Index.vue'),
        name: 'inicio',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/alimentos',
        component: () => import('pages/Alimentos.vue'),
        name: 'Alimentos',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/resultado-busqueda:result',
        component: () => import('pages/resultado.vue'),
        name: 'Resultasdos',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/:route/:id',
        component: () => import('pages/Product.vue'),
        name: 'Producto',
        props: true,
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/vino-y-destilados',
        component: () => import('pages/vinoYDestilados.vue'),
        name: 'Vinos y Destilados',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/list-card',
        component: () => import('pages/lists-card.vue'),
        name: 'Lista de carrito',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/bebidas-sin-alcohol',
        component: () => import('pages/bebidasSinAlcohol.vue'),
        name: 'Bebidas Sin Alcohol',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/cevezas-y-bebidas-alcoholicas',
        component: () => import('pages/cevezasYBebidasAlcoholicas.vue'),
        name: 'Cervezas y Bebidas Alcoholicas',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/mi-perfil',
        component: () => import('pages/users/Profile.vue'),
        name: 'Mi perfil',
        meta: {
          isAllowBack: true
        }
      },
      {
        path: '/change-password',
        component: () => import('pages/users/changePassword.vue'),
        name: 'Cambio Contraseña',
        meta: {
          isAllowBack: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
