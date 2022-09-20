<template>
  <div class="landing-body" v-bind:style="qrcodeLogin ? 'padding: 40px 0 60px 0' : ''">
    <template v-if="qrcodeLogin">
      <div class="protocol">
        <slot name="protocol"></slot>
      </div>
      <div class="qr-method">
        <slot name="qrcode"></slot>
      </div>
    </template>
    
    <div class="wrapper">
      <el-form ref="theForm" :model="values" :rules="rules" @submit.native.prevent="handleSubmit" label-position="top" hide-required-asterisk>
        <el-form-item prop="username" :rules="rules.username" :label="usernameLabel" class="h-96px">
          <el-input :placeholder="usernamePlaceholder" v-model="values.username" />
        </el-form-item>
        <el-form-item prop="password" :rules="rules.password" :label="passwordLabel" class="h-96px">
          <el-input type="password" :placeholder="passwordPlaceholder" v-model="values.password" />
        </el-form-item>
        <el-form-item>
          <el-button :type="buttonType" native-type="submit" :loading="loading">{{ submitName }}</el-button>
          <p class="service-terms">
            <slot name="service-terms"></slot>
          </p>
        </el-form-item>
      </el-form>
      <div class="third-party-login-wrap" v-if="thirdpartyLogin">
        <div class="third-party-login-text">{{ thirdpartyLoginText }}</div>
        <div class="third-party-login">
          <slot name="third-party-login"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { Account } from '@/types'
import { FilterData } from 'parse-string'
import { Form as ElForm } from 'element-ui'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/message.css'
import { parseTemplate } from '../../utilities'
import { Callback } from 'nunjucks'

@Component<KlLoginForm>({
  name: 'KlLoginForm',
})
export default class KlLoginForm extends Vue {

  @Prop({ default: false })
  loading!: boolean

  @Prop({ default: '用户名' })
  usernameLabel!: string

  @Prop({ default: '用户名' })
  usernamePlaceholder!: string

  @Prop({ default: '请输入用户名' })
  usernameMessage!: string

  @Prop({ default: '密码' })
  passwordLabel!: string

  @Prop({ default: '密码' })
  passwordPlaceholder!: string

  @Prop({ default: '请输入密码' })
  passwordMessage!: string

  @Prop({ default: '登 录' })
  submitName!: string

  @Prop({ default: 'primary' })
  buttonType!: string

  @Prop({ default: '其他方式' })
  thirdpartyLoginText!: string

  @Prop({ default: false })
  thirdpartyLogin!: boolean

  @Prop({ default: false })
  qrcodeLogin!: boolean

  @Prop({ default: 5 })
  waitStep!: number

  @Prop({ default: '请在 {{step}} 秒后再做提交' })
  waitMessage!: string

  @Provide()
  times: number = 0

  @Provide()
  values: Account.login = {}

  @Provide()
  rules: Record<keyof Account.login, FilterData.rule[]> = {
    username: [
      { required: true, message: this.usernameMessage }
    ],
    password: [
      { required: true, message: this.passwordMessage }
    ]
  }

  @Emit('submit')
  submit (values: Account.login, cb?: Callback<any, any>) {}

  handleSubmit () {
    if (this.times > 0) {
      Message.warning(parseTemplate(this.waitMessage, { step: this.times }))
      return
    }
    let theForm = this.$refs['theForm'] as ElForm
    theForm.validate( valid => {
      if (valid) {
        this.submit(this.values, this.callback)
      }
      else {
        return false
      }
    })
  }

  callback (err: any, res: any) {
    if (err) {
      this.sendWait(this.waitStep)
    }
    else {
      let theForm = this.$refs['theForm'] as ElForm
      theForm.resetFields()
    }
  }

  sendWait (step: number) {
    this.times = step
    // @ts-ignore
    let timer: NodeJS.Timeout | null = setInterval(() => {
      this.times --
      if (this.times <= 0) {
        clearTimeout(timer!)
        timer = null
      }
    }, 1000)
  }
}
</script>

<style lang="less">
.landing-body {
  display: flex;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 15px;
  width: fit-content;
  // height: 300%;
  justify-content: space-between;
  // padding: 40px 0 60px 0;
  position: relative;

  .protocol {
    position: absolute;
    bottom: 14px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: rgb(179, 179, 179);

    a {
      color: inherit;
      font-weight: normal;

      &:hover {
        background-color: transparent;
      }
    }
  }

  .qr-method {
    padding: 0 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 0.5px solid rgba(89, 92, 100, 0.191);
  }

  .wrapper {
    // margin: 0 50px;
    width: 400px;
    padding-bottom: 10px;

    form {
      padding: 10px 34px;

      .el-form-item {
        margin-bottom: 0;
        height: 96px;

        &:last-of-type {
          height: inherit;
        }
      }
  
      .el-form-item__label {
        padding: 0;
      }

      .el-input__inner {
        border-radius: 0;
      }

      .el-form-item__error {
        position: inherit;
      }

      .el-button {
        width: 100%;
        border-radius: 0;
        margin-top: 8px;
        font-size: 16px;
      }

      &.lostpass-start .el-form-item__error {
        position: absolute;
      }
    }

    p {
      margin: 8px 0;
    }

    .service-terms {
      color: #747474;
      font-size: 13px;

      a {
        color: inherit;
        font-weight: normal;

        &:hover {
          background-color: transparent;
        }
      }

      .ng-hide {
        float: right;
        margin-left: 10px;
      }
    }

    .third-party-login-wrap {
      display: flex;
      margin: 0 34px;
      margin-top: 30px;
      height: 30px;
      justify-content: flex-start;

      .third-party-login-text {
        font-size: 12px;
        color: rgb(155, 158, 160);
        vertical-align: middle;
        line-height: 30px;
        margin-right: 40px;
      }

      .third-party-login {
        line-height: 30px;
        text-align: center;

        .iconfont, i {
          font-size: 20px;
          color: rgb(155, 158, 160);
          margin-right: 4px;
          cursor: pointer;
        }

        a {
          color: inherit;
          font-weight: normal;

          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>