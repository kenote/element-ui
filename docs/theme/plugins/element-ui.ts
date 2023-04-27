import Vue from 'vue'
import {
  Autocomplete,
  Button,
  Form,
  FormItem,
  Input,
  Loading,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Notification,
  Option,
  Select,
  Submenu,
  Switch,
  Tag,
} from 'element-ui'

Vue.use(Autocomplete)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Option)
Vue.use(Select)
Vue.use(Submenu)
Vue.use(Switch)
Vue.use(Tag)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Loading.service