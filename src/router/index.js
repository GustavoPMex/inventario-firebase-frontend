import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true}
  },
  // -- Inventario --
  {
    path: '/inventario',
    component: () => import('../views/inventario/BaseInventario.vue'),
    children: [
      {
        path: '',
        name: 'InventarioArticulos',
        component: () => import('../views/inventario/Articulos.vue'),
      },
      {
        path: 'agregar',
        name: 'InventarioAgregar',
        component: () => import('../views/inventario/Agregar.vue')
      }
    ],
    meta: { requiresAuth: true}
  },
  // -- Proveedores --
  {
    path: '/proveedores',
    component: () => import('../views/proveedores/BaseProveedores.vue'),
    children: [
      {
        path: '',
        name: 'ProveedoresList',
        component: () => import('../views/proveedores/Proveedores.vue'),
      },
      {
        path: 'agregar',
        name: 'ProveedoresAgregar',
        component: () => import('../views/proveedores/Agregar.vue'),
      }
    ],
    meta: { requiresAuth: true}
  },
  // -- Personal --
  {
    path: '/personal',
    component: () => import('../views/personal/BasePersonal.vue'),
    children: [
      {
        path: '',
        name: 'PersonalList',
        component: () => import('../views/personal/Personal.vue')
      },
    ],
    meta: { requiresAuth: true}
  },
  // -- Taller --
  {
    path: '/taller',
    component: () => import('../views/taller/BaseTaller.vue'),
    children: [
      {
        path: '',
        name: 'TallerList',
        component: () => import('../views/taller/Servicios.vue')
      },
      {
        path: 'agregar',
        name: 'TallerAgregar',
        component: () => import('../views/taller/Agregar.vue')
      }
    ],
    meta: { requiresAuth: true}
  },
  // -- Clientes --
  {
    path: '/clientes',
    component: () => import('../views/clientes/BaseClientes.vue'),
    children: [
      {
        path: '',
        name: 'ClientesList',
        component: () => import('../views/clientes/Clientes.vue')
      },
      {
        path: 'agregar',
        name: 'ClientesAgregar',
        component: () => import('../views/clientes/Agregar.vue')
      }
    ],
    meta: { requiresAuth: true}
  },
  // -- Registro --
  {
    path: '/registro',
    component: () => import('../views/registro/BaseRegistro.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('../views/registro/Login.vue')
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('../views/registro/Signup.vue')
      }
    ],
  },
  {
    path: '/perfil',
    component: () => import('../views/perfil/BasePerfil.vue'),
    children: [
      {
        path: '',
        name: 'Perfil',
        component: () => import('../views/perfil/Perfil.vue')
      },
      {
        path: 'actualizar',
        name: 'ActualizarPerfil',
        component: () => import('../views/perfil/EditarPerfil.vue')
      }
    ],
    meta: { requiresAuth: true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth){
    if (store.getters.getAuth){
      next()
    } else {
      next('/registro')
    }
  } else {
    next()
  }
})


export default router
