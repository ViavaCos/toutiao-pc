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

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/login', component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
      { path: '/', component: Welcome },
      { path: 'article' },
      { path: '/image' },
      { path: '/publish' },
      { path: '/comment' },
      { path: '/fans' },
      { path: '/setting' }

    ]
  },
  { path: '*', component: error }]
})
