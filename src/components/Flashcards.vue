<template>
    <div class="flashcards mx-auto max-w-5xl">
        <div class="block flex justify-between">
            <p class="text-3xl text-gray-700">{{ deck_name }}</p>
            <a href="" class="border px-4 py-2 rounded-lg">
                <router-link :to="{name: 'AddFlashcard', params: {deck_id: this.$route.params.deck_id}}">Add new flashcard</router-link>
            </a>
            <span class="text-xl text-red-400" @click="deleteDeck">Delete deck</span>
        </div>
        <div class="flex flex-wrap items-stretch">
            <div class="w-1/3 p-2 self-stretch" v-for="flashcard in flashcards" :key="flashcard.id">
                <div class="relative flex-1 text-gray-700 bg-gray-200 rounded px-4 py-2 m-2">
                    <p class="text-2xl">{{ flashcard.front }}</p>
                    <p> {{ flashcard.rear }}</p>
                    <div class="absolute top-0 right-0 text-red-500 hover:text-red-700 cursor-pointer" @click="deleteCard(flashcard.id)">Delete</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Flashcards",
        props: ['deck_name'],
        data() {
            return {
                flashcards: []
            }
        },
        methods: {
            fetchFlashcards() {
                let URL = "https://flashcards.rocks/v0/decks/" + this.$route.params.deck_id + "/flashcards";
                this.$http.get(URL).then(result => {
                    this.flashcards = result.data
                })
            },
            deleteDeck() {
                let URL = "https://flashcards.rocks/v0/decks/" + this.$route.params.deck_id;
                this.$http.delete(URL).then(result => {
                    this.$router.push({name: 'Index'})
                })
            },
            deleteCard(id) {
                let URL = "https://flashcards.rocks/v0/decks/" + this.$route.params.deck_id + "/flashcards/" + id;
                this.$http.delete(URL).then(result => {
                    this.fetchFlashcards()
                })
            }
        },
        created() {
            this.fetchFlashcards()
        }
    }
</script>

<style>
    .flashcards {
        margin-top: 60px;
    }
</style>