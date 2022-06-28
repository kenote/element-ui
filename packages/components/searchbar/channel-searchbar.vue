<template>
  <el-autocomplete ref="searchbar" :size="size" prefix-icon="el-icon-search" :popper-class="popperClass"
    v-model="keywords"
    :placeholder="placeholder"
    :fetch-suggestions="querySearch"
    @focus="handleFocus"
    @blur="handleBlur"
    @select="handleSelect"
    >
    <i v-show="keywords" class="el-icon-error el-input__icon" slot="suffix" @click="handleClear"></i>
    <div slot-scope="{ item }">
      <div v-if="item.maps" class="name">
        <fragment v-for="(row, key) in item.maps" :key="key">
          <template>
            <span v-if="key > 0"> &gt; </span>
            <span v-html="keyWordsString(row)"></span>
          </template>
        </fragment>
      </div>
      <div v-else class="name">{{ item.name }}</div>
      <span v-if="item.description" class="description">{{ item.description }}</span>
    </div>
  </el-autocomplete>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { ChannelDataNode, CommonDataNode, FilterQuery, initMaps } from '@kenote/common'
import ruleJudgment from 'rule-judgment'
import { filterChannelDataNode, parseProps } from '../../'
import { assign, trim } from 'lodash'
import type { Autocomplete } from 'element-ui'

@Component<KlChannelSearchbar>({
  name: 'KlChannelSearchbar',
  mounted () {
    this.keywords = this.value
    this.restaurants = initMaps(this.data ?? [])
  }
})
export default class KlChannelSearchbar extends Vue {

  @Provide()
  item!: ChannelDataNode<{}>
  
  @Prop({ default: '搜索内容' })
  placeholder!: string

  @Prop({ default: undefined })
  data!: CommonDataNode[]

  @Prop({ default: undefined })
  props!: Record<string, any>

  @Prop({ default: undefined })
  filter!: FilterQuery<any>

  @Prop({ default: 'searchbar-popper' })
  popperClass!: string

  @Prop({ default: 'default' })
  size!: string

  @Provide()
  keywords: string = ''

  @Provide()
  restaurants: CommonDataNode[] = []

  @Model('update')
  value!: string

  @Watch('keywords')
  onKeywordsChange (val: string, oldVal: string) {
    if (val === oldVal) return
    this.update(val)
  }

  @Watch('value')
  onValueChange (val: string, oldVal: string) {
    if (val === oldVal) return
    this.keywords = val
  }

  @Watch('data')
  onDataChange (val: CommonDataNode[], oldVal: CommonDataNode[]) {
    if (val === oldVal) return
    this.restaurants = initMaps(val)
  }

  @Emit('update')
  update (value: string) {}

  @Emit('command')
  handleCommand (value: ChannelDataNode<{}>) {}

  @Emit('focus')
  handleFocus (evt: Event) {}

  @Emit('blur')
  handleBlur (evt: Event) {}

  querySearch (queryString: string, done: (info: any[]) => void) {
    let list: CommonDataNode[] = []
    filterChannelDataNode(this.restaurants, trim(queryString), list)
    if (this.filter) {
      list = list.filter(ruleJudgment(this.filter))
    }
    let props = assign({
      value: 'name', 
      key: 'key', 
      description: 'description', 
      maps: 'maps'
    }, this.props)
    done( list.map(parseProps(props)) )
  }

  handleClear () {
    this.keywords = ''
    let searchbar = this.$refs?.['searchbar'] as Autocomplete
    setTimeout(() => {
      searchbar.focus()
    }, 300);
  }

  keyWordsString (row: CommonDataNode) {
    let keywords = trim(this.keywords)
    return row.name?.replace(new RegExp(`(${keywords})`, 'gi'), `<span class='keywords'>$1</span>`)
  }

  handleSelect (node: ChannelDataNode<{}>) {
    this.handleCommand(node)
    this.handleClear()
  }
  
}
</script>

<style lang="less">
.searchbar-popper {
  border-radius: 0;
  padding: 10px 0 0 0;
  margin-top: 11px!important;
  min-width: 350px;

  .el-autocomplete-suggestion__wrap {
    padding-top: 0;
    max-height: 580px;
  } 

  .popper__arrow {
    display: block;
  }

  li {
    line-height: normal !important;
    padding: 0 !important;
    pointer-events: none;

    &>div {
      padding: 5px 20px 10px;
      pointer-events: visible;

      &.is-disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: .4;

        &::after {
          content: '';
        }
      }
    }

    .name {
      line-height: 2.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .description {
      display: block;
      font-size: 12px;
      line-height: 1.8;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .keywords {
      color: #ef432c;
      font-weight: 600;
    }
  }
}

</style>