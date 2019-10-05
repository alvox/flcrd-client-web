<template>
    <div class="mt-12">
        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="mx-auto max-w-2xl rounded-lg">
            <div class="flex justify-between border-2 rounded-t-lg border-b-0 border-border-primary bg-background-secondary">
                <p class="section-header">My Decks</p>
                <a href="" class="m-4" title="Create new collection">
                    <router-link :to="{name: 'AddDeck', params: {deck_id: 'new'}}">
                        <svg class="fill-current text-copy-secondary inline-block h-6 w-6 hover:text-copy-hover"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
                        </svg>
                    </router-link>
                </a>
            </div>
            <div class="items-stretch border-2 rounded-b-lg border-border-primary min-h-full bg-background-secondary">
                <div v-if="decks.length > 0">
                    <div class="block self-stretch" v-for="deck in sortedDecks" :key="deck.id">
                        <router-link :to="{name: 'FlashcardsList', params: {deck_id: deck.id, visibility: 'private'}}">
                            <div class="flex-1 text-copy-primary bg-background-ternary border-2 border-border-primary rounded-lg px-4 py-2 m-4 cursor-pointer hover:bg-background-hover h-40 min-h-full relative">
                                <p class="text-3xl font-extrabold">{{ deck.name }}</p>
                                <p class="font-thin"> {{ deck.description }}</p>
                                <p class="absolute bottom-0 left-0 py-2 px-4 text-copy-secondary text-xs font-bold">
                                    <span class="text-2xl font-extrabold">{{deck.cards_count}} </span>
                                    <span v-if="deck.cards_count === 1">FLASHCARD</span>
                                    <span v-else>FLASHCARDS</span>
                                </p>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div v-else>
                    <div class="md:flex sm:block self-stretch items-center">
                        <img class="md:object-left sm:object-top object-fit m-20"
                             src="../../assets/img/undraw_add_content.svg" width="200px" height="200px" alt="add content"/>
                        <div class="m-10 md:ml-0 sm:ml-10 text-copy-secondary text-base leading-relaxed">
                            <p class="font-bold text-lg tracking-wide">Nothing here yet...</p>
                            <p class="mt-5">Start by creating a new deck!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from '../../components/Spinner';

    export default {
        name: "Decks",
        components: {
            Spinner
        },
        computed: {
            decks() {
                return this.$store.getters.decks
            },
            sortedDecks() {
                let d = this.decks;
                return d.sort((f, s) => {
                    return f.created > s.created ? 1 : -1
                })
            },
            isLoading() {
                return this.$store.getters.isLoading
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