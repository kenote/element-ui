import Vue from 'vue'
import {
  Autocomplete,
  Loading,
  Message,
  MessageBox,
  Notification
} from 'element-ui'

Vue.use(Autocomplete)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Loading.service