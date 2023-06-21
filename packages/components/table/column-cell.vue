<template>
  <!-- 可扩展操作 -->
  <fragment v-if="column.emits">
    <template v-for="emit in column.emits">
      <template v-if="isFilter(emit.conditions, { row: scope?.row })">
        <!-- 下拉菜单 -->
        <el-dropdown v-if="emit.type == 'dropdown'" size="small"
          :key="emit.key"
          trigger="click"
          v-bind:class="isDisabled(emit.disabled, { row: scope?.row }) && 'el-dropdown-disabled'"
          @click="!(isDisabled(emit.disabled, { row: scope?.row })) && command(emit?.command??'', scope?.row)"
          @command="value => command(value, scope?.row, $parent?.$children?.[0])"
          split-button>
          <span>{{ emit.name }}</span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="item in emit.children??[]">
              <el-dropdown-item v-if="isFilter(item.conditions, { row: scope.row })" :key="item.key" 
                :command="item.command" 
                :disabled="isDisabled(item.disabled, { row: scope?.row })">
                {{ item.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 普通按钮 -->
        <el-button v-else-if="emit.type == 'button'" size="small"
          :key="emit.key"
          :type="emit.style"
          :disabled="isDisabled(emit.disabled, { row: scope?.row })"
          @click="command(emit?.command??'', scope?.row)">
          {{ emit.name }}
        </el-button>
        <!-- 下拉选择 -->
        <kl-form-item v-else-if="emit.type == 'select'" size="small" 
          :key="emit.key"
          :type="emit.type"
          :data="blockData(emit.formitem?.data || get(env, emit.dataBlock?.key??''), emit.dataBlock?.query, scope?.row)"
          :format="emit.formitem?.format"
          :props="emit.formitem?.props"
          :disabled="isDisabled(emit.disabled, { row: scope?.row })"
          :value="get(scope?.row, column?.key)"
          @change="value => command(emit.command??'', scope?.row, { [column.key]: value })"
          />
      </template>
    </template>
  </fragment>
  <!-- 拷贝字符串 -->
  <el-tooltip v-else-if="column?.clipboard" :content="column?.clipboard == true ? '点击复制' : column?.clipboard" placement="top">
    <el-link v-clipboard="handleClipboard(getValue(scope?.row, column.key))" :style="getAlpha(column.alpha, { row: scope?.row })">
      {{ getValue(scope?.row, column.key) }}
    </el-link>
  </el-tooltip>
  <!-- 点击事件 -->
  <el-link v-else-if="column?.click" :style="getAlpha(column.alpha, { row: scope?.row })" @click="command(column?.click, scope?.row)">
    {{ getValue(scope?.row, column.key) }}
  </el-link>
  <!-- 状态标签 -->
  <fragment v-else-if="column?.status">
    <template v-for="item in column?.status">
      <el-tag :key="item.key" v-if="isFilter(item.conditions, { row: scope?.row })" :type="item.style">{{ item.name }}</el-tag>
    </template>
  </fragment>
  <!-- 圆点标签 -->
  <fragment v-else-if="column?.dots">
    <template v-for="item in column?.dots">
      <template v-if="isFilter(item.conditions, { row: scope?.row })" >
        <i :key="item.key" v-if="item.name" class="dot" v-bind:class="item.name" ></i>
        <span :key="item.key" v-else class="dot" :style="item.style">●</span>
      </template>
    </template>
  </fragment>
  <!-- 使用模版 -->
  <span v-else-if="column?.template" :style="getAlpha(column.alpha, { row: scope?.row })">{{ parseTemplate(column?.template, scope?.row) }}</span>
  <!-- 简单字符串 -->
  <span v-else :style="getAlpha(column.alpha, { row: scope?.row })">{{ getValue(scope?.row, column.key) }}</span>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'
import type { TableColumn } from '../../../types'
import { get } from 'lodash'
import type { FilterQuery } from 'rule-judgment'
import { formatString } from '../../'
import type { RenderHeaderData } from 'element-ui/types/table-column'

interface Scope extends RenderHeaderData {
  row         : Object
  isExpanded  : boolean
  isSelected  : boolean
}

@Component<KlTableColumnCell>({
  name: 'KlTableColumnCell',
})
export default class KlTableColumnCell extends Mixins(KlBaseMixin) {

  @Prop()
  scope!: Scope

  @Prop()
  column!: TableColumn

  @Prop({ default: undefined })
  customize!: Record<string, Function>

  get = get

  getValue (row: Record<string, any>, key: string) {
    let value = get(row, key)
    let { format, defaultValue } = this.column
    return formatString(this.customize)(value, format, defaultValue)
  }

  getAlpha (conditions: FilterQuery<any> | string | undefined, scope: Record<string, any>) {
    let isFilter = this.isFilter(conditions, scope)
    return isFilter ? '' : 'opacoty:.7'
  }

  handleClipboard (value: string) {
    return value
  }

  blockData (data: Record<string, any>[], query?: FilterQuery<any> | string, row?: Record<string, any>) {
    let filter = this.getFilter(query, { ...this.env, row })
    let tmpData: Record<string, any>[] = []
    for (let item of data) {
      if (filter(item)) {
        item.disabled = true
      }
      tmpData.push(item)
    }
    return tmpData
  }

}
</script>

<style lang="less">
.cell .dot {
  margin: 0 4px;
}
.cell span.dot {
  font-size: 12px;
}
.el-dropdown-disabled .el-button-group {
  .el-button:first-child {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5;
    opacity: .7;
  }
}
.cell>div {
  margin: 0 10px;

  &:first-child {
    margin-left: 0;
  }
}
.cell .el-link {
  display: inline;
}
</style>