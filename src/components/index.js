// 引入面包屑导航组件
import breadCrumb from '@/components/bread-crumb.vue'
// 引入文章频道组件
import articleChannel from '@/components/article-channel.vue'

export default {
  install (Vue) {
    //   挂载为全局组件
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('article-channel', articleChannel)
  }
}
