<template>
    <div class="md:flex text-copy-primary mb-4 mr-4 rounded-lg bg-background-ternary hover:bg-background-hover h-56"
         :class="{'cursor-pointer': belongs_to_user}">

        <div class="flex-1">
            <div v-if="flashcard.front.startsWith('http')">
                <img class="object-fill rounded-b-lg md:rounded-r-lg md:rounded-l-none h-56 w-full" :src="flashcard.front" alt="front"/>
            </div>
            <div v-else class="flex items-center justify-center p-4 border-2 border-border-primary rounded-t-lg md:rounded-l-lg md:rounded-r-none h-full">
                <p class="text-base text-center whitespace-pre-line">{{ flashcard.front }}</p>
            </div>
        </div>

        <div class="flex-1">
            <div v-if="flashcard.rear.startsWith('http')">
                <img class="object-fill rounded-b-lg md:rounded-r-lg md:rounded-l-none h-56 w-full" :src="flashcard.rear" alt="rear"/>
            </div>
            <div v-else class="flex items-center justify-center p-4 border-2 border-border-primary rounded-b-lg md:rounded-r-lg md:rounded-l-none border-t-0 md:border-t-2 md:border-l-0 h-full">
                <p class="text-base text-center whitespace-pre-line">{{ flashcard.rear }}</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ['flashcard', 'belongs_to_user']
    }
</script>
