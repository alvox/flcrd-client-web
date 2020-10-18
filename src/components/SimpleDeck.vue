<template>
        <router-link :to="{name: 'FlashcardsList', params: {pDeckId: deck.id, pIsPublic: deck.public}}">
            <div class="relative w-full h-40 p-4 bg-white border-2 border-purple-600 flex-1">
                <p class="font-bold text-2xl text-purple-900">{{ deck.name }}</p>
                <p>{{ deck.description }}</p>

                <div class="absolute bottom-0 left-0 py-2 px-4 text-copy-secondary text-xs">
                    <p class="font-bold">
                        <span class="text-2xl font-extrabold">{{ deck.cards_count }} </span>
                        <span v-if="deck.cards_count === 1">FLASHCARD</span>
                        <span v-else>FLASHCARDS</span>
                    </p>
                </div>
            </div>

        </router-link>
</template>

<script>
export default {
    name: "Deck",
    props: ["deck"]
}
</script>
