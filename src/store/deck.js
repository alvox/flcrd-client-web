import Vue from "vue"
import ApiService from "../services/api"
import router from "../router"

export const DeckState = {
    state: {
        decks: [],
        publicDecks: [],
        publicTotal: 0
    },
    getters: {
        decks: state => {
            return state.decks
        },
        publicDecks: state => {
            return state.publicDecks
        },
        publicTotal: state => {
            return state.publicTotal
        },
        deck: (state) => (id) => {
            let decks = state.decks.filter(deck => deck.id === id)
            if (decks.length === 0) {
                decks = state.publicDecks.filter(deck => deck.id === id)
            }
            return decks[0]
        }
    },
    mutations: {
        saveDecks(state, decks) {
            state.decks = decks
        },
        savePublicDecks(state, payload) {
            state.publicDecks = payload.decks
            state.publicTotal = payload.total
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
        }
    },
    actions: {
        GET_PUBLIC_DECKS: (context, payload) => {
            let url = `/public/decks?page=${payload.page}&per_page=${payload.per_page}`
            console.log(url)
            ApiService.get(url)
                .then(result => {
                    let total = result.headers["x-total-count"]
                    context.commit('savePublicDecks', {decks: result.data, total: total})
                })
        },
        GET_DECKS: (context) => {
            context.commit('loading', true, {root: true})
            ApiService.get("decks")
                .then(result => {
                    context.commit('saveDecks', result.data)
                })
                .finally(() => {
                    context.commit('loading', false, {root: true})
                })
        },
        GET_CARDS_FOR_PUBLIC_DECK: (context, payload) => {
            context.commit('loading', true, {root: true})
            ApiService.get("public/decks/" + payload.deck_id + "/flashcards")
                .then(result => {
                    context.commit('saveFlashcardsForPublicDeck', {
                        deck_id: payload.deck_id,
                        flashcards: result.data
                    })
                })
                .finally(() => {
                    context.commit('loading', false, {root: true})
                })
        },
        GET_CARDS_FOR_DECK: (context, payload) => {
            context.commit('loading', true, {root: true})
            ApiService.get("decks/" + payload.deck_id + "/flashcards")
                .then(result => {
                    context.commit('saveFlashcards', {
                        deck_id: payload.deck_id,
                        flashcards: result.data
                    })
                })
                .finally(() => {
                    context.commit('loading', false, {root: true})
                })
        },
        CREATE_DECK: (context, payload) => {
            ApiService.post("decks", {
                    name: payload.name,
                    description: payload.description,
                    public: payload.is_public,
                })
                .then(result => {
                    let deck = result.data;
                    context.commit('saveDeck', {deck: deck})
                    context.commit('clearError', null, {root: true})
                    let visibility = deck.public ? 'public' : 'private'
                    router.push({name: 'FlashcardsList', params: {deck_id: deck.id, visibility: visibility}})
                })
                .catch(err => {
                    context.commit('apiError', {
                        errorCode: err.response.data.code,
                        errorMessage: err.response.data.message
                    }, {root: true})
                })
        },
        UPDATE_DECK: (context, payload) => {
            ApiService.put("decks/" + payload.deck_id, {
                    id: payload.deck_id,
                    name: payload.deck.name,
                    description: payload.deck.description,
                    public: payload.deck.is_public,
                })
                .then(result => {
                    let deck = result.data
                    context.commit('updateDeck', {deck: deck})
                    context.commit('clearError', null, {root: true})
                    router.back()
                })
                .catch(err => {
                    context.commit('apiError', {
                        errorCode: err.response.data.code,
                        errorMessage: err.response.data.message
                    }, {root: true})
                })
        },
        DELETE_DECK: (context, payload) => {
            ApiService.delete("decks/" + payload.deck_id)
                .then(result => {
                    context.commit('deleteDeck', {deck_id: payload.deck_id})
                    router.push({name: 'Decks'})
                })
        },
        CREATE_CARD: (context, payload) => {
            ApiService.post("decks/" + payload.deck_id + "/flashcards", {
                    front: payload.front,
                    rear: payload.rear
                })
                .then(result => {
                    context.commit('saveCard', {deck_id: payload.deck_id, card: result.data})
                })
        },
        UPDATE_CARD: (context, payload) => {
            ApiService.put("decks/" + payload.deck_id + "/flashcards/" + payload.id, payload)
                .then(result => {
                    context.commit('updateCard', result.data);
                    router.back()
                })
        },
        DELETE_CARD: (context, payload) => {
            ApiService.delete("decks/" + payload.deck_id + "/flashcards/" + payload.card_id)
                .then(result => {
                    context.commit('deleteCard', {deck_id: payload.deck_id, card_id: payload.card_id})
                    router.back()
            })
        },
        REFRESH_DATA: (context, payload) => {
            if (payload.is_private) {
                ApiService.get("decks")
                    .then(result => {
                        context.commit('saveDecks', result.data)
                        ApiService.get("decks/" + payload.deck_id + "/flashcards")
                            .then(result => {
                                context.commit('saveFlashcards', {
                                    deck_id: payload.deck_id,
                                    flashcards: result.data
                                })
                            })
                    })
            } else {
                ApiService.get("public/decks")
                    .then(result => {
                        context.commit('savePublicDecks', result.data)
                        ApiService.get("public/decks/" + payload.deck_id + "/flashcards")
                            .then(result => {
                                context.commit('saveFlashcardsForPublicDeck', {
                                    deck_id: payload.deck_id,
                                    flashcards: result.data
                                })
                            })
                    })
            }
        }
    }
}
