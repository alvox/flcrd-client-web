import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import '@/assets/tailwind.css'
import {store} from './store/store'

import ApiService from './services/api'
import {TokenService} from "./services/token";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

ApiService.init('https://flashcards.rocks/v0/');
// ApiService.init('http://localhost/v0/');
if (TokenService.getAccessToken()) {
    ApiService.setHeader();
    ApiService.mount401Interceptor()
}

Vue.filter('capitalize', function (value) {
    if (!value) {
        return ''
    }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1) + '.'
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
