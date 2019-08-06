<template>
    <div class="flashcards mx-auto max-w-5xl">
        <div class="flex flex-wrap bg-gray-100 items-stretch">
            <div class="w-1/3 p-2 self-stretch" v-for="flashcard in flashcards" :key="flashcard.id">
                <div class="flex-1 text-gray-700 bg-gray-200 rounded px-4 py-2 m-2 cursor-pointer hover:bg-gray-300">
                    <p class="text-2xl">{{ flashcard.front }}</p>
                    <p> {{ flashcard.rear }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Flashcards",
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