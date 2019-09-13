<template>

    <div>
        <div class="mx-auto max-w-2xl rounded-lg mt-10 border-2 border-gray-400 bg-white md:flex md:items-center">
            <img class="object-fit mx-auto mt-10 md:m-10" src="../assets/img/undraw_memory_storage.svg" width="200px" height="200px"/>
            <div class="m-10 md:ml-0 text-gray-800 text-base leading-relaxed">
                <p class>
                    <span class="font-bold text-lg tracking-wide">Flashcards</span>
                    – is one of the most natural methods to memorize things.
                    Just put what you want to learn on it and practice every day. Easy!
                </p>
                <p class="mt-5">
                    Check out public cards decks below or register to create your own.
                </p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl rounded-lg mt-10">
            <div class="flex justify-between border-2 rounded-t-lg border-b-0 border-gray-400 bg-white">
                <p class="section-header">Public Decks</p>
            </div>
            <div class="items-stretch border-2 rounded-b-lg border-gray-400 min-h-full bg-white">
                <div class="block self-stretch" v-for="deck in decks" :key="deck.id">
                    <router-link :to="{name: 'FlashcardsList', params: {deck_id: deck.id, visibility: 'public'}}">
                        <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-lg px-4 py-2 m-4 cursor-pointer hover:bg-gray-300 h-40 min-h-full relative">
                            <p class="text-3xl font-extrabold text-gray-800">{{ deck.name }}</p>
                            <p class="text-gray-700 font-thin"> {{ deck.description }}</p>
                            <p class="absolute bottom-0 left-0 py-2 px-4 text-purple-700 text-xs font-bold">
                                {{deck.cards_count}}
                                <span v-if="deck.cards_count === 1">FLASHCARD</span>
                                <span v-else>FLASHCARDS</span>
                            </p>
                        </div>
                    </router-link>
                </div>
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
        computed: {
            decks() {
                return this.$store.getters.publicDecks
            }
        },
        created() {
            this.$store.dispatch('GET_PUBLIC_DECKS')
        }
    }
</script>

<style></style>
