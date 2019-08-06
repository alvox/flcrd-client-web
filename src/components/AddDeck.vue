<template>
    <div class="mx-auto max-w-5xl">
        <p>Add Deck</p>
        <form @submit.prevent="AddDeck">
            <label>Deck name
                <input type="text" name="name" v-model="name">
            </label>
            <label>Description
                <input type="text" name="description" v-model="description">
            </label>
            <button>Add Deck</button>
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
                    this.$router.push({name: 'Index'})
                })
            }
        }
    }
</script>

<style>

</style>