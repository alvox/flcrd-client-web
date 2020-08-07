<template>
    <form @submit.prevent="saveCard">
        <p class="font-bold px-5 pt-4 text-copy-secondary text-xs uppercase">{{ $t('add_new_card') }}</p>
        <div class="md:flex">
            <div class="flex-1 m-2 mx-4 md:mr-2">
                <label class="block text-gray-500 text-sm font-bold hidden" for="front">Front side</label>
                <div class="pb-2" v-if="frontImage != null">
                    <img :src="frontText" alt="front" class="rounded"/>
                </div>
                <div v-else>
                    <textarea
                        class="front appearance-none outline-none focus:outline-none resize-y border-2 border-border-primary rounded-lg py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight focus:border-purple-400"
                        id="front" :placeholder="$t('front_side')" rows="4" v-model.trim.lazy="$v.frontText.$model"
                        :class="{ 'border-red-400': $v.frontText.$error }"></textarea>
                </div>
                <input type="file" style="display:none" @change="fileSelected($event, 'front')" ref="frontFileInput">
                <div class="flex justify-between">
                    <button class="secondary-btn" @click="$refs.frontFileInput.click()">Pick image</button>
                    <button class="secondary-btn" @click="clearImage('front')">Remove image</button>
                </div>
                <p class="error-msg" v-if="$v.frontText.$error && !$v.frontText.required">
                    {{ $t('err_card_front_empty') }}</p>
                <p class="error-msg" v-if="!$v.frontText.maxLength">{{ $t('err_card_length') }}</p>
            </div>
            <div class="flex-1 m-2 mx-4 md:ml-2">
                <label class="block text-gray-500 text-sm font-bold hidden" for="rear">Rear side</label>
                <div class="pb-2" v-if="rearImage != null">
                    <img :src="rearText" alt="rear" class="rounded"/>
                </div>
                <div v-else>
                    <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 border-border-primary rounded-lg py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight focus:border-purple-400"
                        id="rear" :placeholder="$t('rear_side')" rows="4" v-model.trim.lazy="$v.rearText.$model"
                        :class="{ 'border-red-400': $v.rearText.$error }"></textarea>
                </div>
                <input type="file" style="display:none" @change="fileSelected($event, 'rear')" ref="rearFileInput">
                <div class="flex justify-between">
                    <button class="secondary-btn" @click="$refs.rearFileInput.click()">Pick image</button>
                    <button class="secondary-btn" @click="clearImage('rear')">Remove image</button>
                </div>
                <p class="error-msg" v-if="$v.rearText.$error && !$v.rearText.required">
                    {{ $t('err_card_rear_empty') }}</p>
                <p class="error-msg" v-if="!$v.rearText.maxLength">{{ $t('err_card_length') }}</p>
            </div>
        </div>
        <div class="flex justify-between items-center pr-4 pl-5 pb-4">
            <p class="text-sm text-copy-secondary">You can add {{ cardsLeft }} more
                {{ cardsLeft === 1 ? 'card' : 'cards' }}.</p>
            <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                    title="Create card">
                {{ $t('save') }}
            </button>
        </div>
    </form>
</template>

<script>
import {required, maxLength} from "vuelidate/lib/validators"

export default {
    name: "NewCardForm",
    props: ['deckId'],
    data() {
        return {
            frontText: "",
            frontImage: null,
            rearText: "",
            rearImage: null
        }
    },
    methods: {
        fileSelected(event, side) {
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
        saveCard() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return
            }
            this.$store.dispatch('CREATE_CARD', {
                deck_id: this.$route.params.deck_id,
                front: this.frontText,
                rear: this.rearText
            });
            this.frontText = ""
            this.frontImage = null
            this.rearText = ""
            this.rearImage = null
            this.$v.$reset()
        }
    },
    computed: {
        deck() {
            return this.$store.getters.deck(this.deckId)
        },
        cardsLeft() {
            if (!this.deck.cards) {
                return 100
            }
            return 100 - this.deck.cards.length
        }
    },
    validations: {
        frontText: {required, maxLength: maxLength(250)},
        rearText: {required, maxLength: maxLength(250)}
    }
}
</script>
