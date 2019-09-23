<template>
    <div class="md:flex text-copy-primary mb-4 mr-4 rounded-lg bg-background-ternary hover:bg-background-hover"
         :class="{'cursor-pointer': belongs_to_user}">
        <div class="flex-1 border-2 border-border-primary rounded-t-lg md:rounded-l-lg md:rounded-r-none p-4">
            <p class="text-base whitespace-pre-wrap">{{ flashcard.front }}</p>
        </div>
        <div class="flex-1 border-2 border-border-primary rounded-b-lg border-t-0 md:border-t-2 md:border-l-0
                    md:rounded-r-lg md:rounded-l-none p-4">
            <p class="text-base whitespace-pre-wrap">{{ flashcard.rear }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ['flashcard', 'belongs_to_user']
    }
</script>
