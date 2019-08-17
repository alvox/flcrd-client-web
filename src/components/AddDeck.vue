<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">Create new collection</p>
        </div>
            <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none" @submit.prevent="AddDeck">
                <div class="mb-6 p-4 pt-6">
<!--                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>-->
                    <input class="appearance-none outline-none border-gray-400 border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Give it a name" v-model="name">
                </div>
                <div class="mb-6 p-4">
<!--                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>-->
                    <input class="outline-none border-gray-400 border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="You can also add some brief description" v-model="description">
                </div>
                <div class="flex justify-end p-4 content-center">
                    <p class="mr-4 cursor-pointer py-2" title="Cancel">Cancel</p>
                    <button class="border rounded-lg py-2 px-6" title="Create">Create</button>
                </div>
            </form>
    </div>
</template>

<script>
    export default {
        name: "AddDeck",
        data() {
            return {
                name: null,
                description: null
            }
        },
        methods: {
            AddDeck() {
                this.$store.dispatch('CREATE_DECK', {
                    name: this.name,
                    description: this.description
                });
            }
        }
    }
</script>

<style>

</style>