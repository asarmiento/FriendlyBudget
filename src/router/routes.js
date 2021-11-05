
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ],
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/inicio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/alimentos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Alimentos.vue'),
        name: 'Alimentos',
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/resultado-busqueda:result',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/resultado.vue'),
        name: 'Resultasdos',
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:route/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Product.vue'),
        name: 'Producto',
        props: true,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/vino-y-destilados',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/vinoYDestilados.vue'),
        name: 'Vinos y Destilados'
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/list-card',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/lists-card.vue'),
        name: 'Lista de carrito'
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bebidas-sin-alcohol',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/bebidasSinAlcohol.vue'),
        name: 'Bebidas Sin Alcohol'
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cevezas-y-bebidas-alcoholicas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/cevezasYBebidasAlcoholicas.vue'),
        name: 'Cervezas y Bebidas Alcoholicas'
      }
    ],
    meta: {
      requiresAuth: true
    }
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
