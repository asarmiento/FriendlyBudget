const routes = [
  {
    path: '/',
    meta: {
      requiresAuth: false
    },
    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/inicio',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/alimentos',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Alimentos.vue'),
        name: 'Alimentos'
      }
    ]
  },
  {
    path: '/resultado-busqueda:result',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/resultado.vue'),
        name: 'Resultasdos'
      }
    ]
  },
  {
    path: '/:route/:id',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Product.vue'),
        name: 'Producto',
        props: true
      }
    ]
  },
  {
    path: '/vino-y-destilados',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/vinoYDestilados.vue'),
        name: 'Vinos y Destilados'
      }
    ]
  },
  {
    path: '/list-card',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/lists-card.vue'),
        name: 'Lista de carrito'
      }
    ]
  },
  {
    path: '/bebidas-sin-alcohol',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/bebidasSinAlcohol.vue'),
        name: 'Bebidas Sin Alcohol'
      }
    ]
  },
  {
    path: '/cevezas-y-bebidas-alcoholicas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/cevezasYBebidasAlcoholicas.vue'),
        name: 'Cervezas y Bebidas Alcoholicas',
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/mi-perfil',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/users/Profile.vue'),
        name: 'Mi perfil',
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/change-password',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/users/changePassword.vue'),
        name: 'Cambio Contraseña',
        meta: {
          requiresAuth: true
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
