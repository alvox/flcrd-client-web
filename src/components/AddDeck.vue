<template>
    <div class="mx-auto max-w-sm border rounded py-4 px-4 my-10">
        <p class="text-5xl text-gray-700 text-center">Add Deck</p>
        <form @submit.prevent="AddDeck">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" v-model="name">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" v-model="description">
            </div>
            <div class="object-none object-center">
                <button class="border rounded py-2 px-2 w-1/2">Add Deck</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddDeck",
        data() {
            return {
                name: null,
                description: null
            }
        },
        methods: {
            AddDeck() {
                let URL = "https://flashcards.rocks/v0/decks";
                this.$http.post(URL, {name: this.name, description: this.description}).then(result => {
                    let deck = result.data;
                    this.$router.push({name: 'Flashcards', params: {deck_id: deck.id, deck_name: deck.name}})
                })
            }
        }
    }
</script>

<style>

</style>