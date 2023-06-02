# Dialog

对话框

## Basic

<dc-dialog-basic />

```ts
<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开 Dialog</el-button>
    <kl-dialog title="标题" 
      :width="400" 
      :visible="visible" 
      @close="visible = false">
      <p>这是一段信息</p>
    </kl-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  visible: boolean = false
}
</script>
```

## 显示底部

<dc-dialog-footer />

```ts
<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开 Dialog</el-button>
    <kl-dialog title="标题" 
      :width="400" 
      :visible="visible" 
      :show-footer="true"
      @close="visible = false">
      <p>这是一段信息</p>
    </kl-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  visible: boolean = false
}
</script>
```

## 带全屏功能

<dc-dialog-fullscreen />

```ts
<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开 Dialog</el-button>
    <kl-dialog title="标题" 
      :width="400" 
      :visible="visible" 
      :show-footer="true"
      :show-fullscreen="true"
      @close="visible = false">
      <p>这是一段信息</p>
    </kl-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  visible: boolean = false
}
</script>
```

## 嵌入表单

<dc-dialog-form />

```ts
<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开 Dialog</el-button>
    <kl-dialog title="登录" 
      :width="500" 
      height="fit-content"
      :visible="visible" 
      show-footer="confirm"
      :loading="loading"
      @submit="$refs['dialogForm']?.['handleSubmit']()"
      @close="visible = false">
      <kl-form ref="dialogForm"
        :columns="columns" 
        :rules="rules"
        :default-values="defaultValues"
        label-width="100"
        :options="{ hide: true }"
        :loading="loading"
        @submit="handleSubmit"
        />
    </kl-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { FormItem, Verify } from '@kenote/element-ui'

@Component
export default class Demo extends Vue {

  @Provide()
  visible: boolean = false

  @Provide()
  loading: boolean = false

  @Provide()
  defaultValues = {
    username: '',
    password: ''
  }

  @Provide()
  columns: FormItem[] = [
    {
      key: 'username',
      type: 'text',
      label: '账号',
      width: 300,
      placeholder: '请输入账号',
      options: {
        clearable: true
      }
    },
    {
      key: 'password',
      type: 'password',
      label: '密码',
      width: 300,
      placeholder: '请输入密码',
      options: {
        clearable: true,
        showPassword: true
      }
    },
  ]

  @Provide()
  rules: Record<string, Verify.Rule[]> = {
    username: [
      { required: true, message: '账号不能为空' }
    ],
    password: [
      { required: true, message: '密码不能为空' }
    ],
  }
  
  handleSubmit (values: any) {
    this.loading = true
    setTimeout(() => {
      console.log(values)
      this.loading = false
      this.visible = false
    }, 500)
  }
}
</script>
```

### Prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| title | 标题名称 | `string` | -- | -- |
| visible | 是否显示 Dialog | `boolean` | -- | `fasle` |
| width | 宽度 (`px / pt / em / rem / %`) | `number / string` | -- | `50%` |
| height | 高度 (`px / pt / em / rem / %`) | `number / string` | -- | `100px` |
| center | 是否对头部和底部采用居中布局 | `boolean` | -- | `fasle` |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | `boolean` | -- | `true` |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | `boolean` | -- | `true` |
| show-close | 是否显示关闭按钮 | `boolean` | -- | `true` |
| show-fullscreen | 是否显示全屏按钮，选择 `open` 则打开默认全屏 | `boolean / 'open'` | `open` | `false` |
| show-footer | 是否显示底部，选择 `confirm` 则显示确认按钮 | `boolean / 'confirm'` | `confirm` | `false` |
| confirm-button-text | 确认按钮文字 | `string` | -- | `确 定` |
| cancel-button-text | 取消按钮文字 | `string` | -- | `取 消` |
| loading | 显示加载中 | `boolean` | -- | `fasle` |

### Slot

| name | 说明 |
| ------ | ------ |
| -- | Dialog 的内容 |
| tools | 底部扩展操作区的内容 |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| close | Dialog 关闭的回调 | -- |
| submit | Dialog 确认关闭的回调 | -- |