<template>
    <div class="container">
        <p>Add Deck</p>
        <form>
            <label for="name">Deck name</label>
            <input type="text" name="title" v-model="name">
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddDeck",
        data() {
            return {
                name: null
            }
        }
    }
</script>

<style>

</style>