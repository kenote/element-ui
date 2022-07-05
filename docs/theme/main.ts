import Vue, { CreateElement } from 'vue'
import App from './App.vue'
import router from './router'
import VueHead from 'vue-head'
import VueCompositionAPI from '@vue/composition-api'

// 加载 内部组件
import './plugins/component'
// 加载 Demo
import './plugins/demo'
// 加载 Element UI 组件
import './plugins/element-ui'
// 加载 Lib 组件
import './plugins/lib'

import 'virtual:windi.css'
import 'element-ui/lib/theme-chalk/index.css'
import '~/assets/iconfont/iconfont.css'
import '~/assets/less/common.less'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
Vue.use(VueHead)

new Vue({
  router,
  render: (h: CreateElement) => h(App)
}).$mount('#app')