import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 这个第三包引入即可，它会自动根据页面宽度设置网页基准字体大小
import 'amfe-flexible'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 语言包
import relativeTime from './filters/relative-time'
import {
  NavBar,
  Button,
  Field,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  PullRefresh,
  List,
  Toast,
  Popup,
  Icon,
  Grid,
  GridItem,
  Image,
  Lazyload,
  Dialog
} from 'vant'
Vue.use(NavBar)
  .use(Button)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Tab)
  .use(Tabs)
  .use(Tabbar)
  .use(TabbarItem)
  .use(PullRefresh) // 下拉刷新
  .use(List)
  .use(Toast)
  .use(Popup) // 弹出层
  .use(Icon)
  .use(Grid) // 宫格
  .use(GridItem)
  .use(Image)
  .use(Lazyload) // 图片懒加载
  .use(Dialog)
Vue.use(VeeValidate, {
  events: '' // 禁用默认事件验证
})
Validator.localize('zh_CN', zhCN)
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, time)
  })
}
// 注册一个全局过滤器：处理相对时间
Vue.filter('relativeTime', relativeTime)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
