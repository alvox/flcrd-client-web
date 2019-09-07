import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import axios from 'axios'
import '@/assets/tailwind.css'
import {store} from './store/store'

import ApiService from './services/api'
import {TokenService} from "./services/token";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuelidate);

// ApiService.init('https://flashcards.rocks/v0/');
ApiService.init('http://localhost/v0/');
if (TokenService.getAccessToken()) {
    ApiService.setHeader();
    ApiService.mount401Interceptor()
}

new Vue({
    router,
    store,
    render: h => h(App),
    created: () => {
        store.dispatch('GET_PUBLIC_DECKS')
    }
}).$mount('#app');
