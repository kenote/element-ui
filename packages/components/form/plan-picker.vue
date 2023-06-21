<template>
  <div class="inline" v-if="data?.length > 0">
    <el-select :style="{ width: toStyleSize(width) }" v-model="selected" :placeholder="placeholder" @change="handleChange" filterable>
      <el-option v-for="(item, key) in data" :key="key" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-dropdown trigger="click" @click="handleSaveData" @command="handleCommand" split-button :style="{ marginLeft: 0 }">
      <span>保存{{ name }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="create" :disabled="!selected">另存</el-dropdown-item>
        <el-dropdown-item command="remove" :disabled="!selected">删除</el-dropdown-item>
        <el-dropdown-item command="clear">清除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <el-button v-else @click="handleSaveData" plain>保存{{ name }}</el-button>
</template>

<script lang="ts">
import { Component, Prop, Provide, Emit, Model, Watch, Mixins } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'
import type { PlanDataItem } from '../../../types'
import KlFormItem from './form-item.vue'
import type { ElMessageBoxOptions, MessageBoxInputData } from 'element-ui/types/message-box'

@Component<KlPlanPicker>({
  name: 'KlPlanPicker',
  components: {
    KlFormItem
  },
  created() {
    this.data = this.drafts.filter( v => v.associate === this.associate )
    this.selected = this.value
  },
})
export default class KlPlanPicker extends Mixins(KlBaseMixin) {

  @Prop()
  drafts!: PlanDataItem[]

  @Prop({ default: '草稿' })
  name!: string

  @Prop()
  width!: number | string

  @Prop({ default: undefined }) 
  placeholder!: string

  @Prop({ default: undefined })
  associate!: string

  @Provide()
  selected: string = ''

  @Provide()
  data: PlanDataItem[] = []

  @Watch('drafts')
  onDrafts (val: PlanDataItem[]) {
    this.data = val.filter( v => v.associate == this.associate )
  }

  @Watch('value')
  onValue (val: string, oldVal: string) {
    if (val === oldVal) return
    if (val === this.selected) return
    this.selected = val
  }

  @Watch('selected')
  onSelected (val: string, oldVal: string) {
    if (val === oldVal) return
    if (val === this.value) return
    this.update(val)
  }

  @Model('update')
  value!: string

  @Emit('update')
  update (value: string) {}

  @Emit('change')
  change (value: any) {}

  @Emit('update-plan')
  updatePlan <T> (type: string, options: Partial<PlanDataItem>, next: (node: T) => void) {}

  handleChange (value: string) {
    let item = this.drafts?.find( v => v.value == value )
    if (item) {
      this.change(item.content)
    }
  }

  handleCommand (value: string) {
    if (value == 'create') {
      this.createData()
    }
    else if (value == 'remove') {
      this.removeData()
    }
    else if (value == 'clear') {
      this.selected = ''
      this.$emit('clear')
    }
  }

  handleSaveData () {
    if (this.selected) {
      this.updatePlan<PlanDataItem>('update', { value: this.selected }, node => {
        this.selected = node?.value??''
        this.$message.success(`${this.name}-[${node.label}]已更新`)
      })
    }
    else {
      this.createData()
    }
  }

  async createData () {
    let options: ElMessageBoxOptions = {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValidator: (value: string) => !!value.trim(),
      inputErrorMessage: `请填写${this.name}名称`,
      inputPlaceholder: `设置${this.name}名称`,
      inputType: 'text'
    }
    try {
      let result = await this.$prompt('', `创建${this.name}`, options) as MessageBoxInputData
      this.updatePlan<PlanDataItem>('create', { label: result.value }, node => {
        this.selected = node?.value??''
        this.$message.success(`${this.name}-[${node.label}]已保存`)
      })
    } catch (error) {
      this.$message.warning('您已取消保存操作')
    }
  }

  removeData () {
    this.updatePlan<boolean>('remove', { value: this.selected }, node => {
      if (node) {
        this.selected = ''
      }
    })
  }

}
</script>