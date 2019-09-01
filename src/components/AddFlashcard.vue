<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">Add Flashcard</p>
        </div>
        <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none block" autocomplete="off"
              @submit.prevent="AddFlashcard">
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="front">Front side</label>
                <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="front" placeholder="Front..." rows="4" v-model="front"></textarea>
            </div>
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="rear">Rear side</label>
                <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="rear" placeholder="Rear..." rows="4" v-model="rear"></textarea>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="mr-4 cursor-pointer py-2 text-gray-600 text-sm hover:text-red-500" title="Cancel"
                   @click="GoBack">Cancel</p>
                <button class="border rounded-lg py-2 px-6 text-gray-700 text-sm font-bold hover:text-purple-600 hover:border-purple-600"
                        title="Create">Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddFlashcard",
        data() {
            return {
                front: null,
                rear: null
            }
        },
        methods: {
            AddFlashcard() {
                this.$store.dispatch('CREATE_CARD', {
                    deck_id: this.$route.params.deck_id,
                    front: this.front,
                    rear: this.rear
                })
            },
            GoBack() {
                this.$router.back()
            }
        }
    }
</script>

<style></style>