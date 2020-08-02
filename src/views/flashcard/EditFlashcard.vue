<template>
    <div>
        <BackButton @goBack="goBack"></BackButton>
        <div class="mx-auto max-w-sm bg-background-secondary rounded-lg mt-10 md:mt-0">
<!--HEADER-->
            <div class="border-2 border-border-primary rounded-t-lg">
                <p class="section-header">{{$t('edit_flashcard')}}</p>
            </div>
<!--FORM-->
            <form class="border-2 border-border-primary rounded-b-lg border-t-0 block" autocomplete="off"
                  @submit.prevent="updateCard">
                <div class="p-4 pt-6">
                    <label class="form-label uppercase" for="front">{{$t('front_side')}}</label>
                    <textarea
                            class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-copy-secondary bg-background-ternary leading-tight focus:border-purple-400"
                            id="front" placeholder="..." rows="5" v-model.trim.lazy="$v.front.$model"
                            :class="{ 'border-red-400': $v.front.$error }"></textarea>
                    <p class="error-msg" v-if="$v.front.$error && !$v.front.required">{{$t('err_card_front_empty')}}</p>
                    <p class="error-msg" v-if="!$v.front.maxLength">{{$t('err_card_length')}}</p>
                </div>
                <div class="p-4 pt-6">
                    <label class="form-label uppercase" for="rear">{{$t('rear_side')}}</label>
                    <textarea
                            class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-copy-secondary bg-background-ternary leading-tight focus:border-purple-400"
                            id="rear" placeholder="..." rows="5" v-model.trim.lazy="$v.rear.$model"
                            :class="{ 'border-red-400': $v.rear.$error }"></textarea>
                    <p class="error-msg" v-if="$v.rear.$error && !$v.rear.required">{{$t('err_card_rear_empty')}}</p>
                    <p class="error-msg" v-if="!$v.rear.maxLength">{{$t('err_card_length')}}</p>
                </div>
                <div class="flex justify-between px-4 pt-8 pb-4 items-center">
                    <p class="ml-1 tertiary-btn hover:text-gray-600"
                       @click="showModal">
                        {{$t('delete_card')}}
                    </p>
                    <div class="flex justify-end">
                        <p class="secondary-btn mr-4 hover:border-border-s-btn-hover"
                           title="Cancel"
                           @click="goBack">{{$t('cancel')}}</p>
                        <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                                title="Save">{{$t('save')}}
                        </button>
                    </div>
                </div>
            </form>
            <ConfirmationModal v-show="is_confirm_visible" @close="closeModal" @confirm="deleteCard">
                <template v-slot:header>{{$t('delete_card')}}</template>
                <template v-slot:body>{{$t('delete_card_confirm')}}</template>
            </ConfirmationModal>
        </div>
    </div>
</template>

<script>
    import {required, maxLength} from "vuelidate/lib/validators"
    import BackButton from "@/components/BackButton"
    import ConfirmationModal from "@/components/ConfirmationModal"

    export default {
        name: "EditFlashcard",
        components: {
            BackButton,
            ConfirmationModal
        },
        data() {
            return {
                front: "",
                rear: "",
                is_confirm_visible: false
            }
        },
        props: ['deck_id', 'card_id'],
        methods: {
            updateCard() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return
                }
                this.$store.dispatch('UPDATE_CARD', {
                    id: this.card_id,
                    deck_id: this.deck_id,
                    front: this.front,
                    rear: this.rear
                })
            },
            deleteCard() {
                this.$store.dispatch('DELETE_CARD', {
                    deck_id: this.deck_id,
                    card_id: this.card_id
                })
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
            card() {
                let deck = this.$store.getters.deck(this.deck_id);
                return deck.cards.filter(c => c.id === this.card_id)[0]
            }
        },
        created() {
            let deck = this.$store.getters.deck(this.deck_id);
            if (!deck) {
                this.$router.back();
            } else {
                this.front = this.card.front;
                this.rear = this.card.rear;
            }
        },
        validations: {
            front: {required, maxLength: maxLength(250)},
            rear: {required, maxLength: maxLength(250)}
        }
    }
</script>

<style></style>
