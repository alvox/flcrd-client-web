<template>
    <div>
        <BackButton @goBack="goBack"></BackButton>
        <div class="mx-auto max-w-2xl min-w-2xl bg-background-secondary rounded-lg mt-10 md:mt-0">
            <!--HEADER-->
            <div class="border-2 border-border-primary rounded-t-lg">
                <p class="section-header">{{ $t('edit_flashcard') }}</p>
            </div>
            <!--FORM-->
            <form class="border-2 border-border-primary rounded-b-lg border-t-0 block" autocomplete="off"
                  @submit.prevent="updateCard">
                <div class="md:flex p-4">

                    <!--FRONT-->
                    <div class="flex-1 md:mr-2">
                        <label class="block text-gray-500 text-sm font-bold hidden" for="front">Front side</label>
                        <div class="h-56">
                            <div class="h-full" v-if="frontImage != null || frontText.startsWith('http')">
                                <img :src="frontText" alt="front" class="h-full w-full object-contain object-center"/>
                            </div>
                            <div v-else class="h-full">
                                <textarea
                                    class="h-full front appearance-none outline-none focus:outline-none resize-none border-2 border-border-primary rounded-lg py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight focus:border-purple-400"
                                    id="front" :placeholder="$t('front_side')" v-model.trim.lazy="$v.frontText.$model"
                                    :class="{ 'border-red-400': $v.frontText.$error }">
                                </textarea>
                            </div>
                        </div>
                        <input type="file" style="display:none" @change="imageSelected($event, 'front')"
                               ref="frontFileInputt">
                        <div class="flex justify-between pt-2">
                            <button type="button" class="secondary-btn" @click="$refs.frontFileInputt.click()">Pick image</button>
                            <button type="button" class="secondary-btn" @click="clearImage('front')">Remove image</button>
                        </div>
                        <p class="error-msg" v-if="$v.frontText.$error && !$v.frontText.required">
                            {{ $t('err_card_front_empty') }}</p>
                        <p class="error-msg" v-if="!$v.frontText.maxLength">{{ $t('err_card_length') }}</p>
                    </div>

                    <!--REAR-->
                    <div class="flex-1 mt-4 md:mt-0 md:ml-2">
                        <label class="block text-gray-500 text-sm font-bold hidden" for="rear">Rear side</label>
                        <div class="h-56">
                            <div class="h-full" v-if="rearImage != null || rearText.startsWith('http')">
                                <img :src="rearText" alt="rear" class="h-full w-full object-contain object-center"/>
                            </div>
                            <div v-else class="h-full">
                                <textarea
                                    class="h-full appearance-none outline-none focus:outline-none resize-none border-2 border-border-primary rounded-lg py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight focus:border-purple-400"
                                    id="rear" :placeholder="$t('rear_side')" rows="8" v-model.trim.lazy="$v.rearText.$model"
                                    :class="{ 'border-red-400': $v.rearText.$error }"></textarea>
                            </div>
                        </div>
                        <input type="file" style="display:none" @change="imageSelected($event, 'rear')"
                               ref="rearFileInputt">
                        <div class="flex justify-between pt-2">
                            <button type="button" class="secondary-btn" @click="$refs.rearFileInputt.click()">Pick image</button>
                            <button type="button" class="secondary-btn" @click="clearImage('rear')">Remove image</button>
                        </div>
                        <p class="error-msg" v-if="$v.rearText.$error && !$v.rearText.required">
                            {{ $t('err_card_rear_empty') }}</p>
                        <p class="error-msg" v-if="!$v.rearText.maxLength">{{ $t('err_card_length') }}</p>
                    </div>

                <!--BUTTONS-->
                </div>
                <div class="flex justify-between px-4 pt-8 pb-4 items-center">
                    <p class="ml-1 tertiary-btn hover:text-gray-600"
                       @click="showModal">
                        {{ $t('delete_card') }}
                    </p>
                    <div class="flex justify-end">
                        <p class="secondary-btn mr-4 hover:border-border-s-btn-hover"
                           title="Cancel"
                           @click="goBack">{{ $t('cancel') }}</p>
                        <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                                title="Save">{{ $t('save') }}
                        </button>
                    </div>
                </div>

            </form>
            <ConfirmationModal v-show="is_confirm_visible" @close="closeModal" @confirm="deleteCard">
                <template v-slot:header>{{ $t('delete_card') }}</template>
                <template v-slot:body>{{ $t('delete_card_confirm') }}</template>
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
            frontText: "",
            frontImage: null,
            rearText: "",
            rearImage: null,
            is_confirm_visible: false
        }
    },
    props: ['deck_id', 'card_id'],
    methods: {
        imageSelected(event, side) {
            if (event.target.files.length === 0) {
                return
            }
            let file = event.target.files[0]
            if (!file.type.match("image.*")) {
                alert("choose an image pls")
                return
            }
            let size = file.size / 5000 / 5000
            if (size > 1) {
                alert("choose a smaller image pls")
                return
            }
            if (side === "front") {
                this.frontText = URL.createObjectURL(file)
                this.frontImage = file
            } else {
                this.rearText = URL.createObjectURL(file)
                this.rearImage = file
            }
        },
        clearImage(side) {
            if (side === "front") {
                this.frontText = ""
                this.frontImage = null
            } else {
                this.rearText = ""
                this.rearImage = null
            }
        },
        updateCard() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return
            }
            this.$store.dispatch('UPDATE_CARD', {
                id: this.card_id,
                deck_id: this.deck_id,
                front: this.frontText,
                rear: this.rearText
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
            this.frontText = this.card.front;
            this.rearText = this.card.rear;
        }
    },
    validations: {
        frontText: {required, maxLength: maxLength(250)},
        rearText: {required, maxLength: maxLength(250)}
    }
}
</script>
