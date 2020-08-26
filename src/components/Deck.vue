<template>
    <div class="mb-48 mx-10 relative mt-10">
        <div class="absolute z-20 w-full h-40 p-4 bg-white border border-yellow-800">
            <p class="font-bold text-2xl">{{ deck.name }}</p>
            <p>{{ deck.description }}</p>

            <div class="absolute bottom-0 left-0 py-2 px-4 text-copy-secondary text-xs">
                <p class="font-bold">
                    <span class="text-2xl font-extrabold">{{ deck.cards_count }} </span>
                    <span v-if="deck.cards_count === 1">FLASHCARD</span>
                    <span v-else>FLASHCARDS</span>
                </p>
            </div>
        </div>
        <div class="absolute z-10 w-full h-40 bg-gray-200 border border-yellow-800 ml-2 mt-2"></div>
        <div class="absolute z-0 w-full h-40 bg-gray-300 border border-yellow-800 ml-4 mt-4"></div>
    </div>
</template>

<script>
export default {
    name: "Deck",
    props: ["deck"]
}
</script>
