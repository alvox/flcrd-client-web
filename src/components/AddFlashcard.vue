<template>
    <div class="mx-auto max-w-sm border rounded py-4 px-4 my-10">
        <p class="text-5xl text-gray-700 text-center">Add Flashcard</p>
        <form @submit.prevent="AddFlashcard">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="front">Front side</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="front" type="text" v-model="front">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="rear">Rear side</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rear" type="text" v-model="rear">
            </div>
            <div class="object-none object-center">
                <button class="border rounded py-2 px-2 w-1/2">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddFlashcard",
        data() {
            return {
                front: null,
                rear: null
            }
        },
        methods: {
            AddFlashcard() {
                let URL = "https://flashcards.rocks/v0/decks/" + this.$route.params.deck_id + "/flashcards";
                this.$http.post(URL, {front: this.front, rear: this.rear}).then(result => {
                    this.$router.back()
                })
            }
        }
    }
</script>

<style scoped>

</style>