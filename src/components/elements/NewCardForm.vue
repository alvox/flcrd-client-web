<template>
    <form @submit.prevent="saveCard">
        <div class="flex justify-between items-center pt-4 mb-2">
            <p class="text-lg">{{ $t('add_new_card') }}</p>
            <p class="text-sm text-copy-secondary">You can add {{ cardsLeft }} more
                {{ cardsLeft === 1 ? 'card' : 'cards' }}.
            </p>
        </div>

        <div class="md:flex h-40 shadow-md">
            <div class="flex-1 h-full">

                <label class="block text-gray-500 text-sm font-bold hidden" for="front">Front side</label>
                <div class="bg-white h-full" v-if="frontImage != null">
                    <img :src="frontText" alt="front" class="h-full w-full object-contain object-center"/>
                </div>
                <div v-else class="h-full">
                    <textarea
                        class="h-full front appearance-none outline-none focus:outline-none resize-none py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight"
                        id="front" :placeholder="$t('front_side')" v-model.trim.lazy="$v.frontText.$model"
                        :class="{ 'border-red-400': $v.frontText.$error }"></textarea>
                </div>
                <p class="error-msg" v-if="$v.frontText.$error && !$v.frontText.required">
                    {{ $t('err_card_front_empty') }}</p>
                <p class="error-msg" v-if="!$v.frontText.maxLength">{{ $t('err_card_length') }}</p>
            </div>

            <div class="bg-white w-1 border-2 border-dashed card-divider"></div>

            <div class="flex-1">
                <label class="block text-gray-500 text-sm font-bold hidden" for="rear">Rear side</label>
                <div class="bg-white h-full" v-if="rearImage != null">
                    <img :src="rearText" alt="rear" class="h-full w-full object-contain object-center"/>
                </div>
                <div v-else class="h-full">
                    <textarea
                        class="h-full appearance-none outline-none focus:outline-none resize-none py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight"
                        id="rear" :placeholder="$t('rear_side')" v-model.trim.lazy="$v.rearText.$model"
                        :class="{ 'border-red-400': $v.rearText.$error }"></textarea>
                </div>
                <p class="error-msg" v-if="$v.rearText.$error && !$v.rearText.required">
                    {{ $t('err_card_rear_empty') }}</p>
                <p class="error-msg" v-if="!$v.rearText.maxLength">{{ $t('err_card_length') }}</p>
            </div>
        </div>

        <!--        image buttons-->
        <div class="flex justify-around mt-2">
            <input type="file" style="display:none" @change="fileSelected($event, 'front')" ref="frontFileInput">
            <button v-if="frontImage == null" class="underline" @click="$refs.frontFileInput.click()">Pick image</button>
            <button v-else class="underline" @click="clearImage('front')">Remove image</button>

            <input type="file" style="display:none" @change="fileSelected($event, 'rear')" ref="rearFileInput">
            <button v-if="rearImage == null" class="underline" @click="$refs.rearFileInput.click()">Pick image</button>
            <button v-else class="underline" @click="clearImage('rear')">Remove image</button>
        </div>

        <div class="flex justify-end items-center mt-2">
            <NavButton :title="$t('save')"></NavButton>
        </div>
    </form>
</template>

<script>
import {required, maxLength} from "vuelidate/lib/validators"
import NavButton from "@/components/NavButton";

export default {
    name: "NewCardForm",
    components: {NavButton},
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
                deck_id: this.deckId,
                front: this.frontText,
                frontImage: this.frontImage,
                rear: this.rearText,
                rearImage: this.rearImage
            });
            this.frontText = ""
            this.frontImage = null
            this.rearText = ""
            this.rearImage = null
            this.$v.$reset()
        }
    },
    computed: {
        deckId() {
            return this.$store.getters.currentDeckId
        },
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
