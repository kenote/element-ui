import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { ChannelDataNode, getChannelKey, dataNodeProxy } from '@kenote/common'
import ruleJudgment from 'rule-judgment'
import { channels } from '~/../config'
import { runCommand } from '@/packages/utilities'
import type { Route } from 'vue-router'
import type { PlusKeywordsNode } from '@/types'
import { get } from 'lodash'

@Component<LayoutMixin>({
  name: 'layout-mixin',
  mounted () {
    let htmlElement = document.getElementsByTagName('html')[0]
    this.theme = htmlElement.className
    this.updateChannel(this.$route.path)
    this.screenWidth = document.body.clientWidth
    window.addEventListener('resize', this.handleResize, true)
    // 
    this.redirectIndex(this.$route)
    
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize, false)
  },
})
export default class LayoutMixin extends Vue {

  @Provide()
  theme: string = ''

  @Provide()
  channels: ChannelDataNode<PlusKeywordsNode>[] = channels

  @Provide()
  sidebar: ChannelDataNode<PlusKeywordsNode>[] = []

  @Provide() 
  drawerVisible: boolean = false

  @Provide()
  drawer: string = ''

  @Provide()
  screenWidth: number = 0

  @Watch('theme')
  onTheme (val: string, oldVal: string) {
    if (val === oldVal) return
    let htmlElement = document.getElementsByTagName('html')?.[0]
    htmlElement.className = val
  }

  @Watch('$route')
  onRouteChange (val: Route, oldVal: Route) {
    if (val === oldVal) return
    this.updateChannel(val.path)
    this.handleCloseDrawer()
    let el = get(this.$refs, ['layout', '$refs', 'main', '$el']) as HTMLDivElement
    // el.scrollTo({ top: 0 })
    this.redirectIndex(val)
  }

  updateChannel (routePath: string) {
    let key = getChannelKey(this.channels, routePath, 'route')
    if (!key) {
      this.sidebar = []
      return
    }
    let { children } = this.channels.find( ruleJudgment({ key }) )!
    this.sidebar = children ?? []
  }

  handleChangeTheme () {
    if (this.theme === 'dark') {
      this.theme = ''
    }
    else {
      this.theme = 'dark'
    }
  }

  handleCommand (value: string, row?: Record<string, any>) {
    return runCommand(this, {
      theme: () => {
        this.handleChangeTheme()
      },
      nav: () => {
        this.drawer = 'nav'
      },
      aside: () => {
        if (this.drawer === 'aside') {
          this.handleCloseDrawer()
          return
        }
        this.drawer = 'aside'
      },
      closeDrawer: () => {
        this.handleCloseDrawer()
      }
    })(value, row)
  }

  handleCloseDrawer () {
    this.drawer = ''
  }

  handleResize () {
    this.screenWidth = document.body.clientWidth
    this.handleCloseDrawer()
  }

  handleChannelNode (node: ChannelDataNode<PlusKeywordsNode>) {
    let { route } = node
    route && this.$router.push(route)
  }

  redirectIndex (route: Route) {
    let node = dataNodeProxy(this.channels).find( { route: route.path } )
    if (node?.index) {
      this.$router.push({ path: node.index })
    }
  }

}