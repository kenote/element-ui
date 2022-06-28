# 安装

需要预先安装配置 `element-ui`

## npm 安装

```bash
npm i @kenote/element-ui -S
```

## 引入

#### 完整引入

```ts
import Vue from 'vue'
import { Plugin as KlElementUI } from '@kenote/element-ui'
import '@kenote/element-ui/dist/style.css'

Vue.use(KlElementUI)
```

#### 按需引入

```ts
import Vue from 'vue'
import { ChannelSearchbar, Drawer } from '@kenote/element-ui'
import '@kenote/element-ui/dist/style.css'

Vue.component(ChannelSearchbar.name, ChannelSearchbar)
Vue.component(Drawer.name, Drawer)
```
