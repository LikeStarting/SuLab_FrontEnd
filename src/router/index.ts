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
        title: '首页'
      },
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/index',
          name: 'IndexPage',
          meta: {
            title: '首页',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Index/index.vue')
        },
        {
          path: '/article',
          name: 'ArticlePage',
          meta: {
            title: '文章页',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Article/index.vue')
        },
        {
          path: '/publication',
          name: 'PublicationPage',
          meta: {
            title: 'Publication',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Publication/index.vue')
        },
        {
          path: '/team',
          name: 'TeamPage',
          meta: {
            title: 'Team',
            requireAuth: false,
            keepAlive: false
          },
          component: () => import('@/views/Team/index.vue')
        },
        {
          path: '/about',
          name: 'AboutPage',
          meta: {
            title: 'About',
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