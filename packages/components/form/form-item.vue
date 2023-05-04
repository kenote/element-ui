<template>
  <!-- 密码输入框 -->
  <el-input v-if="type == 'password'"
    type="password"
    v-model="values"
    :style="style"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="options?.clearable"
    :minlength="options?.minlength"
    :maxlength="options?.maxlength"
    :show-password="options?.showPassword"
    :size="size"
    :readonly="readonly"
    />
  <!-- 数字输入框 -->
  <el-input-number v-else-if="type == 'input-number'"
    v-model="values"
    :style="style"
    :placeholder="placeholder"
    :disabled="disabled"
    :min="options?.min"
    :max="options?.max"
    :step="options?.step"
    :precision="options?.precision"
    :step-strictly="options?.stepStrictly"
    :controls="options?.controls"
    :controls-position="options?.controlsPosition"
    :label="options?.label"
    :size="size"
    :readonly="readonly"
    />
  <!-- 多行文本框 -->
  <el-input v-else-if="type == 'textarea'"
    type="textarea"
    v-model="values"
    :style="style"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="options?.clearable"
    :minlength="options?.minlength"
    :maxlength="options?.maxlength"
    :show-word-limit="options?.showWordLimit"
    :rows="options?.rows"
    :autosize="options?.autosize"
    :resize="options?.resize"
    :readonly="readonly"
    />
  <!-- 单选框 -->
  <el-radio-group v-else-if="/^(radio)/.test(type)" v-model="values" :disabled="disabled" :size="size" :style="style">
    <template v-if="/(button)$/.test(type)">
      <el-radio-button v-for="(item, key) in propData" :key="key" :label="item.key" :disabled="item.disabled">
        {{ toFormatString(props)(item, format) }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="(item, key) in propData" :key="key" :label="item.key" :disabled="item.disabled">
        {{ toFormatString(props)(item, format) }}
      </el-radio>
    </template>
  </el-radio-group>
  <!-- 多选框 -->
  <el-checkbox-group v-else-if="/^(checkbox)/.test(type)" v-model="values" :disabled="disabled" :size="size" :style="style">
    <template v-if="/(button)$/.test(type)">
      <el-checkbox-button v-for="(item, key) in propData" :key="key" :label="item.key" :disabled="item.disabled">
        {{ toFormatString(props)(item, format) }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox v-for="(item, key) in propData" :key="key" :label="item.key" :disabled="item.disabled">
        {{ toFormatString(props)(item, format) }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
  <!-- 下拉选择器 -->
  <el-select v-else-if="type == 'select'" v-model="values" :disabled="disabled" :size="size" :style="style"
    :placeholder="placeholder"
    :clearable="options?.clearable"
    :filterable="options?.filterable"
    :multiple="options?.multiple"
    :multiple-limit="options?.multipleLimit"
    :allow-create="options?.allowCreate"
    :popper-class="options?.popperClass"
    collapse-tags >
    <template v-for="(item, key) in propData">
      <el-option-group :key="item.label" v-if="'options' in item" :label="item.label">
        <el-option v-for="(ele, ekey) in item.options" :key="ekey" :label="toFormatString(props)(ele, format)" :value="ele.key" :disabled="ele?.disabled"></el-option>
      </el-option-group>
      <el-option v-else :key="key" :label="toFormatString(props)(item, format)" :value="item.key" :disabled="item?.disabled"></el-option>
    </template>
    <!-- <el-option v-for="(item, key) in propData" :key="key" :label="toFormatString(props)(item, format)" :value="item.key" :disabled="disabled"></el-option> -->
  </el-select>
  <!-- 单行输入框 -->
  <el-input v-else
    v-model="values"
    :style="style"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="options?.clearable"
    :minlength="options?.minlength"
    :maxlength="options?.maxlength"
    :show-word-limit="options?.showWordLimit"
    :prefix-icon="options?.prefixIcon"
    :suffix-icon="options?.suffixIcon"
    :size="size"
    :readonly="readonly"
    />
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Provide, Vue, Watch, Mixins } from 'vue-property-decorator'
import type { FormItemType, PropDataItem } from '@/types'
import ruleJudgment from 'rule-judgment'
import { isNumber, merge, assign, pickBy, identity } from 'lodash'
import KlBaseMixin from '../../mixins/base'
import { isDisabled, parseProps } from '../../'
import { format } from 'path'

@Component<KlFormItem>({
  name: 'KlFormItem',
  created () {
    this.propData = this.data?.map( parseProps<PropDataItem>(this.props) ) ?? []
    this.values = this.getValue(this.value)
    this.updateStyle({ width: this.toStyleSize(this.width) })
  }
})
export default class KlFormItem extends Mixins(KlBaseMixin) {

  @Prop({ default: 'input' })
  type!: FormItemType

  @Prop()
  width!: number | string

  @Prop({ default: undefined })
  placeholder!: string | string[]

  @Prop({ default: false })
  disabled!: boolean

  @Prop({ default: false })
  readonly!: boolean

  @Prop({ default: undefined })
  size!: string

  @Prop({ default: undefined })
  options!: Record<string, any>

  @Prop({ default: undefined })
  data!: Record<string, any>[]

  @Prop({ default: undefined })
  props!: Partial<Record<keyof PropDataItem, string>>

  @Prop({ default: undefined })
  format!: string

  @Prop({ default: undefined })
  valueFormat!: string

  @Provide()
  values: any = ''

  @Provide()
  style: Record<string, any> = {}

  @Provide()
  propData: Record<string, any>[] = []

  @Model('update')
  value!: any

  @Emit('update')
  update (value: any) {}

  @Emit('change')
  change (value: any, oldVal: any) {}

  @Watch('value')
  onValueChange (val: any, oldVal: any) {
    if (val === oldVal) return
    this.values = this.getValue(val)
  }

  @Watch('values')
  onValuesChange (val: any, oldVal: any) {
    if (val === oldVal) return
    this.update(val)
    this.change(val, oldVal)
  }

  @Watch('width')
  onWidthChange (val: number | string, oldVal: number | string) {
    if (val === oldVal) return
    this.updateStyle({ width: this.toStyleSize(this.width) })
  }

  getValue (value: any) {
    let _value = ruleJudgment({ $regex: /transfer|checkbox|datanode/i })(this.type) ? [] : value
    return value ?? _value
  }

  toStyleSize (value?: number | string) {
    if (!value) return undefined
    if (typeof value == 'number' || /^([0-9]+)?(\.)?([0-9]+)$/.test(value)) {
      return `${value}px`
    }
    if (/^([0-9]+)?(\.)?([0-9]+)(px|pt|em|rem|%)$|^auto$/.test(value)) {
      return value
    }
    return undefined
  }

  updateStyle (values?: Record<string, any>) {
    this.style = pickBy({...this.style, ...values}, v => v !== undefined)
  }
}
</script>

<style lang="less">
.el-input .el-input__count .el-input__count-inner {
  background: inherit !important;
}
.el-textarea .el-input__count {
  background: inherit !important;
}
.el-radio-group {
  line-height: 2.4rem;
}
</style>