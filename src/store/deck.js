import Vue from "vue"
import ApiService from "../services/api"
import router from "../router"
import {SettingsService} from "@/services/settings";

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
            card.front_type = payload.front_type
            card.rear = payload.rear
            card.rear_type = payload.rear_type
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
                    description: payload.description
                })
                .then(result => {
                    let deck = result.data;
                    context.commit('saveDeck', {deck: deck})
                    context.commit('setCurrentDeckId', {deckId: deck.id, isPublic: deck.public}, {root: true})
                    context.commit('clearError', null, {root: true})
                    context.commit('hideDeckModal', {root: true})
                    router.push({name: 'FlashcardsList', params: {deck_id: deck.id, visibility: "private"}})
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
                    context.commit('hideDeckEditModal', {root: true})
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
                    context.commit('clearError', null, {root: true})
                    context.commit('hideDeckEditModal', {root: true})
                    router.push({name: 'Decks'})
                })
        },
        CREATE_CARD: (context, payload) => {
            let fd = new FormData();
            fd.append("front", payload.front)
            fd.append("rear", payload.rear)
            if (payload.frontImage != null) {
                fd.append("front_type", "IMAGE")
                fd.append("front_image", payload.frontImage, payload.frontImage.name)
            } else {
                fd.append("front_type", "TEXT")
            }
            if (payload.rearImage != null) {
                fd.append("rear_type", "IMAGE")
                fd.append("rear_image", payload.rearImage, payload.rearImage.name)
            } else {
                fd.append("rear_type", "TEXT")
            }

            ApiService.post("decks/" + payload.deck_id + "/flashcards", fd)
                .then(result => {
                    context.commit('saveCard', {deck_id: payload.deck_id, card: result.data})
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        UPDATE_CARD: (context, payload) => {
            let fd = new FormData();
            fd.append("front", payload.front)
            fd.append("rear", payload.rear)
            if (payload.frontImage != null) {
                fd.append("front_type", "IMAGE")
                fd.append("front_image", payload.frontImage, payload.frontImage.name)
            } else {
                fd.append("front_type", "TEXT")
            }
            if (payload.rearImage != null) {
                fd.append("rear_type", "IMAGE")
                fd.append("rear_image", payload.rearImage, payload.rearImage.name)
            } else {
                fd.append("rear_type", "TEXT")
            }
            ApiService.put("decks/" + payload.deck_id + "/flashcards/" + payload.id, fd)
                .then(result => {
                    context.commit('updateCard', result.data);
                    context.commit('hideCardModal')
                })
        },
        DELETE_CARD: (context, payload) => {
            ApiService.delete("decks/" + payload.deck_id + "/flashcards/" + payload.card_id)
                .then(result => {
                    context.commit('deleteCard', {deck_id: payload.deck_id, card_id: payload.card_id})
                    router.back()
            })
        },
        REFRESH_DATA: (context) => {
            context.commit('loading', true, {root: true})
            let deckInfo = SettingsService.getDeckInfo()
            if (deckInfo.isPublic) {
                ApiService.get("public/decks")
                    .then(result => {
                        context.commit('savePublicDecks', {decks: result.data, total: 0})
                        ApiService.get("public/decks/" + deckInfo.deckId + "/flashcards")
                            .then(result => {
                                context.commit('saveFlashcardsForPublicDeck', {
                                    deck_id: deckInfo.deckId,
                                    flashcards: result.data
                                })
                            })
                    })
                    .finally(() => {
                        context.commit('loading', false, {root: true})
                        context.commit('setCurrentDeckId', {deckId: deckInfo.deckId, isPublic: deckInfo.isPublic}, {root: true})
                    })
            } else {
                ApiService.get("decks")
                    .then(result => {
                        context.commit('saveDecks', result.data)
                        ApiService.get("decks/" + deckInfo.deckId + "/flashcards")
                            .then(result => {
                                context.commit('saveFlashcards', {
                                    deck_id: deckInfo.deckId,
                                    flashcards: result.data
                                })
                            })
                    })
                    .finally(() => {
                        context.commit('loading', false, {root: true})
                        context.commit('setCurrentDeckId', {deckId: deckInfo.deckId, isPublic: deckInfo.isPublic}, {root: true})
                    })
            }
        }
    }
}
