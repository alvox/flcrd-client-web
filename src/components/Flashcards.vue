<template>
    <div class="mx-auto max-w-2xl min-w-2xl rounded-lg mt-10">
        <div class="flex justify-between border-2 rounded-lg border-b-0 rounded-b-none border-gray-400 bg-white">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">{{ deck.name }}</p>
            <div class="m-4">
                <p class="mr-4 cursor-pointer inline-block" title="Delete collection" @click="deleteDeck">
                    <svg class="fill-current text-red-400 inline-block h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"></path>
                    </svg>
                </p>
                <a href="" title="Create new flashcard">
                    <router-link :to="{name: 'AddFlashcard', params: {deck_id: this.$route.params.deck_id}}">
                        <svg class="fill-current text-gray-800 inline-block h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
                        </svg>
                    </router-link>
                </a>
            </div>
        </div>
        <div class="sm:block md:flex flex-wrap items-stretch border-2 rounded-lg rounded-t-none border-gray-400 pt-4 pl-4 bg-white">
            <div class="md:w-1/2 self-stretch" v-for="flashcard in deck.cards" :key="flashcard.id">
                <div class="relative flex-1 text-gray-700 bg-gray-100 border-2 border-gray-400 rounded-lg rounded px-4 py-2 mb-4 mr-4">
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
        props: ['isPrivate'],
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
                return this.$store.getters.deck(this.$route.params.deck_id, this.isPrivate)
            },
        },
        mounted() {
            if (this.deck.cards == null) {
                if (this.deck.private) {
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
</script>

<style></style>