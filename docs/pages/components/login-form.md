# LoginForm

登录表单

## Example

<dc-login-form />

### Code

```vue
<template>
  <kl-login-form :loading="loading" @submit="handleSubmit" />
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  loading: boolean = false
  
  handleSubmit (values: any) {
    console.log(values)
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1500)
  }
}
</script>
```

## Example

<dc-login-form type="01" />

### Code

```vue
<template>
  <kl-login-form 
    :loading="loading" 
    @submit="handleSubmit" >
    <!-- service-terms -->
    <template slot="service-terms">
      <a href="javascript:;">忘记密码</a>
      <a href="javascript:;" class="ng-hide">立即注册</a>
    </template>
  </kl-login-form>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  loading: boolean = false
  
  handleSubmit (values: any) {
    console.log(values)
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1500)
  }
}
</script>
```

## Example

<dc-login-form type="02" />

### Code

```vue
<template>
  <kl-login-form 
    :loading="loading" 
    :thirdparty-login="true"
    @submit="handleSubmit" >
    <!-- service-terms -->
    <template slot="service-terms">
      <a href="javascript:;">忘记密码</a>
      <a href="javascript:;" class="ng-hide">立即注册</a>
    </template>
    <!-- third-party-login -->
    <template slot="third-party-login">
      <i class="iconfont icon-github-fill"></i>
      <i class="iconfont icon-WeChat-LC"></i>
      <i class="iconfont icon-weibo"></i>
    </template>
  </kl-login-form>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  loading: boolean = false
  
  handleSubmit (values: any) {
    console.log(values)
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1500)
  }
}
</script>
```

## Example

<dc-login-form type="03" />

### Code

```vue
<template>
  <kl-login-form 
    :loading="loading" 
    :thirdparty-login="true"
    :qrcode-login="true"
    @submit="handleSubmit" >
    <!-- service-terms -->
    <template slot="service-terms">
      <a href="javascript:;">忘记密码</a>
      <a href="javascript:;" class="ng-hide">立即注册</a>
    </template>
    <!-- third-party-login -->
    <template slot="third-party-login">
      <i class="iconfont icon-github-fill"></i>
      <i class="iconfont icon-WeChat-LC"></i>
      <i class="iconfont icon-weibo"></i>
    </template>
    <!-- qrcode -->
    <template slot="qrcode">
      <kl-qrcode title="扫码登录">
        <template slot="description">
          使用微信扫一扫 <a>微信授权页</a>
        </template>
        <img src="data:image/png;base64,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" alt="二维码"  />
      </kl-qrcode>
    </template>
    <!-- protocol -->
    <template slot="protocol">
      登录视为您已同意<a>第三方账号绑定协议、服务条款、隐私政策</a>
    </template>
  </kl-login-form>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {

  @Provide()
  loading: boolean = false
  
  handleSubmit (values: any) {
    console.log(values)
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1500)
  }
}
</script>
```

## API

### Porps

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | :------: |
| loading | 提交中状态 | boolean | -- | false |
| username-label | 用户名字段名称 | string | -- | \'用户名\' |
| username-placeholder | 用户名字段占位文本 | string | -- | \'用户名\' |
| username-message | 用户名字段提示信息 | string | -- | \'请输入用户名\' |
| password-label | 密码字段名称 | string | -- | \'密码\' |
| password-placeholder | 密码字段占位文本 | string | -- | \'密码\' |
| password-message | 密码字段提示信息 | string | -- | \'请输入密码\' |
| submit-name | 提交按钮显示文字 | string | -- | \'登 录\' |
| button-type | 提交按钮类型 | string | primary / success / warning / danger / info | \'primary\' |
| thirdparty-login | 开启第三方登录模块 | boolean | -- | false |
| thirdparty-login-text | 第三方登录模块显示标题 | string | -- | \'其他方式\' |
| qrcode-login | 开启二维码登录模块 | boolean | -- | false |
| wait-step | 提交等待时长（秒） | number | -- | 5 |
| wait-message | 提交等待提示文字 | string | -- | \`请在 `{{`step`}}` 秒后再做提交\' |

### Slots 

| name | 说明 |
| ------ | ------ |
| service-terms | 自定义附加链接 |
| third-party-login | 自定义第三方模块 |
| qrcode | 自定义二维码登录 |
| protocol | 自定义协议描述 |

### Events

| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| submit | 登录提交 | (value: any, cb: Callback\<any,, any\>) |