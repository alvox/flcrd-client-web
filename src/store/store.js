import Vue from "vue"
import Vuex from "vuex"
import {SettingsService} from "@/services/settings"
import {i18n} from "@/services/i18n"
import {UserState} from "./user"
import {DeckState} from "./deck"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: UserState,
        deck: DeckState
    },
    state: {
        theme: SettingsService.getTheme(),
        lang: SettingsService.getLang(),
        loading: false,
        errorCode: '',
        errorMessage: '',
        loginModalVisible: false,
        registrationModalVisible: false
    },
    getters: {
        theme: state => {
            return state.theme
        },
        lang: state => {
            return state.lang
        },
        isLoading: state => {
            return state.loading
        },
        errorMessage: state => {
            return state.errorMessage
        },
        isLoginModalVisible: state => {
            return state.loginModalVisible
        },
        isRegistrationModalVisible: state => {
            return state.registrationModalVisible
        }
    },
    mutations: {
        switchTheme(state, t) {
            state.theme = t
        },
        setLang(state, lang) {
            state.lang = lang
        },
        loading(state, loading) {
            state.loading = loading
        },
        clearError(state) {
            state.errorCode = ''
            state.errorMessage = ''
        },
        apiError(state, payload) {
            state.errorCode = payload.errorCode
            state.errorMessage = payload.errorMessage
        },
        showLoginModal(state) {
            state.loginModalVisible = true
        },
        hideLoginModal(state) {
            state.loginModalVisible = false
        },
        showRegistrationModal(state) {
            state.registrationModalVisible = true
        },
        hideRegistrationModal(state) {
            state.registrationModalVisible = false
        }
    },
    actions: {
        SWITCH_THEME: (context) => {
            context.commit("switchTheme", SettingsService.switchTheme())
        },
        SELECT_LANG: (context, payload) => {
            i18n.locale = payload.lang
            SettingsService.setLang(payload.lang)
            context.commit("setLang", payload.lang)
        }
    }
})