import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 这个第三包引入即可，它会自动根据页面宽度设置网页基准字体大小
import 'amfe-flexible'

import {
  NavBar,
  Button,
  Field,
  Cell,
  CellGroup
} from 'vant'
Vue.use(NavBar).use(Button).use(Field).use(Cell).use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
