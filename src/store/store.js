import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import {SettingsService} from '../services/settings'
import ApiService from "../services/api"
import {i18n} from "../services/i18n"
import {UserState} from "./user"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: UserState
    },
    state: {
        theme: SettingsService.getTheme(),
        lang: SettingsService.getLang(),
        loading: false,
        decks: [],
        publicDecks: [],
        errorCode: '',
        errorMessage: '',
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
        decks: state => {
            return state.decks
        },
        publicDecks: state => {
            return state.publicDecks
        },
        deck: (state) => (id) => {
            let decks = state.decks.filter(deck => deck.id === id)
            if (decks.length === 0) {
                decks = state.publicDecks.filter(deck => deck.id === id)
            }
            return decks[0]
        },
        errorMessage: (state) => {
            return state.errorMessage
        },
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
        saveDecks(state, decks) {
            state.decks = decks
        },
        savePublicDecks(state, decks) {
            state.publicDecks = decks
        },
        saveDeck(state, payload) {
            state.decks.push(payload.deck)
        },
        updateDeck(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck.id)[0]
            deck.name = payload.deck.name
            deck.description = payload.deck.description
            deck.public = payload.deck.public
        },
        deleteDeck(state, payload) {
            state.decks = state.decks.filter(deck => deck.id !== payload.deck_id)
        },
        saveFlashcards(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0]
            Vue.set(deck, 'cards', payload.flashcards)
        },
        saveFlashcardsForPublicDeck(state, payload) {
            let deck = state.publicDecks.filter(deck => deck.id === payload.deck_id)[0]
            Vue.set(deck, 'cards', payload.flashcards)
        },
        saveCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0]
            deck.cards.push(payload.card)
            deck.cards_count++
        },
        updateCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0]
            let card = deck.cards.filter(c => c.id === payload.id)[0]
            card.front = payload.front
            card.rear = payload.rear
        },
        deleteCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0]
            deck.cards = deck.cards.filter(card => card.id !== payload.card_id)
            deck.cards_count--
        },
        clearError(state) {
            state.errorCode = ''
            state.errorMessage = ''
        },
        apiError(state, payload) {
            state.errorCode = payload.errorCode
            state.errorMessage = payload.errorMessage
        }
    },
    actions: {
        SWITCH_THEME: (context) => {
            context.commit('switchTheme', SettingsService.switchTheme())
        },
        SELECT_LANG: (context, payload) => {
            i18n.locale = payload.lang
            SettingsService.setLang(payload.lang)
            context.commit('setLang', payload.lang)
        },
        GET_PUBLIC_DECKS: (context) => {
            ApiService.get("public/decks").then(result => {
                context.commit('savePublicDecks', result.data)
            })
        },
        GET_DECKS: (context) => {
            context.commit('loading', true)
            ApiService.get("decks").then(result => {
                context.commit('saveDecks', result.data)
            }).finally(() => {
                context.commit('loading', false)
            })
        },
        GET_CARDS_FOR_PUBLIC_DECK: (context, payload) => {
            context.commit('loading', true)
            ApiService.get("public/decks/" + payload.deck_id + "/flashcards").then(result => {
                context.commit('saveFlashcardsForPublicDeck', {
                    deck_id: payload.deck_id,
                    flashcards: result.data
                })
            }).finally(() => {
                context.commit('loading', false)
            })
        },
        GET_CARDS_FOR_DECK: (context, payload) => {
            context.commit('loading', true)
            ApiService.get("decks/" + payload.deck_id + "/flashcards").then(result => {
                context.commit('saveFlashcards', {
                    deck_id: payload.deck_id,
                    flashcards: result.data
                })
            }).finally(() => {
                context.commit('loading', false)
            })
        },
        CREATE_DECK: (context, payload) => {
            ApiService.post("decks", {
                name: payload.name,
                description: payload.description,
                public: payload.is_public,
            }).then(result => {
                let deck = result.data;
                context.commit('saveDeck', {deck: deck})
                context.commit('clearError')
                let visibility = deck.public ? 'public' : 'private'
                router.push({name: 'FlashcardsList', params: {deck_id: deck.id, visibility: visibility}})
            }).catch(err => {
                context.commit('apiError', {
                    errorCode: err.response.data.code,
                    errorMessage: err.response.data.message
                })
            })
        },
        UPDATE_DECK: (context, payload) => {
            ApiService.put("decks/" + payload.deck_id, {
                id: payload.deck_id,
                name: payload.deck.name,
                description: payload.deck.description,
                public: payload.deck.is_public,
            }).then(result => {
                let deck = result.data
                context.commit('updateDeck', {deck: deck})
                context.commit('clearError')
                router.back()
            }).catch(err => {
                context.commit('apiError', {
                    errorCode: err.response.data.code,
                    errorMessage: err.response.data.message
                })
            })
        },
        DELETE_DECK: (context, payload) => {
            ApiService.delete("decks/" + payload.deck_id).then(result => {
                context.commit('deleteDeck', {deck_id: payload.deck_id})
                router.push({name: 'Decks'})
            })
        },
        CREATE_CARD: (context, payload) => {
            ApiService.post("decks/" + payload.deck_id + "/flashcards", {
                front: payload.front,
                rear: payload.rear
            }).then(result => {
                context.commit('saveCard', {deck_id: payload.deck_id, card: result.data})
            })
        },
        UPDATE_CARD: (context, payload) => {
            ApiService
                .put("decks/" + payload.deck_id + "/flashcards/" + payload.id, payload)
                .then(result => {
                    context.commit('updateCard', result.data);
                    router.back()
                })
        },
        DELETE_CARD: (context, payload) => {
            ApiService.delete("decks/" + payload.deck_id + "/flashcards/" + payload.card_id).then(result => {
                context.commit('deleteCard', {deck_id: payload.deck_id, card_id: payload.card_id})
                router.back()
            })
        },
        REFRESH_DATA: (context, payload) => {
            if (payload.is_private) {
                ApiService.get("decks").then(result => {
                    context.commit('saveDecks', result.data)
                    ApiService.get("decks/" + payload.deck_id + "/flashcards").then(result => {
                        context.commit('saveFlashcards', {
                            deck_id: payload.deck_id,
                            flashcards: result.data
                        })
                    })
                })
            } else {
                ApiService.get("public/decks").then(result => {
                    context.commit('savePublicDecks', result.data)
                    ApiService.get("public/decks/" + payload.deck_id + "/flashcards").then(result => {
                        context.commit('saveFlashcardsForPublicDeck', {
                            deck_id: payload.deck_id,
                            flashcards: result.data
                        })
                    })
                })
            }
        }
    }
})