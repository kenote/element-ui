<template>
  <div class="kl-table-body">
    <kl-table
      :columns="columns"
      :data="data"
      />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import type { TableColumn } from '@/types'
import './style.less'

@Component
export default class Demo extends Vue {

  @Provide()
  columns: TableColumn[] = [
    {
      key: 'date',
      name: '日期',
      width: 180,
      sortable: true
    },
    {
      key: 'name',
      name: '姓名',
      width: 180
    },
    {
      key: 'address',
      name: '地址'
    },
  ]

  @Provide()
  data: any[] = [
    { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
    { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
    { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
    { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' },
  ]

}
</script>