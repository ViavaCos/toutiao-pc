import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入登录路由
import Login from '@/views/login/'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }]
})
