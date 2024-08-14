import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/storage'
import { useUserStoreWidthOut } from '@/store/modules/user'
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
          path: '/model',
          name: 'ModelPage',
          meta: {
            title: 'Models | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/index.vue'),
        },
        {
          path: '/model/result/1',
          name: 'ModelResultPage',
          meta: {
            title: 'Result | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/PredictResult.vue'),
        },
        {
          path: '/model/result/2',
          name: 'ModelSCResultPage',
          meta: {
            title: 'Result | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/PredictSCResult.vue'),
        },
        {
          path: '/model/result/3',
          name: 'ModelMPHNSynResultPage',
          meta: {
            title: 'Result | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/PredictMPHNSynResult.vue'),
        },
        {
          path: '/model/result/4',
          name: 'ModelMPHNSynWithTargetResultPage',
          meta: {
            title: 'Result | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/PredictMPHNSynWithTargetResul.vue'),
        },
        {
          path: '/model/momo',
          name: 'ModelPage-MOMO',
          meta: {
            title: 'MOMO | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/MOMO.vue'),
        },
        {
          path: '/model/cdmo',
          name: 'ModelPage-CDMO',
          meta: {
            title: 'CDMO | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/CDMO.vue'),
        },
        {
          path: '/model/casynergy',
          name: 'ModelPage-CASynergy',
          meta: {
            title: 'CASynergy | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/CASynergy.vue'),
        },
        {
          path: '/model/transferban',
          name: 'ModelPage-TransferBan',
          meta: {
            title: 'TransferBan | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/TransferBan.vue'),
        },
        {
          path: '/model/dspe',
          name: 'ModelPage-DSPE',
          meta: {
            title: 'DSPE | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/DSPE.vue'),
        },
        {
          path: '/model/mgsf',
          name: 'ModelPage-MGSF',
          meta: {
            title: 'MGSF | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/MGSF.vue'),
        },
        {
          path: '/model/mphnsyn',
          name: 'ModelPage-MPHNSyn',
          meta: {
            title: 'MPHNSyn | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/SoftWare/ToolLists/MPHNSyn.vue'),
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
          path: '/contact',
          name: 'ContactPage',
          meta: {
            title: 'Contact Us | Su Lab',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Contact/index.vue')
        },
        {
          path: '/:pathMatch(.*)',
          name: 'ErrorPage',
          meta: {
            title: 'Error page',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/404.vue')
        }
      ]
    },
   
  ]
  const router = createRouter({
    // linkExactActiveClass: 'router-active',
    history: createWebHistory(),
    routes
  })
  

  router.beforeEach((to, from ,next) => {
    // const userStore = useUserStoreWidthOut()
    // const token = userStore.getToken

    const Document:any = document
    if (to.meta.title) {
      Document.title = to.meta.title
    }
    next()
  })
  // router.beforeEach((to, from, next) => {
  //   // const token = getItem('user')
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