import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import '@/assets/tailwind.css'
import { store } from './store/store'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
  created: () => {
      store.dispatch('GET_DECKS')
  }
}).$mount('#app');
