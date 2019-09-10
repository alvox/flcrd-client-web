<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">{{editMode ? 'Edit' : 'Create new'}} collection</p>
        </div>
        <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none block" autocomplete="off"
              @submit.prevent="AddDeck">
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="name">Name</label>
                <input class="appearance-none outline-none border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-400"
                       id="name" type="text" placeholder="Give it a name" v-model.trim.lazy="$v.name.$model"
                       :class="{'border-red-400': $v.name.$error}">
                <p class="text-sm text-red-400" v-if="$v.name.$error && !$v.name.required">
                    Collection should have a name.
                </p>
                <p class="text-sm text-red-400" v-if="!$v.name.maxLength">
                    Collection name should be 50 characters maximum.
                </p>
            </div>
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="description">Description</label>
                <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="description" placeholder="You can also add some brief description" rows="4"
                        v-model.trim.lazy="$v.description.$model"
                        :class="{ 'border-red-400': $v.description.$error }"></textarea>
                <p class="text-sm text-red-400" v-if="!$v.description.maxLength">
                    Description should be 250 characters maximum.
                </p>
            </div>
            <label class="block text-gray-700 font-bold pl-4">
                <input class="mr-2 leading-tight" type="checkbox" v-model="isPublic">
                <span class="text-sm">Make it public</span>
            </label>
            <div class="flex justify-between px-4 pt-8 pb-4">
                <p v-if="editMode" class="py-2 text-red-400 text-sm cursor-pointer hover:text-red-600 hover:underline" @click="deleteDeck">
                    Delete deck
                </p>
                <div v-else></div>
                <div class="flex justify-end content-center">
                    <p class="mr-4 border rounded-lg px-6 cursor-pointer py-2 text-gray-600 text-sm hover:text-purple-500 hover:border-purple-500" title="Cancel" @click="GoBack">
                        Cancel
                    </p>
                    <button class="bg-purple-500 rounded-lg py-2 px-6 text-white text-sm font-bold hover:bg-purple-600" title="Save">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "AddDeck",
        data() {
            return {
                name: "",
                description: "",
                isPublic: false
            }
        },
        methods: {
            AddDeck() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return
                }
                let payload = {
                    name: this.name,
                    description: this.description,
                    isPrivate: !this.isPublic
                };
                if (this.editMode) {
                    this.$store.dispatch('UPDATE_DECK', {
                        deck_id: this.$route.params.deck_id,
                        deck: payload,
                    })
                } else {
                    this.$store.dispatch('CREATE_DECK', payload);
                }
            },
            deleteDeck() {
                this.$store.dispatch('DELETE_DECK', {deck_id: this.deck.id})
            },
            GoBack() {
                this.$router.back()
            }
        },
        computed: {
            editMode() {
                return this.$route.params.deck_id !== "new"
            },
            deck() {
                return this.$store.getters.deck(this.$route.params.deck_id)
            }
        },
        created() {
            if (this.editMode) {
                this.name = this.deck.name;
                this.description = this.deck.description;
                this.isPublic = !this.deck.private;
            }
        },
        validations: {
            name: {required, maxLength: maxLength(50)},
            description: {maxLength: maxLength(250)}
        }
    }
</script>

<style></style>