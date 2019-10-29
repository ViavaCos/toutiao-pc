// 引入面包屑导航组件
import breadCrumb from '@/components/bread-crumb'

export default {
  install (Vue) {
    //   挂载为全局组件
    Vue.component('bread-crumb', breadCrumb)
  }
}
