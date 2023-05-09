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
  </el-select>
  <!-- 单日期选择 -->
  <el-date-picker v-else-if="['year', 'years', 'month', 'months', 'date', 'dates', 'week', 'datetime'].includes(type)"
    v-model="values"
    :type="type"
    :style="style"
    :placeholder="placeholder"
    :disabled="disabled"
    :format="format"
    :value-format="valueFormat"
    :size="size"
    :picker-options="pickerOptions"
    :align="options?.align"
    :clearable="options?.clearable"
    :editable="options?.editable"
    :default-time="options?.defaultTime"
    :readonly="readonly"
    />
  <!-- 日期范围选择 -->
  <el-date-picker v-else-if="['datetimerange', 'daterange', 'monthrange'].includes(type)"
    v-model="values"
    :type="type"
    :style="style"
    :start-placeholder="placeholder?.[0]"
    :end-placeholder="placeholder?.[1]"
    :disabled="disabled"
    :format="format"
    :value-format="valueFormat"
    :size="size"
    :picker-options="pickerOptions"
    :align="options?.align"
    :clearable="options?.clearable"
    :editable="options?.editable"
    :range-separator="options?.rangeSeparator"
    :default-time="options?.defaultTime"
    :readonly="readonly"
    />
  <!-- 时间选择 -->
  <el-time-picker v-else-if="type == 'time'"
    v-model="values"
    :style="style"
    :placeholder="placeholder"
    :disabled="disabled"
    :value-format="valueFormat"
    :size="size"
    :picker-options="pickerOptions"
    :align="options?.align"
    :clearable="options?.clearable"
    :editable="options?.editable"
    :arrow-control="options?.arrowControl"
    :readonly="readonly"
    />
  <!-- 时间范围选择 -->
  <el-time-picker v-else-if="type == 'timerange'" is-range
    v-model="values"
    :style="style"
    :start-placeholder="placeholder?.[0]"
    :end-placeholder="placeholder?.[1]"
    :disabled="disabled"
    :value-format="valueFormat"
    :size="size"
    :picker-options="pickerOptions"
    :align="options?.align"
    :clearable="options?.clearable"
    :editable="options?.editable"
    :arrow-control="options?.arrowControl"
    :readonly="readonly"
    />
  
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
import type { FormItemType, PropDataItem } from '../../../types'
import ruleJudgment from 'rule-judgment'
import { isNumber, merge, assign, pickBy, identity } from 'lodash'
import KlBaseMixin from '../../mixins/base'
import { isDisabled, parseProps } from '../../'
import { format } from 'path'
import { DatePickerOptions } from 'element-ui/types/date-picker'

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

  @Prop({ default: undefined })
  pickerOptions!: DatePickerOptions

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

.el-time-spinner__wrapper:not(.is-arrow) {
  &>.el-time-spinner__list::after, .el-time-spinner__list::before {
    margin-top: -8px;
  }
}

.el-picker-panel {
  color: inherit;
}
.el-date-table th {
  color: inherit;
}
.el-date-picker__header-label {
  color: inherit;
}
.el-picker-panel__icon-btn {
  color: inherit;
}
.el-date-table td.next-month, .el-date-table td.prev-month {
  opacity: .6;
  // color: #C0C4CC;
}
.el-time-spinner__item {
  color: inherit;
}
.el-time-spinner__item.active:not(.disabled) {
  color: inherit;
}
.el-time-panel__btn {
  color: inherit;
}
.el-month-table td .cell {
  color: inherit;
}
.el-year-table td .cell {
  color: inherit;
}
.el-picker-panel [slot=sidebar], .el-picker-panel__sidebar {
  background-color: inherit;
}
.el-picker-panel__shortcut {
  color: inherit;
}
.el-range-editor.el-input__inner {
  padding: 3px 0 3px 10px;
}
.el-date-editor .el-range-separator {
  color: inherit;
}
.el-date-range-picker__time-header>.el-icon-arrow-right {
  color: inherit;
}
</style>