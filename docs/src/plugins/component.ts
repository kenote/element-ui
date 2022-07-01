import Vue, { VueConstructor } from 'vue'
import Fragment from 'vue-fragment'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import '~/assets/less/perfect-scrollbar.less'
import * as components from '~/components'
// import { Plugin as KLElementPlugin } from '@/packages'
import * as KlElementUI from '@/packages'

Vue.use(Fragment.Plugin)
Vue.use(PerfectScrollbar)
Vue.use(KlElementUI.Plugin)

import { Autocomplete } from 'element-ui'
Vue.use(Autocomplete)

for (let [key, component] of Object.entries(components)) {
  Vue.component(key, component as VueConstructor<Vue>)
}
