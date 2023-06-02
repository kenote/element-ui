import Vue from 'vue'
import {
  Autocomplete,
  Button,
  Cascader,
  CascaderPanel,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Input,
  InputNumber,
  Loading,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Notification,
  Option,
  OptionGroup,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Slider,
  Submenu,
  Switch,
  Tag,
  TimePicker,
  Transfer
} from 'element-ui'

Vue.use(Autocomplete)
Vue.use(Button)
Vue.use(Cascader)
Vue.use(CascaderPanel)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Select)
Vue.use(Slider)
Vue.use(Submenu)
Vue.use(Switch)
Vue.use(Tag)
Vue.use(TimePicker)
Vue.use(Transfer)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Loading.service