<template>
  <div class="next-loading-wrap">
    <div v-if="title" class="qrlogin-title">{{ title }}</div>
    <div class="qrcode-wrap">
      <slot></slot>
    </div>
    <div class="qrcode-text">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

@Component<KlQrcode>({
  name: 'KlQrcode',
})
export default class KlQrcode extends Vue {

  @Prop({ default: undefined })
  title!: string
}
</script>

<style lang="less">
.next-loading-wrap {
  width: 200px;
  display: flex;
  flex-direction: column;

  .qrlogin-title {
    font-weight: 500;
    font-size: 24px;
    // color: rgb(24, 24, 24);
    text-align: center;
  }

  .qrcode-wrap {
    width: 180px;
    height: 180px;
    margin: 10px;
    // background-color: #74747424;
    border: 1px solid rgba(89, 92, 100, 0.191);
  }

  .qrcode-text {
    font-size: 14px;
    color: rgb(179, 179, 179);
    text-align: center;
    
    a {
      color: inherit;
      font-weight: normal;

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>