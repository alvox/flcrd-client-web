import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import '@/assets/tailwind.css'
import {store} from './store/store'
import {i18n} from './services/i18n'

import ApiService from './services/api'
import {TokenService} from "./services/token"

import {domain, clientId} from '../auth_config.json'
import {Auth0Plugin} from './auth'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        )
    }
})

ApiService.init(process.env.VUE_APP_BASE_API_URL);
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
    i18n,
    render: h => h(App)
}).$mount('#app');
