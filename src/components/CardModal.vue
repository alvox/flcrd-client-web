<template>
    <Modal modalWidth="max-w-2xl" @closeModal="close">
        <template v-slot:header>
            {{ $t('edit_flashcard') }}
        </template>
        <template v-slot:body>
            <div class="sm:flex sm:h-40 shadow-md">
                <div class="flex-1 h-40">

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

                <div class="bg-white sm:w-1 border-2 border-dashed border-gray-500"></div>

                <div class="flex-1 h-40">
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


        </template>
        <template v-slot:footer>
            <div v-if="!isDeleteConfirmVisible" class="flex justify-between">
                <NavButton title="Delete" @clicked="isDeleteConfirmVisible = true"/>
                <NavButton title="Save" @clicked="saveCard"/>
            </div>
            <div v-else class="flex justify-between">
                <NavButton title="Cancel" @clicked="isDeleteConfirmVisible = false"/>
                <NavButton title="Delete" @clicked="deleteCard"/>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/Modal"
import NavButton from "@/components/NavButton"
import {maxLength, required} from "vuelidate/lib/validators";

export default {
    name: "CardModal",
    components: { Modal, NavButton },
    data() {
        return {
            frontText: "",
            frontImage: null,
            frontType: "",
            rearText: "",
            rearImage: null,
            rearType: "",
            isDeleteConfirmVisible: false,
            s3: process.env.VUE_APP_S3_URL
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
            this.$store.dispatch('UPDATE_CARD', {
                id: this.card.id,
                deck_id: this.card.deck_id,
                front: this.frontText,
                frontImage: this.frontImage,
                rear: this.rearText,
                rearImage: this.rearImage
            })
        },
        deleteCard() {
            this.$store.dispatch('DELETE_CARD', {
                deck_id: this.card.deck_id,
                card_id: this.card.id
            })
        },
        close() {
            this.$store.commit('clearError')
            this.$store.commit('hideCardModal')
            this.$v.$reset()
        }
    },
    computed: {
        card() {
            return this.$store.getters.currentCard
        }
    },
    validations: {
        frontText: {required, maxLength: maxLength(250)},
        rearText: {required, maxLength: maxLength(250)}
    },
    created() {
        if (this.card == null) {
            this.close()
        } else {
            this.frontText = this.card.front
            this.frontType = this.card.front_type
            this.rearText = this.card.rear
            this.rearType = this.card.rear_type
        }
    }
}
</script>
