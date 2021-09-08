import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import Vant from 'vant';
import 'vant/lib/index.css';



Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
