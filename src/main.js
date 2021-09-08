import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import less from 'less'
Vue.use(less)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
