<template>
    <div>
<!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex items-center my-4 cursor-pointer text-gray-700 hover:text-purple-700" @click="goBack">
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
                <p class="section-header">Edit Flashcard</p>
            </div>
<!--FORM-->
            <form class="border-2 border-gray-400 rounded-b-lg border-t-0 block" autocomplete="off"
                  @submit.prevent="updateCard">
                <div class="p-4 pt-6">
                    <label class="form-label" for="front">FRONT SIDE</label>
                    <textarea
                            class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight focus:border-purple-400"
                            id="front" placeholder="Front..." rows="5" v-model.trim.lazy="$v.front.$model"
                            :class="{ 'border-red-400': $v.front.$error }"></textarea>
                    <p class="error-msg" v-if="$v.front.$error && !$v.front.required">Card should have
                        something on the front side.</p>
                    <p class="error-msg" v-if="!$v.front.maxLength">Card side should be 250 characters
                        maximum.</p>
                </div>
                <div class="p-4 pt-6">
                    <label class="form-label" for="rear">REAR SIDE</label>
                    <textarea
                            class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-800 leading-tight focus:border-purple-400"
                            id="rear" placeholder="Rear..." rows="5" v-model.trim.lazy="$v.rear.$model"
                            :class="{ 'border-red-400': $v.rear.$error }"></textarea>
                    <p class="error-msg" v-if="$v.rear.$error && !$v.rear.required">Rear side should be in
                        place too.</p>
                    <p class="error-msg" v-if="!$v.rear.maxLength">Card side should be 250 characters
                        maximum.</p>
                </div>
                <div class="flex justify-between px-4 pt-8 pb-4">
                    <p class="py-2 ml-1 text-red-400 text-sm font-thin cursor-pointer hover:text-red-700 hover:underline"
                       @click="deleteCard">
                        Delete card
                    </p>
                    <div class="flex justify-end content-center">
                        <p class="secondary-btn mr-4 hover:text-purple-500 hover:border-purple-500"
                           title="Cancel"
                           @click="goBack">Cancel</p>
                        <button class="primary-btn hover:bg-purple-600"
                                title="Save">Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "EditFlashcard",
        data() {
            return {
                front: "",
                rear: ""
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