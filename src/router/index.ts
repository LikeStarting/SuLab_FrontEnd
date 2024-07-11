import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Layout',
      meta: {
        title: 'Su Lab'
      },
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/index',
          name: 'IndexPage',
          meta: {
            title: 'Welcome to Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Index/index.vue')
        },
        {
          path: '/software',
          name: 'SoftWarePage',
          meta: {
            title: 'SoftWares | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/index.vue'),
        },
        {
          path: '/software/result',
          name: 'SoftWareResultPage',
          meta: {
            title: 'Result | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/PredictResult.vue'),
        },
        {
          path: '/software/momo',
          name: 'SoftWarePage-MOMO',
          meta: {
            title: 'MOMO | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/MOMO.vue'),
        },
        {
          path: '/software/cdmo',
          name: 'SoftWarePage-CDMO',
          meta: {
            title: 'CDMO | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/CDMO.vue'),
        },
        {
          path: '/software/casynergy',
          name: 'SoftWarePage-CASynergy',
          meta: {
            title: 'CASynergy | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/CASynergy.vue'),
        },
        {
          path: '/software/transferban',
          name: 'SoftWarePage-TransferBan',
          meta: {
            title: 'TransferBan | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/TransferBan.vue'),
        },
        {
          path: '/software/dspe',
          name: 'SoftWarePage-DSPE',
          meta: {
            title: 'DSPE | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/DSPE.vue'),
        },
        {
          path: '/publication',
          name: 'PublicationPage',
          meta: {
            title: 'Publications | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Publication/index.vue')
        },
        {
          path: '/team',
          name: 'TeamPage',
          meta: {
            title: 'Teams| Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Team/index.vue')
        },
        {
          path: '/about',
          name: 'AboutPage',
          meta: {
            title: 'About us | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/About/index.vue')
        },
      ]
    },
   
  ]
  const router = createRouter({
    // linkExactActiveClass: 'router-active',
    history: createWebHistory(),
    routes
  })
  

  router.beforeEach((to, from ,next) => {
    const Document:any = document
    if (to.meta.title) {
      Document.title = to.meta.title
    }
    next()
  })
  // router.beforeEach((to, from, next) => {
  //   // const token = getItem('user')
  //   // if (to.meta.title) {
  //   //   document.title = `${to.meta.title}-ADK-blog 我的个人小站`
  //   // }
  //   // if (to.meta.requireAuth) {
  //   //   if (token) {
  //   //     NProgress.start()
  //   //     next()
  //   //   } else {
  //   //     ElMessageBox.confirm('该页面需要登录才能使用，请问是否跳转到登录页面？', '登录提示', {
  //   //       confirmButtonText: '确认',
  //   //       cancelButtonText: '我不去了',
  //   //       type: 'warning'
  //   //     })
  //   //       .then(() => {
  //   //         NProgress.start()
  //   //         next({ path: '/login' })
  //   //       })
  //   //       .catch(() => {
  //   //         return
  //   //       })
  //   //   }
  //   // } else {
  //   //   NProgress.start()
  //   //   next()
  //   // }
  // })
  // router.afterEach(() => {
  //   // NProgress.done()
  // })
  export default router