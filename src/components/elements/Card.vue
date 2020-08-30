<template>
    <div class="w-full h-40 bg-white shadow-md flex mt-4">
        <div class="flex-1">
            <div v-if="card.front_type === 'IMAGE'" class="h-full">
                <img class="object-contain h-full w-full" :src="s3+card.front" alt="rear"/>
            </div>
            <div v-else class="flex items-center justify-center p-4 h-full">
                <p class="text-center">
                    {{ card.front }}
                </p>
            </div>
        </div>
        <div class="bg-white w-1 border-2 border-dashed card-divider"></div>
        <div class="flex-1">
            <div v-if="card.rear_type === 'IMAGE'" class="h-full">
                <img class="object-contain h-full w-full" :src="s3+card.rear" alt="rear"/>
            </div>
            <div v-else class="flex items-center justify-center p-4 h-full">
                <p class="text-center">
                    {{ card.rear }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ['card'],
        data() {
            return {
                s3: process.env.VUE_APP_S3_URL
            }
        }
    }
</script>

<style>
.card-divider {
    border-color: #F8E754;
}
</style>