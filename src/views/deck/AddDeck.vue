<template>
    <div>
        <BackButton @goBack="goBack"></BackButton>
        <div class="mx-auto max-w-sm bg-background-secondary rounded-lg mt-10 md:mt-0">
<!--HEADER-->
            <div class="border-2 border-border-primary rounded-t-lg">
                <p v-if="editMode" class="text-base font-extrabold m-4 pt-1 text-copy-secondary">
                    {{$t('edit_deck')}}
                </p>
                <p v-else class="text-base font-extrabold m-4 pt-1 text-copy-secondary">
                    {{$t('create_new_deck')}}
                </p>
            </div>
<!--FORM-->
            <form class="border-2 border-border-primary rounded-b-lg border-t-0 block" autocomplete="off"
                  @submit.prevent="addDeck">
                <div class="p-4 pt-6">
                    <label class="form-label" for="name">{{$t('deck_name')}}</label>
                    <input class="appearance-none outline-none border-2 border-border-primary rounded-lg w-full py-2 px-3 text-copy-secondary bg-background-ternary leading-tight focus:outline-none focus:border-purple-400"
                           id="name" type="text" :placeholder="$t('deck_name_placeholder')" v-model.trim.lazy="$v.name.$model"
                           :class="{'border-red-400': $v.name.$error}">
                    <p class="error-msg" v-if="$v.name.$error && !$v.name.required">
                        {{$t('err_deck_name_empty')}}
                    </p>
                    <p class="error-msg" v-if="!$v.name.maxLength">
                        {{$t('err_deck_name_length')}}
                    </p>
                </div>
                <div class="p-4 pt-6">
                    <label class="form-label" for="description">{{$t('deck_desc')}}</label>
                    <textarea
                            class="appearance-none outline-none focus:outline-none resize-y border-2 border-border-primary rounded-lg py-2 px-3 w-full text-copy-secondary bg-background-ternary leading-tight focus:border-purple-400"
                            id="description" :placeholder="$t('deck_desc_placeholder')" rows="4"
                            v-model.trim.lazy="$v.description.$model"
                            :class="{ 'border-red-400': $v.description.$error }"></textarea>
                    <p class="error-msg" v-if="!$v.description.maxLength">
                        {{$t('err_deck_desc_length')}}
                    </p>
                </div>
                <label class="block text-copy-secondary font-bold pl-4">
                    <input class="mr-2 ml-1 leading-tight" type="checkbox" v-model="is_public">
                    <span class="text-xs font-bold uppercase">{{$t('make_it_public')}}</span>
                </label>
                <div v-if="errorMessage !== ''">
                    <p class="error-msg text-center mt-4"> {{ errorMessage | capitalize }} </p>
                </div>
                <div class="flex justify-between items-center px-4 pt-8 pb-4">
                    <p v-if="editMode"
                       class="tertiary-btn hover:text-gray-600"
                       @click="showModal">
                        {{$t('delete_deck')}}
                    </p>
                    <div v-else></div>
                    <div class="flex justify-end">
                        <p class="secondary-btn mr-4 hover:border-border-s-btn-hover"
                           title="Cancel" @click="goBack">
                            {{$t('cancel')}}
                        </p>
                        <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                                title="Save">
                            {{$t('save')}}
                        </button>
                    </div>
                </div>
            </form>
            <ConfirmationModal v-show="is_confirm_visible" @close="closeModal" @confirm="deleteDeck">
                <template v-slot:header>{{$t('delete_deck')}}</template>
                <template v-slot:body>{{$t('delete_deck_confirm')}}</template>
            </ConfirmationModal>
        </div>
    </div>
</template>

<script>
    import {required, maxLength} from "vuelidate/lib/validators"
    import ConfirmationModal from "@/components/ConfirmationModal"
    import BackButton from "@/components/BackButton"

    export default {
        name: "AddDeck",
        components: {
            ConfirmationModal, BackButton
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
                return this.$store.getters.deck(this.$store.getters.currentDeckId)
            },
            errorMessage() {
                return this.$store.getters.errorMessage
            },
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
        beforeDestroy() {
            this.$store.commit('clearError');
        },
        validations: {
            name: {required, maxLength: maxLength(50)},
            description: {maxLength: maxLength(250)}
        }
    }
</script>

<style></style>
