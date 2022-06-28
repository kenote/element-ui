<template>
  <div ref="drawer" class="kl-drawer" :style="styles" v-bind:class="placement">
    <slot name="header"></slot>
    <slot style="height:100%"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { get, merge, compact } from 'lodash'

@Component<KlDrawer>({
  name: 'KlDrawer',
  created () {
    this.getStyles(this.width)
  }
})
export default class KlDrawer extends Vue {

  @Prop({ default: 'right' })
  placement!: 'top' | 'bottom' | 'left' | 'right'

  @Prop({ default: 360 })
  width!: number

  @Prop({ default: false })
  visible!: boolean

  @Prop({ default: false })
  lock!: boolean

  @Prop({ default: undefined })
  zIndex!: number

  @Prop({ default: 'px' })
  unit!: 'px' | 'rem' | 'em'

  @Prop({ default: 0 })
  offset!: number

  @Provide()
  styles: Record<string, string | number> = {}

  @Provide()
  timestamp: number = 0

  @Watch('width')
  onWidthChange (val: number, oldVal: number) {
    if (val === oldVal) return
    this.getStyles(val)
  }

  @Watch('visible')
  onVisibleChange (val: boolean, oldVal: boolean) {
    if (val === oldVal) return
    if (val) {
      document.addEventListener('click', this.handleClick, true)
      this.styles = merge(this.styles, {
        [this.placement]: '0'
      })
      this.timestamp = Date.now()
      this.$emit('open', null)
    }
    else {
      document.removeEventListener('click', this.handleClick, false)
      this.styles = merge(this.styles, {
        [this.placement]: `-${this.width}${this.unit}`
      })
    }
  }

  handleClick (evt: MouseEvent) {
    if (this.lock) return
    let drawer = this.$refs?.['drawer'] as HTMLElement
    let paths = compact(get(evt, 'path')?.map( el => el.className ))
    if (!paths.includes(drawer?.className ?? '')) {
      if (Date.now() - this.timestamp < 10) return
      this.visible && this.$emit('close', null)
    }
  }

  getStyles (value: number) {
    let size = ['top', 'bottom'].includes(this.placement) ? 'height' : 'width'
    let styles = {}
    if (['left', 'right'].includes(this.placement)) {
      styles['top'] = `${this.offset}${this.unit}`
    }
    if (this.zIndex) {
      styles['z-index'] = this.zIndex
    }
    this.styles = merge({
      [size]: `${value}${this.unit}`,
      [this.placement]: `-${value}${this.unit}`
    }, styles)
  }

}
</script>

<style lang="less">
.kl-drawer {
  position: fixed;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: all .5s;
  background-color: #ffffff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.top {
    top: 0;
    left: 0;
    right: 0;
  }

  &.bottom {
    bottom: 0;
    left: 0;
    right: 0;
  }

  &.left {
    top: 0;
    bottom: 0;
    left: 0;
  }

  &.right {
    top: 0;
    bottom: 0;
    right: 0;
  }
}
</style>