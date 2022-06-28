import Vue, { VueConstructor } from 'vue'
import * as demos from '~/../demos'

for (let [key, demo] of Object.entries(demos)) {
  Vue.component(key, demo as VueConstructor<Vue>)
}
