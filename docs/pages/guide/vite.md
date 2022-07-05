# 在 `Vite` 中使用

vite.config.ts
```ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  Components({
    resolvers: [ 
      ElementUiResolver(),
      (componentName) => {
        if (componentName.startsWith('Kl')) {
          return { name: componentName.slice(2), from: '@kenote/element-ui' }
        }
      },
    ],
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: false
  }),
})
```

main.ts
```ts
import Vue, { CreateElement } from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element-ui'
import './plugins/kenote-element'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h: CreateElement) => h(App)
}).$mount('#app')
```

## Plugins

plugins/kenote-element.ts
```ts
import Vue from 'vue'
import Fragment from 'vue-fragment'
import * as KlElement from '@kenote/element-ui'

Vue.use(Fragment.Plugin)
Vue.use(KlElement.Plugin)
```

plugins/element-ui.ts
```ts
import Vue from 'vue'
import { 
  Autocomplete,
  Button,
  Form,
  FormItem,
  Input,
  Loading,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Notification
} from 'element-ui'

Vue.use(Autocomplete)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading.directive)
Vue.use(Menu)
Vue.use(MenuItem)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Loading.service
```