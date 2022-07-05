# 在 `Nuxt` 中使用

nuxt.config.js
```js
module.exports = {
  plugins: [
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/kenote-element', ssr: false }
  ]
  build: {
    babel: {
      plugins: [
        ['component', {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }],
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ],
      comments: true
    }
  },
}
```

## Plugins

plugins/kenote-element.ts
```ts
import Vue from 'vue'
import Fragment from 'vue-fragment'
import * as KlElement from '@kenote/element-ui'
import '@kenote/element-ui/lib/style.css'

export default () => {
  Vue.use(Fragment.Plugin)
  Vue.use(KlElement.Plugin)
}
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

export default async () => {
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
}
```