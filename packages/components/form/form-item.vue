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
      <el-radio-button v-for="(item, key) in propData" :key="key" :label="item.value" :disabled="item.disabled">
        {{ toFormatString(props)(item, format) }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="(item, key) in propData" :key="key" :label="item.value" :disabled="item.disabled">
        {{ toFormatString(props)(item, format) }}
      </el-radio>
    </template>
  </el-radio-group>
  <!-- 多选框 -->
  <el-checkbox-group v-else-if="/^(checkbox)/.test(type)" v-model="values" :disabled="disabled" :size="size" :style="style">
    <template v-if="/(button)$/.test(type)">
      <el-checkbox-button v-for="(item, key) in propData" :key="key" :label="item.value" :disabled="item.disabled">
        {{ toFormatString(props)(item, format) }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox v-for="(item, key) in propData" :key="key" :label="item.value" :disabled="item.disabled">
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
      <el-option-group :key="item.label" v-if="'children' in item" :label="item.label">
        <el-option v-for="(ele, ekey) in item.children" :key="ekey" :label="toFormatString(props)(ele, format)" :value="ele?.value" :disabled="ele?.disabled">
          <div v-if="options?.template" v-html="toFormatString(props)(item, options?.template)" ></div>
        </el-option>
      </el-option-group>
      <el-option v-else :key="key" :label="toFormatString(props)(item, format)" :value="item.value" :disabled="item?.disabled">
        <div v-if="options?.template" v-html="toFormatString(props)(item, options?.template)" ></div>
      </el-option>
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
  <!-- 开关 -->
  <el-switch v-else-if="type == 'switch'"
    v-model="values"
    :disabled="disabled"
    :active-text="options?.activeText"
    :inactive-text="options?.inactiveText"
    :active-color="options?.activeColor"
    :inactive-color="options?.inactiveColor"
    :active-value="options?.activeValue"
    :inactive-value="options?.inactiveValue"
    :active-icon-class="options?.activeIconClass"
    :inactive-icon-class="options?.inactiveIconClass"
    />
  <!-- 滑块 -->
  <el-slider v-else-if="type == 'slider'"
    v-model="values"
    :disabled="disabled"
    :min="options?.min"
    :max="options?.max"
    :step="options?.step"
    :range="options?.range"
    :marks="options?.marks"
    :show-stops="options?.showStops"
    :show-tooltip="options?.showTooltip"
    :vertical="options?.vertical"
    />
  <!-- 穿梭框 -->
  <el-form v-else-if="type == 'transfer'" :disabled="disabled">
    <el-transfer
      v-model="values"
      :data="propData"
      :props="toProps('key')"
      :filterable="options?.filterable"
      :filter-method="filterMethod"
      :filter-placeholder="options?.filterPlaceholder"
      :titles="options?.titles"
      :button-texts="options?.buttonTexts"
      :target-order="options?.targetOrder"
      :left-default-checked="options?.leftDefaultChecked"
      :right-default-checked="options?.rightDefaultChecked"
      >
      <span slot-scope="{ option }">{{ toFormatString(props)(option, format) }}</span>
    </el-transfer>
  </el-form>
  <!-- 级联选择器 -->
  <el-cascader v-else-if="type == 'cascader'"
    v-model="values"
    :style="style"
    :placeholder="placeholder"
    :disabled="disabled"
    :options="propData"
    :props="props"
    :clearable="options?.clearable"
    :filterable="options?.filterable"
    :filter-method="filterMethod"
    :show-all-levels="options?.showAllLevels"
    :separator="options?.separator"
    :size="size"
    collapse-tags />
  <!-- 级联选择面板 -->
  <div v-else-if="type == 'cascader-panel'" v-bind:style="{
    width: 'fit-content',
    ...(disabled ? { cursor: 'not-allowed', opacity: .5 } : null)
  }">
    <el-cascader-panel
      v-model="values"
      :style="{ display: 'inline-flex', ...style, pointerEvents: disabled ? 'none' : 'inherit' }"
      :options="propData"
      :props="props"
      :size="size"
      />
  </div>
  
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
import { Component, Emit, Model, Prop, Provide, Watch, Mixins } from 'vue-property-decorator'
import type { FormItemType, PropDataItem, RequestConfig } from '../../../types'
import ruleJudgment from 'rule-judgment'
import { merge, pickBy, isString, isFunction, unset } from 'lodash'
import KlBaseMixin from '../../mixins/base'
import { parseProps } from '../../'
import { DatePickerOptions } from 'element-ui/types/date-picker'
import jsYaml from 'js-yaml'
import { FilterQuery } from '@kenote/common'

@Component<KlFormItem>({
  name: 'KlFormItem',
  created () {
    if (['transfer'].includes(this.type)) {
      this.propKey = 'key'
    }
    this.propData = this.data?.map( parseProps<PropDataItem>(this.props) ) ?? []
    if (this.requestOptions) {
      this.getData(this.requestOptions, data => {
        this.propData = data?.map( parseProps<PropDataItem>(this.props) ) ?? []
      })
    }
    this.values = this.getValue(this.value)
    this.updateStyle({ width: this.toStyleSize(this.width) })
    let { filterMethod } = this.options ?? {}
    if (filterMethod) {
      let __filterMethod = filterMethod
      if (isString(filterMethod)) {
        try {
          __filterMethod = jsYaml.load(filterMethod)
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message)
          }
        }
      }
      if (isFunction(__filterMethod)) {
        this.filterMethod = __filterMethod
      }
    }
    //
  }
})
export default class KlFormItem extends Mixins(KlBaseMixin) {

  [x: string]: any

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
  data!: Array<Partial<PropDataItem> & { [x: string]: any }>

  @Prop({ default: undefined })
  props!: Partial<Record<keyof PropDataItem, string> & { [x: string]: any }>

  @Prop({ default: undefined })
  format!: string

  @Prop({ default: undefined })
  valueFormat!: string

  @Prop({ default: undefined })
  pickerOptions!: DatePickerOptions

  @Prop({ default: undefined })
  requestOptions!: RequestConfig

  @Provide()
  values: any = ''

  @Provide()
  style: Record<string, any> = {}

  @Provide()
  propData: Array<PropDataItem> = []

  @Provide()
  filterMethod: Function | null = null

  @Provide()
  filter: FilterQuery<any> = {}

  @Provide()
  propKey: string = 'value'

  @Model('update')
  value!: any

  @Emit('update')
  update (value: any) {}

  @Emit('change')
  change (value: any, oldVal: any) {}

  @Emit('get-data')
  getData (request: RequestConfig, next: (data: any) => void) {}

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

  merge = merge

  getValue (value: any) {
    let _value = ruleJudgment({ $regex: /transfer|checkbox|datanode/i })(this.type) ? [] : value
    return value ?? _value
  }

  updateStyle (values?: Record<string, any>) {
    this.style = pickBy({...this.style, ...values}, v => v !== undefined)
  }

  toProps (name: string) {
    let props = merge(this.props, { [name]: !this.props?.value || this.props?.value == name ? 'value' : this.props?.value })
    if (!name || name !== 'value') {
      unset(props, 'value')
    }
    return props
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
.el-transfer-panel__filter {
  margin: 0;
  padding: 15px;
  .el-input__prefix {
    left: 15px;
  }
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 0 !important;

  // ul {
  //   padding: 0;
  // }
}
.el-cascader-menu__list {
  padding: 6px 0 !important;
  margin: 0 !important;
}
.el-cascader-menu__wrap {
  margin-bottom: 15px !important;
  height: 204px !important;
}
.el-form-item__content {
  padding-right: 12px;
}
</style>