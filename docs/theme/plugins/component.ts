import Vue, { VueConstructor } from 'vue'
import Fragment from 'vue-fragment'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import '~/assets/less/perfect-scrollbar.less'
import Clipboard from 'v-clipboard'
import * as components from '~/components'


Vue.use(Fragment.Plugin)
Vue.use(PerfectScrollbar)
Vue.use(Clipboard)

for (let [key, component] of Object.entries(components)) {
  Vue.component(key, component as VueConstructor<Vue>)
}
