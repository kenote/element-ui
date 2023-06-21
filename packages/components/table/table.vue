<template>
  <fragment>
    <el-table ref="filterTable" 
      v-loading="loading" 
      :data="pdata" 
      :border="border" 
      :highlight-current-row="highlightCurrentRow"
      @sort-change="handleSortChange"
      @current-change="currentChange"
      @selection-change="selectionChange">

      <!-- 多选列 -->
      <el-table-column v-if="getSelection(selection)?.open" 
        type="selection" 
        fixed="left" 
        width="50"
        :selectable="row => !isDisabled(getSelection(selection)?.disabled, { row })" 
        />
      <!-- 常规列 -->
      <el-table-column v-for="(column, key) in columns" :key="key"
        :label="column.name"
        :prop="column.key"
        :width="toStyleSize(column?.width)"
        :min-width="toStyleSize(column?.minWidth||100)"
        :fixed="column?.fixed"
        :align="column?.align"
        :sortable="column?.sortable"
        :show-overflow-tooltip="isTooltip(column)" >
        <template slot-scope="scope">
          <kl-column-cell :scope="scope" :column="column" :customize="customize" @command="command" :env="env" />
        </template>
      </el-table-column>
      <!-- 扩展列 -->
      <el-table-column v-if="expand" type="expand" fixed="left">
        <template slot-scope="props">
          {{ parseTemplate(expand, { ...env, row: props?.row }) }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模型 -->
    <el-pagination v-if="pagination"
      :current-page="current"
      :page-size="pagination"
      :total="total"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      background />
  </fragment>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Provide, Emit, Watch } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'
import { Table as ElTable } from 'element-ui'
import type { DefaultSortOptions, } from 'element-ui/types/table'
import type { TableColumn, Pagination, Sorter, Selection } from '../../../types'
import { chunk, cloneDeep, orderBy } from 'lodash'
import ruleJudgment from 'rule-judgment'
import KlColumnCell from './column-cell.vue'
import { env } from 'process'

@Component<KlTable>({
  name: 'KlTable',
  components: {
    KlColumnCell
  },
  mounted () {
    if (this.data) {
      this.initialData(this.data)
    }
  },
})
export default class KlTable extends Mixins(KlBaseMixin) {
  
  [x: string]: any

  @Prop({ default: undefined })
  data!: Record<string, any>[]

  @Prop({ default: false })
  loading!: boolean

  @Prop()
  columns!: TableColumn[]

  @Prop({ default: false })
  border!: boolean

  @Prop({ default: undefined })
  selection!: Selection | boolean

  @Prop({ default: undefined })
  expand!: string

  @Prop({ default: false })
  highlightCurrentRow!: boolean

  @Prop({ default: 1 })
  pageno!: number

  @Prop({ default: false })
  pagination!: number | false

  @Prop({ default: -1 })
  counts!: number

  @Prop({ default: undefined })
  customize!: Record<string, Function>

  @Prop({ default: undefined })
  sorter!: Sorter

  @Provide()
  cdata: Record<string, any>[] = []

  @Provide()
  pdata: Record<string, any>[] = []

  @Provide()
  current: number = 1

  @Provide()
  total: number = 0

  @Provide()
  sortOptions?: DefaultSortOptions

  @Emit('to-page')
  toPage (page: number) {}

  @Emit('current-change')
  currentChange (values: Record<string, any>) {}

  @Emit('selection-change')
  selectionChange (values: Record<string, any>[]) {}

  @Watch('data')
  onData (val: any[], oldVal: any[]) {
    if (val === oldVal) return
    this.initialData(val)
  }

  initialData (data: any[]) {
    this.cdata = data ?? []
    if (this.counts > -1) {
      this.total == this.counts
      this.pdata = data ?? []
      this.current = this.pageno
    }
    else {
      let theTable = <ElTable> this.$refs?.['filterTable']
      theTable.clearFilter()
      this.total = data.length
      let size = this.pagination || 10
      let pageno = (this.total + size - 1) / size
      pageno = parseInt(pageno.toString()) || 1
      this.handleCurrentChange(this.pageno > pageno ? pageno : this.pageno, data)
    }
  }

  handleCurrentChange (page: number, data?: any[]) {
    let size = this.pagination || 10
    if (this.counts > -1) {
      if (this.current == page) return
      this.current = page
      let pagination: Pagination = { size, page }
      if (this.sortOptions) {
        let { prop, order } = this.sortOptions
        pagination.sort = [ prop, order ]
      }
      this.toPage(page)
      return
    }
    this.current = page
    if (this.pageno !== page) {
      this.toPage(page)
    }
    let tmpData = cloneDeep(data ?? this.cdata)
    if (this.sortOptions?.order) {
      let { prop, order } = this.sortOptions
      tmpData = orderBy(tmpData, [ prop ], [ <'asc' | 'desc'> order.replace(/(ending)$/, '') ])
    }
    this.total = tmpData.length
    if (this.pagination) {
      this.pdata = chunk(tmpData, size)?.[page-1]
    }
    else {
      this.pdata = tmpData ?? []
    }
  }

  handleSortChange (column: DefaultSortOptions) {
    let { prop, order } = column
    this.sortOptions = order && { prop, order }
    if (this.sorter && this.counts > (this.pagination || 10)) {
      let { request, options } = this.sorter
      let pagination: Pagination = { size: this.pagination || 10, page: this.current }
      if (order) {
        pagination.sort = [ prop, order ]
      }
    }
    this.handleCurrentChange(this.current)
  }

  getSelection (value?: Selection | boolean) {
    if (!value) return undefined
    if (value == true) {
      return <Selection> { open: value }
    }
    return value
  }

  isTooltip (column: TableColumn) {
    let filter = ruleJudgment<TableColumn>({
      $or: [
        { clipboard: { $exists: true } },
        { dots: { $exists: true } },
      ]
    })
    if (filter(column)) {
      return false
    }
    return true
  }

}
</script>

<style lang="less">
.el-pagination {
  margin-top: 15px;
  text-align: right;
  align-self: flex-end;
}
</style>