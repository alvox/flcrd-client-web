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
        registrationModalVisible: false,
        deckModalVisible: false,
        deckEditModalVisible: false,
        cardModalVisible: false,
        profileModalVisible: false,
        currentDeckId: null,
        currentCard: null,
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
        },
        isDeckModalVisible: state => {
            return state.deckModalVisible
        },
        isDeckEditModalVisible: state => {
            return state.deckEditModalVisible
        },
        isCardModalVisible: state => {
            return state.cardModalVisible
        },
        isProfileModalVisible: state => {
            return state.profileModalVisible
        },
        currentDeckId: state => {
            return state.currentDeckId
        },
        currentCard: state => {
            return state.currentCard
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
        },
        showDeckModal(state) {
            state.deckModalVisible = true
        },
        hideDeckModal(state) {
            state.deckModalVisible = false
        },
        showDeckEditModal(state) {
            state.deckEditModalVisible = true
        },
        hideDeckEditModal(state) {
            state.deckEditModalVisible = false
        },
        showCardModal(state, card) {
            state.currentCard = card
            state.cardModalVisible = true
        },
        hideCardModal(state) {
            state.cardModalVisible = false
        },
        showProfileModal(state) {
            state.profileModalVisible = true
        },
        hideProfileModal(state) {
            state.profileModalVisible = false
        },
        setCurrentDeckId(state, payload) {
            state.currentDeckId = payload.deckId
            SettingsService.saveDeckInfo(payload.deckId, payload.isPublic)
        },
        clearCurrentDeckId(state) {
            state.currentDeckId = null
            SettingsService.clearDeckInfo()
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