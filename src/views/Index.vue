<template>
    <div class="ml-12 mt-10">
        <div class="text-2xl font-thin">
            <p><span class="font-bold tracking-wide">{{ $t('flashcards') }}</span>{{ $t('index_copy_1') }}</p>
            <p class="mt-5">{{ $t('index_copy_2') }}</p>
        </div>
        <div class="mt-8 mb-10 flex flex-col">
            <div v-for="deck in decks" :key="deck.id">
                <Deck :deck="deck"/>
            </div>
        </div>
    </div>
</template>

<script>
import Deck from "@/components/Deck"

export default {
    name: 'Index',
    components: {Deck},
    data() {
        return {
            page: 1,
            per_page: 10
        }
    },
    methods: {
        nextPage() {
            this.page = this.page + 1
            this.$store.dispatch('GET_PUBLIC_DECKS', {page: this.page, per_page: this.per_page})
        },
        previousPage() {
            this.page = this.page - 1
            this.$store.dispatch('GET_PUBLIC_DECKS', {page: this.page, per_page: this.per_page})
        },
    },
    computed: {
        lastPage() {
            return this.total < this.page * this.per_page
        },
        decks() {
            return this.$store.getters.publicDecks
        },
        total() {
            return this.$store.getters.publicTotal
        },
        nonEmptyDecks() {
            return this.decks.filter(d => {
                return d.cards_count > 0;
            })
        }
    },
    created() {
        this.$store.dispatch('GET_PUBLIC_DECKS', {page: this.page, per_page: this.per_page})
    }
}
</script>
