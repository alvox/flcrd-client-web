<template>
    <div class="mx-auto max-w-2xl rounded-lg mt-10">
        <div class="flex justify-between border-2 rounded-lg border-b-0 rounded-b-none border-gray-400 bg-white">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">My Collections</p>
            <a href="" class="m-4" title="Create new collection">
                <router-link :to="{name: 'AddDeck', params: {deck_id: 'new'}}">
                    <svg class="fill-current text-gray-700 inline-block h-6 w-6 hover:text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
                    </svg>
                </router-link>
            </a>
        </div>
        <div class="items-stretch border-2 rounded-lg rounded-t-none border-gray-400 min-h-full bg-white">
            <div v-if="decks.length > 0">
                <div class="block self-stretch" v-for="deck in sortedDecks" :key="deck.id">
                    <router-link :to="{name: 'FlashcardsList', params: {deck_id: deck.id}}">
                        <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-lg px-4 py-2 m-4 cursor-pointer hover:bg-gray-300 h-40 min-h-full relative">
                            <p class="text-3xl text-gray-800">{{ deck.name }}</p>
                            <p class="text-gray-600 font-thin"> {{ deck.description }}</p>
                            <p class="absolute bottom-0 left-0 py-2 px-4 text-gray-600 text-sm font-semibold">
                                {{deck.cards_count}}
                                <span v-if="deck.cards_count === 1">flashcard</span>
                                <span v-else>flashcards</span>
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <div class="md:flex sm:block self-stretch items-center">
                    <img class="md:object-left sm:object-top object-fit m-20" src="../assets/img/undraw_add_content.svg" width="200px" height="200px"/>
                    <div class="m-10 md:ml-0 sm:ml-10 text-gray-800 text-base leading-relaxed">
                        <p class="font-bold text-lg tracking-wide">Nothing here yet...</p>
                        <p class="mt-5">Start by creating new collection!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Decks",
        computed: {
            decks() {
                return this.$store.getters.decks
            },
            sortedDecks() {
                let d = this.decks;
                return d.sort((f, s) => {return f.created > s.created ? 1 : -1})
            }
        },
        created() {
            if (this.decks.length === 0) {
                this.$store.dispatch('GET_DECKS')
            }
        }
    }
</script>

<style scoped>

</style>