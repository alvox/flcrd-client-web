import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router'
import {TokenService} from '../services/token'
import {UserService, AuthenticationError} from '../services/user'
import ApiService from "../services/api";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        decks: [],
        publicDecks: [],
        userName: null,
        userEmail: null,
        userToken: TokenService.getToken(),
        authenticating: false,
        authenticationErrorCode: 0,
        authenticationError: ''
    },
    getters: {
        decks: state => {
            return state.decks
        },
        publicDecks: state => {
            return state.publicDecks
        },
        deck: (state) => (id, isPrivate) => {
            if (isPrivate) {
                return state.decks.filter(deck => deck.id === id)[0]
            }
            return state.publicDecks.filter(deck => deck.id === id)[0]
        },
        loggedIn: (state) => {
            return !!state.userToken && !!state.userName && !!state.userEmail
        },
        userName: (state) => {
            return state.userName
        }
    },
    mutations: {
        saveDecks(state, decks) {
            state.decks = decks
        },
        savePublicDecks(state, decks) {
            state.publicDecks = decks
        },
        saveDeck(state, payload) {
            state.decks.push(payload.deck)
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
        deleteCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0];
            deck.cards = deck.cards.filter(card => card.id !== payload.card_id);
            deck.cards_count--
        },
        authRequest(state) {
            state.authenticating = true;
            state.authenticationError = '';
            state.authenticationErrorCode = 0
        },
        authSuccess(state, payload) {
            state.userName = payload.userName;
            state.userEmail = payload.userEmail;
            state.userToken = payload.userToken;
            state.authenticating = false;
        },
        authError(state, payload) {
            state.authenticating = false;
            state.authenticationErrorCode = payload.errorCode;
            state.authenticationError = payload.errorMessage
        },
        logoutSuccess(state) {
            state.accessToken = null;
            state.userName = null;
            state.userEmail = null;
        }
    },
    actions: {
        GET_PUBLIC_DECKS: (context) => {
            ApiService.get("public/decks").then(result => {
                context.commit('savePublicDecks', result.data)
            })
        },
        GET_DECKS: (context) => {
            ApiService.get("decks").then(result => {
                context.commit('saveDecks', result.data)
            })
        },
        GET_CARDS_FOR_PUBLIC_DECK: (context, payload) => {
            ApiService.get("public/decks/" + payload.deck_id + "/flashcards").then(result => {
                context.commit('saveFlashcardsForPublicDeck', {
                    deck_id: payload.deck_id,
                    flashcards: result.data
                })
            })
        },
        GET_CARDS_FOR_DECK: (context, payload) => {
            ApiService.get("decks/" + payload.deck_id + "/flashcards").then(result => {
                context.commit('saveFlashcards', {
                    deck_id: payload.deck_id,
                    flashcards: result.data
                })
            })
        },
        CREATE_DECK: (context, payload) => {
            ApiService.post("decks", {
                name: payload.name,
                description: payload.description,
                private: payload.isPrivate,
            }).then(result => {
                let deck = result.data;
                context.commit('saveDeck', {deck: deck});
                router.push({name: 'Flashcards', params: {deck_id: deck.id, isPrivate: deck.private}})
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
                router.back()
            })
        },
        DELETE_CARD: (context, payload) => {
            ApiService.delete("decks/" + payload.deck_id + "/flashcards/" + payload.card_id).then(result => {
                context.commit('deleteCard', {deck_id: payload.deck_id, card_id: payload.card_id})
            })
        },
        REGISTER_USER: (context, payload) => {
            context.commit('authRequest');
            UserService.register(payload.name, payload.email, payload.password)
                .then(result => {
                    context.commit('authSuccess', result);
                    router.push({name: 'Decks'})
                    // router.push(router.history.current.query.redirect || '/');
                })
                .catch (e => {
                    if (e instanceof AuthenticationError) {
                        context.commit('authError', {errorCode: e.errorCode, errorMessage: e.message})
                    }
                })
        },
        LOGIN_USER: (context, payload) => {
            context.commit('authRequest');
            UserService.login(payload.email, payload.password)
                .then(result => {
                    context.commit('authSuccess', result);
                    router.push({name: 'Decks'});
                    // router.push(router.history.current.query.redirect || '/');
                })
                .catch(e => {
                    console.log(e);
                    if (e instanceof AuthenticationError) {
                        context.commit('authError', {errorCode: e.errorCode, errorMessage: e.message})
                    }
                })
        },
        LOGOUT_USER: (context) => {
            UserService.logout();
            context.commit('logoutSuccess');
            router.push('/')
        }
    }
});