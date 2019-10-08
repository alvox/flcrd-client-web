<template>
    <div>
        <div class="mx-auto max-w-2xl rounded-lg mt-10 border-2 border-border-primary bg-background-secondary md:flex md:items-center">
            <img class="object-fit mx-auto mt-10 md:m-10" src="../assets/img/undraw_memory_storage.svg" width="200px" height="200px" alt="memory storage"/>
            <div class="m-10 md:ml-0 text-copy-primary text-base leading-relaxed">
                <p class>
                    <span class="font-bold text-lg tracking-wide">{{$t('flashcards')}}</span>
                    {{$t('index_copy_1')}}
                </p>
                <p class="mt-5">
                    {{$t('index_copy_2')}}
                </p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl rounded-lg mt-10">
            <div class="flex justify-between border-2 rounded-t-lg border-b-0 border-border-primary bg-background-secondary">
                <p class="section-header">{{$t('public_decks')}}</p>
            </div>
            <div class="items-stretch border-2 rounded-b-lg border-border-primary min-h-full bg-background-secondary text-copy-primary">
                <div class="block self-stretch" v-for="deck in nonEmptyDecks" :key="deck.id">
                    <router-link :to="{name: 'FlashcardsList', params: {deck_id: deck.id, visibility: 'public'}}">
                        <div class="flex-1 bg-background-ternary border-2 border-border-primary rounded-lg px-4 py-2 m-4 cursor-pointer hover:bg-background-hover h-40 min-h-full relative">
                            <p class="text-3xl font-extrabold">{{ deck.name }}</p>
                            <p class="font-thin"> {{ deck.description }}</p>

                            <div class="absolute bottom-0 left-0 py-2 px-4 text-copy-secondary text-xs">
                                <p class="font-bold">
                                    <span class="text-2xl font-extrabold">{{deck.cards_count}} </span>
                                    <span v-if="deck.cards_count === 1">FLASHCARD</span>
                                    <span v-else>FLASHCARDS</span>
                                    <span class="px-2">•</span>
                                    <span class="font-normal">{{$t('by')}} {{deck.created_by.name}}</span>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="flex justify-center mb-5">
                    <button class="focus:outline-none secondary-btn hover:bg-background-primary rounded-r-none border-r-0">Previous</button>
                    <button class="focus:outline-none secondary-btn mr-4 hover:bg-background-primary rounded-l-none">Next</button>
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
            },
            nonEmptyDecks() {
                return this.decks.filter(d => {
                    return d.cards_count > 0;
                })
            }
        },
        created() {
            this.$store.dispatch('GET_PUBLIC_DECKS')
        }
    }
</script>

<style></style>
