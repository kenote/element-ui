<template>
  <div class="form-container" v-bind:class="border && 'border'">
    <el-form ref="theForm"
      :model="values"
      :rules="Rules"
      :label-width="toStyleSize(labelWidth)"
      :label-position="labelPosition"
      :label-suffix="labelSuffix"
      :inline="inline"
      :inline-message="inlineMessage"
      :status-icon="statusIcon"
      :hide-required-asterisk="hideRequiredAsterisk"
      :disabled="disabled"
      @keyup.enter.native="handleSubmit"
      @submit.native.prevent="handleSubmit">
      <!-- 单元元素 -->
      <el-row :gutter="20">
        <el-col :span="24">
          <template v-for="(item, key) in columns">
            <el-form-item :key="key" :ref="item.key"
              :label="item.label"
              :rules="Rules?.[item.key]"
              :prop="item.key"
              :label-width="toStyleSize(item.labelWidth)"
              :style="{ paddingRight: 0 }"
              >
              <template slot="label" v-if="item.labelOptions">
                <el-select v-model="values[item.labelOptions.key]" :style="{ width: 'calc(100% - 14px)' }">
                  <el-option v-for="(name, key) in item.labelOptions.options" :key="key" :label="name" :value="key"></el-option>
                </el-select>
              </template>
              <kl-form-item :type="item.type" v-model="values[item.key]"
                :placeholder="item?.placeholder"
                :disabled="isDisabled(item?.disabled)"
                :width="item?.width"
                :size="item?.size"
                :format="item?.format"
                :value-format="item?.valueFormat"
                :options="item?.options"
                :data="item?.data"
                :props="item?.props"
                :pickerOptions="item?.pickerOptions"
                :readonly="item?.readonly"
                :request-options="item?.requestOptions"
                @get-data="getData"
                @change="handleChange"
                />
            </el-form-item>
          </template>
        </el-col>
      </el-row>
      <!-- Footer -->
      <el-row :gutter="20" v-if="!options?.hide">
        <el-col :span="24">
          <div class="el-form-item" :style="{ marginLeft: `${toStyleSize(labelWidth)}` }" v-bind:class="inline ? 'footer' : ''">
            <el-button type="primary" native-type="submit" :loading="loading"> {{ submitName }} </el-button>
            <el-button v-if="options?.reset" plain @click="handleRest">{{ options?.reset }}</el-button>
            <kl-form-expand :data="options?.emits" :env="env" :values="values" @command="command" />
            <kl-plan-picker v-if="options?.draft" 
              v-model="selectedDraft"
              :name="options?.draft?.name"
              :placeholder="options?.draft?.placeholder"
              :width="options?.draft?.width"
              :drafts="options?.draft?.data??[]"
              :associate="options?.draft?.associate"
              @update-plan="handleUpdatePlan"
              @clear="handleRest"
              @change="handleSetValues"
              />
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Mixins, Emit } from 'vue-property-decorator'
import KlFormMixin from '../../mixins/form'
import { Form as ElForm } from 'element-ui'
import type { FormItemColumn, Verify, SubmitOptions, RequestConfig, PlanDataItem } from '../../../types'
import KlFormItem from './form-item.vue'
import { parseRules, parseParams } from '../../'
import { cloneDeep, map, set, pick, omit, merge, zipObject, unset, isEqual, omitBy, isUndefined, assign, isString } from 'lodash'
import { formatData } from 'parse-string'
import ruleJudgment from 'rule-judgment'
import KlFormExpand from './form-expand.vue'
import KlPlanPicker from './plan-picker.vue'
import jsYaml from 'js-yaml'

@Component<KlForm>({
  name: 'KlForm',
  components: {
    KlFormItem,
    KlFormExpand,
    KlPlanPicker
  },
  created () {
    this.Rules = parseRules(this.validate)(this.rules, this)
    this.DefaultValues = parseParams(this.defaultValues)(this.env)
    this.values = cloneDeep(this.DefaultValues)
  },
})
export default class KlForm extends Mixins(KlFormMixin) {

  @Provide()
  Rules: Record<string, Verify.Rule[]> = {}

  @Provide()
  DefaultValues: Record<string, any> = {}

  @Provide()
  values: Record<string, any> = {}

  @Provide()
  selectedDraft: string = ''

  @Emit('get-data')
  getData<T> (request: RequestConfig | string, options: any, next: (data: T) => void) {}

  @Emit('update-plan')
  updatePlan<T> (type: string, options: Partial<PlanDataItem>, next: (node: T) => void) {}

  parseRules = parseRules(this.validate)

  handleUpdatePlan<T> (type: string, options: Partial<PlanDataItem>, next: (node: T) => void) {
    this.updatePlan(type, merge(options, { content: jsYaml.dump(this.values) } ), next)
  }

  handleSetValues (values: any) {
    if (isString(values)) {
      this.values = jsYaml.load(values)
    }
    else {
      this.values = values
    }
  }

  handleChange () {
    console.log(this.values)
  }

  handleSubmit () {
    let theForm = <ElForm> this.$refs?.['theForm']
    theForm.validate( valid => {
      if (valid) {
        let keys = map(this.columns.filter( v => this.isFilter(v.conditions) ), 'key')
        let values = this.parseValues(pick(this.values, keys))
        let original = this.parseValues(pick(this.DefaultValues, keys))
        let { changeSubmit } = this.options ?? {}
        if (changeSubmit && isEqual(omitBy(values, isUndefined), original)) {
          this.$message.warning(changeSubmit ?? '数据好像没什么改变，无需提交')
          return
        }
        let submitOptions: SubmitOptions =  { ...this.options, 
          next: val => {
            this.DefaultValues = assign(this.DefaultValues, val)
            this.values = cloneDeep(this.DefaultValues)
          }
        }
        let labelKeys = map(this.columns.filter(ruleJudgment<FormItemColumn>({ labelOptions: { $exists: true } })), 'labelOptions.key')
        values = merge(values, pick(this.values, labelKeys))
        this.submit(values, this.action, submitOptions)
      }
      else {
        return false
      }
    })
  }

  parseValues (value: Record<string, any>) {
    for (let [key, val] of Object.entries(this.mergeField??{})) {
      set(value, key, pick(value, val))
    }
    let values = this.exclude ? omit(value, this.exclude) : value
    let items = this.columns.filter( v => ['datetimerange', 'daterange', 'monthrange'].includes(v.type) )
    for (let item of items) {
      let keys = item.key.split(/\_{2}/)
      if (keys.length === 2) {
        values = merge(values, zipObject(keys, values?.[item.key]))
        unset(values, item.key)
      }
    }
    for (let [key, format] of Object.entries(this.valueFormat??{})) {
      values[key] = formatData(format)(values?.[key])
    }
    return values
  }

  handleRest () {
    let theForm = <ElForm> this.$refs?.['theForm']
    theForm.resetFields()
    this.$emit('reset', this.DefaultValues)
    this.values = cloneDeep(this.DefaultValues)
    this.selectedDraft = ''
  }
}
</script>

<style lang="less">
.form-container {
  &.border {
    margin-bottom: 20px;
    padding: 20px 15px 0;
    background: #fbfbfb;
    border: 1px solid #807e7e38;
    border-radius: 6px;
  }

  .el-form {
    .el-form-item {
      margin-bottom: 28px;

      .el-button {
        border-radius: 0;
      }

      .el-select:has(.el-form-item__label) {
        padding-right: 0;
      }
      &.footer {
        border-top: 1px dashed #8a868647;
        padding: 20px 15px 0;
        margin: 0 0 20px;
        width: inherit;
        margin-left: 0 !important;

        &>.el-button:first-child {
          width: 120px;
        }
        &>:not(:first-child) {
          margin-left: 10px;
        }
      }
      .el-dropdown {

        &.disabled>.el-button {
          color: #C0C4CC;
          cursor: not-allowed;
          background-image: none;
          background-color: #FFF;
          border-color: #EBEEF5;
        }
      }
    }
    .el-input__inner {
      border-radius: 0;
    }
  }
}
.el-dropdown-menu {
  min-width: 150px;
}
</style>