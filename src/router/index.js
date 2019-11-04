import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录组件
import Login from '@/views/login'
// 主页组件
import Home from '@/views/home'
// 欢迎组件
import Welcome from '@/views/welcome'
// 404组件
import error from '@/views/404'
// session工具
import session from '@/utils/session'
// 文章管理
import article from '@/views/article'
// 素材管理
import images from '@/views/images'
// 文章发布
import Publish from '@/views/publish'
// 评论管理
import Comment from '@/views/comment'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login', component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
      { path: '/', component: Welcome },
      { path: 'article', component: article },
      { path: '/image', component: images },
      { path: '/publish', component: Publish },
      { path: '/comment', component: Comment },
      { path: '/fans' },
      { path: '/setting' }

    ]
  },
  { path: '*', component: error }]
})

// 设置路由守卫, 确保用户在非登录状态下不能进入系统并重定向至登录页面
router.beforeEach((to, from, next) => {
  let login = session.getToken()
  if (login && login.token) {
    // console.log(login)
    next()
  } else {
    if (to.path === '/login') {
      // console.log('*****', login)
      next()
    } else {
      // console.log('xxxx', login)
      next('/login')
    }
  }
})

export default router
