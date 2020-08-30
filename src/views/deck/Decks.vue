<template>
    <div class="mt-6">
        <Spinner v-if="isLoading"></Spinner>
        <div v-else>
            <p class="text-3xl">{{ $t('my_decks') }}</p>

            <!--decks-->
            <div v-if="decks.length > 0" class="mt-8 mb-10 flex flex-col">
                <div v-for="deck in sortedDecks" :key="deck.id">
                    <Deck :deck="deck"/>
                </div>
            </div>

            <!--no decks-->
            <div v-else class="m-10 md:ml-0 sm:ml-10 text-copy-secondary text-base leading-relaxed">
                <p class="font-bold text-lg tracking-wide">{{ $t('decks_empty_p1') }}</p>
                <p class="mt-5">{{ $t('decks_empty_p2') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/Spinner"
import Deck from "@/components/Deck"

export default {
    name: "Decks",
    components: {Spinner, Deck},
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
