<template>
    <div class="flashcards mx-auto max-w-5xl">
        <div class="block flex justify-between">
            <p class="text-3xl text-gray-700">{{ deck.name }}</p>
            <a href="" class="border px-4 py-2 rounded-lg">
                <router-link :to="{name: 'AddFlashcard', params: {deck_id: this.$route.params.deck_id}}">Add new
                    flashcard
                </router-link>
            </a>
            <span class="text-xl text-red-400" @click="deleteDeck">Delete deck</span>
        </div>
        <div class="flex flex-wrap items-stretch">
            <div class="w-1/3 p-2 self-stretch" v-for="flashcard in deck.cards" :key="flashcard.id">
                <div class="relative flex-1 text-gray-700 bg-gray-200 rounded px-4 py-2 m-2">
                    <p class="text-2xl">{{ flashcard.front }}</p>
                    <p> {{ flashcard.rear }}</p>
                    <div class="absolute top-0 right-0 px-2 py-2 font-semibold text-xs">
                        <div class=" text-red-500 hover:text-red-700 cursor-pointer" @click="deleteCard(flashcard.id)">
                            Delete
                        </div>
                        <div class=" text-gray-500 hover:text-gray-700 cursor-pointer">Edit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Flashcards",
        data() {
            return {}
        },
        methods: {
            deleteDeck() {
                this.$store.dispatch('DELETE_DECK', {deck_id: this.deck.id})
            },
            deleteCard(id) {
                this.$store.dispatch('DELETE_CARD', {deck_id: this.deck.id, card_id: id})
            }
        },
        computed: {
            deck() {
                return this.$store.getters.deck(this.$route.params.deck_id)
            },
        },
        mounted() {
            if (this.deck.cards == null) {
                this.$store.dispatch('GET_CARDS_FOR_DECK', {
                    deck_id: this.deck.id
                })
            }
        }
    }
</script>

<style>
    .flashcards {
        margin-top: 60px;
    }
</style>