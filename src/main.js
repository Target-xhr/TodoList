import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import less from 'less'
Vue.use(less);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import 'font-awesome/css/font-awesome.min.css'  


Vue.config.productionTip = false

new Vue({
  router,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
