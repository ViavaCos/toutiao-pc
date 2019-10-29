import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui的css文件
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 引入axios
import axios from '@/api'
// 引入自定义插件
import plugin from '@/components'

// 使用element-ui
Vue.use(ElementUI)
// 使用自定义组件
Vue.use(plugin)

// 全局配置axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
