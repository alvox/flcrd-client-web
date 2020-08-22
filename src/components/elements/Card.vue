<template>
    <div class="md:flex md:h-56 text-copy-primary mb-4 mr-4 rounded-lg bg-background-ternary hover:bg-background-hover"
         :class="{'cursor-pointer': belongs_to_user}">

        <div class="flex-1">
            <div v-if="flashcard.front_type === 'IMAGE'" class="h-full border-2 border-border-primary">
                <img class="object-contain h-full w-full" :src="s3+flashcard.front" alt="front"/>
            </div>
            <div v-else class="flex items-center justify-center p-4 h-full border-2 border-border-primary rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                <p class="text-base text-center whitespace-pre-line">{{ flashcard.front }}</p>
            </div>
        </div>

        <div class="flex-1">
            <div v-if="flashcard.rear_type === 'IMAGE'" class="h-full border-2 border-border-primary border-t-0 md:border-t-2 md:border-l-0">
                <img class="object-contain h-full w-full" :src="s3+flashcard.rear" alt="rear"/>
            </div>
            <div v-else class="flex items-center justify-center p-4 h-full border-2 border-border-primary border-t-0 md:border-t-2 md:border-l-0 rounded-b-lg md:rounded-r-lg md:rounded-l-none">
                <p class="text-base text-center whitespace-pre-line">{{ flashcard.rear }}</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ['flashcard', 'belongs_to_user'],
        data() {
            return {
                s3: process.env.VUE_APP_S3_URL
            }
        },
        created() {
            console.log(process.env.VUE_APP_S3_URL)
        }
    }
</script>
