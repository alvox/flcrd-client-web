<template>
    <div>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="mt-6">
            <p class="text-3xl">{{ deck.name }}</p>

            <!--cards-->
            <div v-if="sortedCards.length > 0" class="flex flex-col">
                <div v-for="card in sortedCards" :key="card.id">
                    <Card :card=card></Card>
                </div>
            </div>

            <!--empty deck-->
            <div v-else>
                <div class="m-10 text-copy-secondary text-base leading-relaxed">
                    <p class="mt-5">{{ $t('cards_copy_p1') }}<br/> {{ $t('cards_copy_p2') }} <span
                        class="text-2xl">👇</span></p>
                </div>
            </div>

            <!--new card form-->
            <div v-if="deckBelongsToUser" class="mb-10">
                <NewCardForm v-if="!deckIsPacked" :deckId="deckId" class=""></NewCardForm>
                <div v-else class="font-thin text-center text-copy-secondary p-4">
                    <p>Nice, you got 100 cards here! It's a reasonable limit for a deck to keep it learnable.</p>
                    <p>To continue adding cards,
                        <router-link :to="{name: 'AddDeck', params: {deck_id: 'new'}}"><span
                            class="text-blue-500 underline">create a new deck.</span></router-link>
                    </p>
                </div>
            </div>
        </div>
        <DeckModal v-if="deckEditModalVisible" mode="edit"></DeckModal>
        <CardModal v-if="cardModalVisible"></CardModal>
    </div>
</template>

<script>
import Spinner from "@/components/Spinner"
import Card from "@/components/Card"
import NewCardForm from "@/components/NewCardForm"
import DeckModal from "@/components/DeckModal"
import CardModal from "@/components/CardModal"
import {SettingsService} from "@/services/settings"

export default {
    name: "FlashcardsList",
    components: {
        CardModal, NewCardForm, Spinner, Card, DeckModal
    },
    props: ["pDeckId", "pIsPublic"],
    data() {
        return {
            deckId: this.pDeckId,
            isPublic: this.pIsPublic
        }
    },
    methods: {
        focusOnTextarea() {
            document.getElementById('front').focus()
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters.isLoading
        },
        deck() {
            return this.$store.getters.deck(this.deckId)
        },
        sortedCards() {
            let c = this.deck.cards;
            if (c == null || c.length === 0) {
                return []
            }
            return c.sort((f, s) => {
                return s.created - f.created
            })
        },
        deckBelongsToUser() {
            return this.$store.getters.userId === this.deck.created_by.id
        },
        deckIsPacked() {
            return this.cardsLeft <= 0
        },
        cardsLeft() {
            if (!this.deck.cards) {
                return 100
            }
            return 100 - this.deck.cards.length
        },
        deckEditModalVisible() {
            return this.$store.getters.isDeckEditModalVisible
        },
        cardModalVisible() {
            return this.$store.getters.isCardModalVisible
        }
    },
    created() {
        if (!this.deck) {
            console.log('page been refreshed');
            let deckInfo = SettingsService.getDeckInfo()
            this.deckId = deckInfo.deckId
            this.isPublic = deckInfo.isPublic
            this.$store.dispatch('REFRESH_DATA');
        } else {
            this.$store.commit('setCurrentDeckId', {deckId: this.deckId, isPublic: this.isPublic})
            if (this.deck.cards == null) {
                if (this.deckBelongsToUser) {
                    this.$store.dispatch('GET_CARDS_FOR_DECK', {
                        deck_id: this.deck.id
                    })
                } else {
                    this.$store.dispatch('GET_CARDS_FOR_PUBLIC_DECK', {
                        deck_id: this.deck.id
                    })
                }
            }
        }
    }
}
</script>
