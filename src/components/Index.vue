<template>
    <div class="index container mx-auto">
        <div class="flex flex-wrap">
            <div class="w-1/3 p-2" v-for="deck in decks" :key="deck.id">
                <div class="flex-1 text-gray-700 bg-gray-200 rounded px-4 py-2 m-2">
                    <p class="text-2xl">{{ deck.name }}</p>
                    <p> {{ deck.description }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data() {
            return {
                decks: [
                    {
                        id: "1",
                        name: "English words",
                        description: "Some rarely-used English words"
                    },
                    {
                        id: "2",
                        name: "BBB",
                        description: "adfdlfjdkjgkghkjfdjf"
                    },
                    {
                        id: "3",
                        name: "CCC",
                        description: "Another deck"
                    },
                    {
                        id: "4",
                        name: "CCC",
                        description: "Another deck"
                    },
                    {
                        id: "5",
                        name: "CCC",
                        description: "Another deck"
                    },
                    {
                        id: "6",
                        name: "CCC",
                        description: "Another deck"
                    },
                    {
                        id: "7",
                        name: "CCC",
                        description: "Another deck"
                    }

                ]
            }
        }
    }
</script>

<style>
.index {
    margin-top: 60px;
}
</style>
