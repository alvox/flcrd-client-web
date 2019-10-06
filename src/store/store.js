import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router'
import {TokenService} from '../services/token'
import {UserService} from '../services/user'
import {SettingsService} from '../services/settings'
import ApiService from "../services/api";
import {i18n} from "../services/i18n";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        theme: SettingsService.getTheme(),
        lang: SettingsService.getLang(),
        loading: false,
        decks: [],
        publicDecks: [],
        userName: UserService.getUserName(),
        userId: UserService.getUserId(),
        accessToken: TokenService.getAccessToken(),
        errorCode: '',
        errorMessage: '',
        refreshTokenPromise: null,
        user: null
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
            let decks = state.decks.filter(deck => deck.id === id);
            if (decks.length === 0) {
                decks = state.publicDecks.filter(deck => deck.id === id);
            }
            return decks[0]
        },
        loggedIn: (state) => {
            return !!state.userName && !!state.userId
        },
        userId: (state) => {
            return state.userId
        },
        userName: (state) => {
            return state.userName
        },
        errorMessage: (state) => {
            return state.errorMessage
        },
        user: (state) => {
            return state.user
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
            let deck = state.decks.filter(deck => deck.id === payload.deck.id)[0];
            deck.name = payload.deck.name;
            deck.description = payload.deck.description;
            deck.public = payload.deck.public;
        },
        deleteDeck(state, payload) {
            state.decks = state.decks.filter(deck => deck.id !== payload.deck_id)
        },
        saveFlashcards(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0];
            Vue.set(deck, 'cards', payload.flashcards)
        },
        saveFlashcardsForPublicDeck(state, payload) {
            let deck = state.publicDecks.filter(deck => deck.id === payload.deck_id)[0];
            Vue.set(deck, 'cards', payload.flashcards)
        },
        saveCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0];
            deck.cards.push(payload.card);
            deck.cards_count++
        },
        updateCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0];
            let card = deck.cards.filter(c => c.id === payload.id)[0];
            card.front = payload.front;
            card.rear = payload.rear;
        },
        deleteCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0];
            deck.cards = deck.cards.filter(card => card.id !== payload.card_id);
            deck.cards_count--
        },
        clearError(state) {
            state.errorCode = '';
            state.errorMessage = '';
        },
        authSuccess(state, payload) {
            state.userName = payload.userName;
            state.userId = payload.userId;
            state.errorCode = '';
            state.errorMessage = '';
        },
        apiError(state, payload) {
            state.errorCode = payload.errorCode;
            state.errorMessage = payload.errorMessage
        },
        logoutSuccess(state) {
            state.accessToken = null;
            state.userName = null;
            state.userId = null;
        },
        refreshTokenPromise(state, promise) {
            state.refreshTokenPromise = promise
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        SWITCH_THEME: (context) => {
            context.commit('switchTheme', SettingsService.switchTheme())
        },
        SELECT_LANG: (context, payload) => {
            i18n.locale = payload.lang;
            SettingsService.setLang(payload.lang);
            context.commit('setLang', payload.lang)
        },
        GET_PUBLIC_DECKS: (context) => {
            ApiService.get("public/decks").then(result => {
                context.commit('savePublicDecks', result.data)
            })
        },
        GET_DECKS: (context) => {
            context.commit('loading', true);
            ApiService.get("decks").then(result => {
                context.commit('saveDecks', result.data)
            }).finally(() => {
                context.commit('loading', false)
            })
        },
        GET_CARDS_FOR_PUBLIC_DECK: (context, payload) => {
            context.commit('loading', true);
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
            context.commit('loading', true);
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
                context.commit('saveDeck', {deck: deck});
                context.commit('clearError');
                let visibility = deck.public ? 'public' : 'private';
                router.push({name: 'FlashcardsList', params: {deck_id: deck.id, visibility: visibility}})
            }).catch(e => {
                context.commit('apiError', {
                    errorCode: e.response.data.code,
                    errorMessage: e.response.data.message
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
                let deck = result.data;
                context.commit('updateDeck', {deck: deck});
                context.commit('clearError');
                router.back();
            }).catch(e => {
                context.commit('apiError', {
                    errorCode: e.response.data.code,
                    errorMessage: e.response.data.message
                })
            })
        },
        DELETE_DECK: (context, payload) => {
            ApiService.delete("decks/" + payload.deck_id).then(result => {
                context.commit('deleteDeck', {deck_id: payload.deck_id});
                router.push({name: 'Decks'})
            })
        },
        CREATE_CARD: (context, payload) => {
            ApiService.post("decks/" + payload.deck_id + "/flashcards", {
                front: payload.front,
                rear: payload.rear
            }).then(result => {
                context.commit('saveCard', {deck_id: payload.deck_id, card: result.data});
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
                context.commit('deleteCard', {deck_id: payload.deck_id, card_id: payload.card_id});
                router.back()
            })
        },
        REGISTER_USER: (context, payload) => {
            UserService.register(payload.name, payload.email, payload.password)
                .then(result => {
                    context.commit('authSuccess', result);
                    router.push({name: 'VerifyEmail', params: {code: 'email'}})
                    // router.push(router.history.current.query.redirect || '/');
                })
                .catch(e => {
                    let r = e.response;
                    if (r.status === 400 || r.status === 500) {
                        context.commit('apiError', {
                            errorCode: e.response.data.code,
                            errorMessage: e.response.data.message
                        })
                    }
                })
        },
        LOGIN_USER: (context, payload) => {
            UserService.login(payload.email, payload.password)
                .then(result => {
                    context.commit('authSuccess', result);
                    router.push({name: 'Decks'});
                    // router.push(router.history.current.query.redirect || '/');
                })
                .catch(e => {
                    let r = e.response;
                    if (r.status === 401 || r.status === 400 || r.status === 500) {
                        context.commit('apiError', {
                            errorCode: r.data.code,
                            errorMessage: r.data.message
                        })
                    }
                })
        },
        REFRESH_TOKEN: (context, payload) => {
            // If this is the first time the refreshToken has been called, make a request
            // otherwise return the same promise to the caller
            if (!context.state.refreshTokenPromise) {
                let p = UserService.refreshToken(payload.accessToken, payload.refreshToken);
                context.commit('refreshTokenPromise', p);
                // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
                // Clear the promise on error as well.
                p.then(result => {
                    context.commit('refreshTokenPromise', null);
                }, error => {
                    console.log(error);
                    context.commit('refreshTokenPromise', null)
                })
            }
            return context.state.refreshTokenPromise
        },
        LOGOUT_USER: (context) => {
            UserService.logout();
            context.commit('logoutSuccess');
            router.push('/')
        },
        CONFIRM_EMAIL: (context, payload) => {
            UserService.confirmEmail(payload.code)
                .then(result => {
                    router.push({name: 'Decks'})
                })
                .catch(e => {
                    console.log(e);
                    router.push({name: 'VerifyEmail', params: {code: 'error'}})
                })
        },
        RESEND_CONFIRMATION: (context) => {
            UserService.resendConfirmation()
                .then(result => {
                    router.push({name: 'VerifyEmail', params: {code: 'email'}})
                })
        },
        GET_USER: (context) => {
            context.commit('loading', true);
            ApiService.get("users")
                .then(result => {
                    context.commit('setUser', result.data)
                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    context.commit('loading', false)
                })
        },
        UPDATE_USER: (context, payload) => {
            context.commit('loading', true);
            ApiService.put("users", payload)
                .then(result => {
                    context.commit('setUser', result.data)
                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    context.commit('loading', false)
                })
        },
        DELETE_USER: (context) => {
            ApiService.delete("users")
                .then(() => {
                    UserService.logout();
                    context.commit('setUser', null);
                    context.commit('logoutSuccess')
                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    router.push({name: 'Index'})
                })
        },
        CLEAR_USER: (context) => {
            context.commit('setUser', null)
        },
        REFRESH_DATA: (context, payload) => {
            if (payload.is_private) {
                ApiService.get("decks").then(result => {
                    context.commit('saveDecks', result.data);
                    ApiService.get("decks/" + payload.deck_id + "/flashcards").then(result => {
                        context.commit('saveFlashcards', {
                            deck_id: payload.deck_id,
                            flashcards: result.data
                        })
                    })
                })
            } else {
                ApiService.get("public/decks").then(result => {
                    context.commit('savePublicDecks', result.data);
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
});