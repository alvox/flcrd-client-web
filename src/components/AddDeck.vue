<template>
    <div>
<!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex items-center my-4 cursor-pointer text-gray-700 hover:text-gray-600" @click="goBack">
                <svg class="fill-current inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
                </svg>
                <p class="font-thin ml-2">Back</p>
            </div>
        </div>
        <div class="mx-auto max-w-sm bg-white rounded-lg mt-10 md:mt-0">
<!--HEADER-->
            <div class="border-2 border-gray-400 rounded-t-lg">
                <p class="text-base font-extrabold m-4 pt-1 text-gray-800">{{editMode ? 'Edit' : 'Create new'}}
                    deck
                </p>
            </div>
<!--FORM-->
            <form class="border-2 border-gray-400 rounded-b-lg border-t-0 block" autocomplete="off"
                  @submit.prevent="addDeck">
                <div class="p-4 pt-6">
                    <label class="form-label" for="name">NAME</label>
                    <input class="appearance-none outline-none border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-purple-400"
                           id="name" type="text" placeholder="Give it a name" v-model.trim.lazy="$v.name.$model"
                           :class="{'border-red-400': $v.name.$error}">
                    <p class="error-msg" v-if="$v.name.$error && !$v.name.required">
                        Collection should have a name.
                    </p>
                    <p class="error-msg" v-if="!$v.name.maxLength">
                        Collection name should be 50 characters maximum.
                    </p>
                </div>
                <div class="p-4 pt-6">
                    <label class="form-label" for="description">DESCRIPTION (optional)</label>
                    <textarea
                            class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight focus:border-purple-400"
                            id="description" placeholder="You can also add some brief description" rows="4"
                            v-model.trim.lazy="$v.description.$model"
                            :class="{ 'border-red-400': $v.description.$error }"></textarea>
                    <p class="error-msg" v-if="!$v.description.maxLength">
                        Description should be 250 characters maximum.
                    </p>
                </div>
                <label class="block text-gray-700 font-bold pl-4">
                    <input class="mr-2 ml-1 leading-tight" type="checkbox" v-model="is_public">
                    <span class="text-xs font-bold">MAKE IT PUBLIC</span>
                </label>
                <div class="flex justify-between items-center px-4 pt-8 pb-4">
                    <p v-if="editMode"
                       class="tertiary-btn hover:text-gray-600"
                       @click="showModal">
                        Delete deck
                    </p>
                    <div v-else></div>
                    <div class="flex justify-end">
                        <p class="secondary-btn mr-4 hover:text-gray-600 hover:border-gray-600"
                           title="Cancel" @click="goBack">
                            Cancel
                        </p>
                        <button class="primary-btn hover:bg-gray-600"
                                title="Save">
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <ConfirmationModal v-show="is_confirm_visible" @close="closeModal" @confirm="deleteDeck"></ConfirmationModal>
        </div>
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators'
    import ConfirmationModal from './ConfirmationModal'

    export default {
        name: "AddDeck",
        components: {
            ConfirmationModal
        },
        data() {
            return {
                name: "",
                description: "",
                is_public: false,
                is_confirm_visible: false
            }
        },
        methods: {
            addDeck() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return
                }
                let payload = {
                    name: this.name,
                    description: this.description,
                    is_public: this.is_public
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
            goBack() {
                this.$router.back()
            },
            showModal() {
                this.is_confirm_visible = true;
            },
            closeModal() {
                this.is_confirm_visible = false;
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
                if (!this.deck) {
                    this.$router.back()
                }
                this.name = this.deck.name;
                this.description = this.deck.description;
                this.is_public = this.deck.public;
            }
        },
        validations: {
            name: {required, maxLength: maxLength(50)},
            description: {maxLength: maxLength(250)}
        }
    }
</script>

<style></style>