import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        admin: true,
        normal: true,
        employee: true
      }
    },
    {
      path: '/cartones-bingo',
      name: 'BingoTables',
      component: () => import('../views/BingoTables/BingoTables.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: false
      }
    },
    {
      path: '/cartones-bingo/crearmodificar/:id?',
      name: 'CreateBingoTables',
      component: () => import('../views/BingoTables/Create.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: false
      }
    },
    {
      path: '/cartones-bingo/:id/detalle',
      name: 'ShowBingoTables',
      component: () => import('../views/BingoTables/Show.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: false
      }
    },
    {
      path: '/juegos-de-bingo',
      name: 'GamesBingo',
      component: () => import('../views/Games/Games.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: true
      }
    },
    {
      path: '/juegos-de-bingo/normal-user',
      name: 'GamesBingoNormal',
      component: () => import('../views/Games/GamesClient.vue'),
      meta: {
        admin: false,
        normal: true,
        employee: false
      }
    },
    {
      path: '/tipos-cartones-ganadores',
      name: 'TypeCardsWinners',
      component: () => import('../views/TypeCardsWinners/TypeCardsWinners.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: false
      }
    },
    {
      path: '/usuarios',
      name: 'Users',
      component: () => import('../views/Users/User.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: false
      }
    },
    {
      path: '/upload-excel',
      name: 'UploadExcel',
      component: () => import('../views/UploadExcel/UploadExcel.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: false
      }
    },
    {
      path: '/usuarios/crearmodificar/:id?',
      name: 'CreateUsers',
      component: () => import('../views/Users/Create.vue'),
      meta: {
        admin: true,
        normal: false,
        employee: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Auth/Login.vue'),
      meta: {
        free: true
      }
    },
    {
      path: '/tablas-de-bingo-empleado',
      name: 'BingoCardEmployee',
      component: () => import('../views/BingoCardEmployee/BingoCard.vue'),
      meta: {
        admin: false,
        normal: false,
        employee: true
      }
    },
    {
      path: '/tablas-de-bingo-empleado/detalle/:id',
      name: 'DetailBingoCardEmployee',
      component: () => import('../views/BingoCardEmployee/Show.vue'),
      meta: {
        admin: false,
        normal: false,
        employee: true
      }
    },
  ]
})



router.beforeResolve((to, from, next) => {
  const getToken = store.getters['auth/getToken'];
  const getUser = store.getters['auth/getUser'];
  
  if(to.matched.some(record => record.meta.free)) {
    next();
  } else if(getToken && getUser.role == 2) {
    if(to.matched.some(record => record.meta.admin)) {
      next();
    }
  } else if(getToken && getUser.role == 1) {
    if(to.matched.some(record => record.meta.normal)) {
      next();
    }
  } else if(getToken && getUser.role == 3) {
    if(to.matched.some(record => record.meta.employee)) {
      next();
    }
  } else {
    next({name: "Login"});
  }
});

export default router
