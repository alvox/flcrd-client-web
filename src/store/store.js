import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        decks: [],
    },
    getters: {
        decks: state => {
            return state.decks
        },
        deck: (state) => (id) => {
            return state.decks.filter(deck => deck.id === id)[0]
        }
    },
    mutations: {
        saveDecks(state, decks) {
            state.decks = decks
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
        saveCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0];
            deck.cards.push(payload.card);
            deck.cards_count++
        },
        deleteCard(state, payload) {
            let deck = state.decks.filter(deck => deck.id === payload.deck_id)[0];
            deck.cards = deck.cards.filter(card => card.id !== payload.card_id)
            deck.cards_count--
        }
    },
    actions: {
        GET_DECKS: (context) => {
            let URL = "https://flashcards.rocks/v0/decks";
            axios.get(URL).then(result => {
                context.commit('saveDecks', result.data)
            })
        },
        GET_CARDS_FOR_DECK: (context, payload) => {
            let URL = "https://flashcards.rocks/v0/decks/" + payload.deck_id + "/flashcards";
            axios.get(URL).then(result => {
                context.commit('saveFlashcards', {
                    deck_id: payload.deck_id,
                    flashcards: result.data
                })
            })
        },
        CREATE_DECK: (context, payload) => {
            let URL = "https://flashcards.rocks/v0/decks";
            axios.post(URL, {
                name: payload.name,
                description: payload.description
            }).then(result => {
                let deck = result.data;
                context.commit('saveDeck', {deck: deck});
                router.push({name: 'Flashcards', params: {deck_id: deck.id}})
            })
        },
        DELETE_DECK: (context, payload) => {
            let URL = "https://flashcards.rocks/v0/decks/" + payload.deck_id;
            axios.delete(URL).then(result => {
                context.commit('deleteDeck', {deck_id: payload.deck_id});
                router.push({name: 'Index'})
            })
        },
        CREATE_CARD: (context, payload) => {
            let URL = "https://flashcards.rocks/v0/decks/" + payload.deck_id + "/flashcards";
            axios.post(URL, {
                front: payload.front,
                rear: payload.rear
            }).then(result => {
                context.commit('saveCard', {deck_id: payload.deck_id, card: result.data});
                router.back()
            })
        },
        DELETE_CARD: (context, payload) => {
            let URL = "https://flashcards.rocks/v0/decks/" + payload.deck_id + "/flashcards/" + payload.card_id;
            axios.delete(URL).then(result => {
                context.commit('deleteCard', {deck_id: payload.deck_id, card_id: payload.card_id})
            })
        }
    }
});