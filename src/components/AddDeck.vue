<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">Create new collection</p>
        </div>
        <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none block" autocomplete="off"
              @submit.prevent="AddDeck">
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="name">Name</label>
                <input class="appearance-none outline-none border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-400"
                       id="name" type="text" placeholder="Give it a name" v-model="name">
            </div>
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="description">Description</label>
                <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="description" placeholder="You can also add some brief description" rows="4"
                        v-model="description"></textarea>
            </div>
            <label class="block text-gray-700 font-bold pl-4">
                <input class="mr-2 leading-tight" type="checkbox" v-model="isPublic">
                <span class="text-sm">
                        Make it public
                    </span>
            </label>
            <div class="flex justify-end p-4 content-center">
                <p class="mr-4 cursor-pointer py-2 text-gray-600 text-sm hover:text-red-500" title="Cancel"
                   @click="GoBack">Cancel</p>
                <button class="border rounded-lg py-2 px-6 text-gray-700 text-sm font-bold hover:text-purple-600 hover:border-purple-600"
                        title="Create">Create
                </button>
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
                description: null,
                isPublic: false
            }
        },
        methods: {
            AddDeck() {
                this.$store.dispatch('CREATE_DECK', {
                    name: this.name,
                    description: this.description,
                    isPrivate: !this.isPublic
                });
            },
            GoBack() {
                this.$router.back()
            }
        }
    }
</script>

<style></style>