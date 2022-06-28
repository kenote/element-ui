import Vue, { CreateElement } from 'vue'
import App from './App.vue'
import router from '~/router'
import VueHead from 'vue-head'
import VueCompositionAPI from '@vue/composition-api'

import '~/plugins/component'
import '~/plugins/demo'
import 'virtual:windi.css'
import 'element-ui/lib/theme-chalk/index.css'
import '~/assets/iconfont/iconfont.css'
import '~/assets/less/common.less'

// import 'prismjs/themes/prism.min.css'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
Vue.use(VueHead)

new Vue({
  router,
  render: (h: CreateElement) => h(App)
}).$mount('#app')