<template>
    <div class="mb-48 relative mt-10">
        <router-link :to="{name: 'FlashcardsList', params: {pDeckId: deck.id, pIsPublic: deck.public}}">
            <div>
                <div class="absolute z-20 w-full h-40 p-4 bg-white border-2 border-purple-600">
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
                <div class="absolute z-10 w-full h-40 bg-purple-100 border-2 border-purple-500 ml-2 mt-2"></div>
                <div class="absolute z-0 w-full h-40 bg-purple-200 border-2 border-purple-400 ml-4 mt-4"></div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Deck",
    props: ["deck"]
}
</script>
