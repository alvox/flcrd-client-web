<template>
    <div class="index mx-auto max-w-2xl bg-white rounded-lg">
        <div class="flex justify-between border-2 rounded-lg border-b-0 rounded-b-none border-gray-400">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">My Collections</p>
            <a href="" class="m-4">
                <router-link :to="{name: 'AddDeck'}">
                    <svg class="fill-current text-gray-800 inline-block h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
                </router-link>
            </a>
        </div>
        <div class="items-stretch border-2 rounded-lg rounded-t-none border-gray-400 min-h-full shadow">
            <div class="block self-stretch" v-for="deck in decks" :key="deck.id">
                <router-link :to="{name: 'Flashcards', params: {deck_id: deck.id, deck_name: deck.name}}">
                    <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-lg px-4 py-2 m-4 cursor-pointer hover:bg-gray-300 h-40 min-h-full relative">
                        <p class="text-3xl text-gray-800">{{ deck.name }}</p>
                        <p class="text-gray-600"> {{ deck.description }}</p>
                        <p class="absolute bottom-0 left-0 py-2 px-4 text-gray-600 text-sm font-semibold">
                            {{deck.cards_count}}
                            <span v-if="deck.cards_count === 1">flashcard</span>
                            <span v-else>flashcards</span>
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data() {
            return {}
        },
        methods: {},
        computed: {
            decks() {
                return this.$store.getters.decks
            }
        },
    }
</script>

<style>
    .index {
        margin-top: 40px;
    }
</style>
