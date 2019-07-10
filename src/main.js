import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

Vue.prototype.$axios = axios;
import './assets/js/flexble.js'
Vue.config.productionTip = false
import "./module/module"
import "./module/api"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
