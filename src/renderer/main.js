import Vue from 'vue'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import db from './utils/datastore.js'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { ipc } from '@/utils/ipcRenderer'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// 全局注入IPC通信
Vue.prototype.$ipc = ipc
// ElementUI
Vue.use(ElementUI)
Vue.prototype.$db = db
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
