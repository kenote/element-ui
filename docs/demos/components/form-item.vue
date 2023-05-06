<template>
  <div>
    <!-- 密码输入框 -->
    <kl-form-item v-if="type == 'password'"
      v-model="values.input" 
      type="password"
      width="300"
      placeholder="请输入密码"
      :options="options.password"
      @change="handleChange"
      />
    <!-- 数字输入框 -->
    <kl-form-item v-else-if="type == 'input-number'"
      v-model="values.inputNumber" 
      type="input-number"
      width="300"
      :options="options.inputNumber"
      @change="handleChange"
      />
    <!-- 多行文本框 -->
    <kl-form-item v-else-if="type == 'textarea'"
      v-model="values.input" 
      type="textarea"
      width="300"
      placeholder="请输入文本内容"
      :options="options.textarea"
      @change="handleChange"
      />
    <!-- 单选框 -->
    <kl-form-item v-else-if="type == 'radio'"
      v-model="values.radio" 
      type="radio"
      :data="data.radio"
      :props="props.radio"
      @change="handleChange"
      />
    <!-- 单选框 -->
    <kl-form-item v-else-if="type == 'radio-button'"
      v-model="values.radio" 
      type="radio-button"
      :data="data.radio"
      :props="props.radio"
      @change="handleChange"
      />
    <!-- 多选框 -->
    <kl-form-item v-else-if="type == 'checkbox'"
      v-model="values.checkbox" 
      type="checkbox"
      :data="data.checkbox"
      :props="props.checkbox"
      @change="handleChange"
      />
    <!-- 多选框 -->
    <kl-form-item v-else-if="type == 'checkbox-button'"
      v-model="values.checkbox" 
      type="checkbox-button"
      :data="data.checkbox"
      :props="props.checkbox"
      @change="handleChange"
      />
    <!-- 下拉选择器 -->
    <kl-form-item v-else-if="type == 'select'"
      v-model="values.select" 
      type="select"
      width="300"
      placeholder="请选择项目"
      :data="data.select"
      :props="props.select"
      :options="options.select"
      @change="handleChange"
      />
    <!-- 下拉选择器 -->
    <kl-form-item v-else-if="type == 'date'"
      v-model="values.date"
      type="date"
      />

    <!-- 单行输入框 -->
    <kl-form-item v-else
      v-model="values.input" 
      width="300"
      placeholder="请输入内容"
      :options="options.input"
      @change="handleChange"
      />
        <!-- <el-input v-model="values.input" /> -->
     
  </div>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { get } from 'lodash'
import { Callback } from 'nunjucks'
import type { FormItemType } from '@/types'

@Component({
  mounted() {
    
  },
})
export default class Demo extends Vue {

  @Prop({ default: 'input' })
  type!: FormItemType | 'selects' | 'select-group'

  @Provide()
  values = {
    input: '',
    password: '',
    inputNumber: 5,
    textarea: '',
    radio: '1',
    checkbox: ['1', '3'],
    select: '',
    date: '2023-05-18'
  }

  @Provide()
  options = {
    input: {
      clearable: true,
    },
    password: {
      clearable: true,
      showPassword: true,
      maxlength: 10
    },
    inputNumber: {
      min: 1,
      max: 10
    },
    textarea: {
      maxlength: 500,
      showWordLimit: true,
      rows: 5,
      resize: 'none'
    },
    // radio: '1',
    // checkbox: ['1','3'],
    select: {
      clearable: true,
      filterable: true
    }
  }

  @Provide()
  data = {
    radio: [
      { key: '1', name: '选项一' },
      { key: '2', name: '选项二' },
      { key: '3', name: '选项三' },
    ],
    checkbox: [
      { key: '1', name: '选项一' },
      { key: '2', name: '选项二' },
      { key: '3', name: '选项三' },
    ],
    select: [
      { key: '1', name: '选项一' },
      { key: '2', name: '选项二' },
      { key: '3', name: '选项三' },
    ],
  }

  @Provide()
  props = {
    radio: {
      label: 'name'
    },
    checkbox: {
      label: 'name'
    },
    select: {
      label: 'name'
    },
  }

  handleChange (value: any) {
    console.log(value)
  }
}
</script>