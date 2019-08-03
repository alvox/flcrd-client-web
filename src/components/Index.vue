<template>
    <div class="index container mx-auto">
        <div class="flex flex-wrap bg-gray-100 items-stretch">
            <div class="w-1/3 p-2 self-stretch" v-for="deck in decks" :key="deck.id">
                <router-link :to="{name: 'Flashcards', params: {deck_id: deck.id}}">
                    <div class="flex-1 text-gray-700 bg-gray-200 rounded px-4 py-2 m-2 cursor-pointer hover:bg-gray-300">
                        <p class="text-2xl">{{ deck.name }}</p>
                        <p> {{ deck.description }}</p>
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
            return {
                decks: []
            }
        },
        methods: {
            fetchDecks() {
                let URL = "https://flashcards.rocks/v0/decks";
                this.$http.get(URL).then(result => {
                    this.decks = result.data
                })
            }
        },
        created() {
            this.fetchDecks()
        }
    }
</script>

<style>
    .index {
        margin-top: 60px;
    }
</style>
