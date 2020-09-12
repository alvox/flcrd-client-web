<template>
    <Modal>
        <template v-slot:header>
            {{ $t('edit_flashcard') }}
        </template>
        <template v-slot:body>

        </template>
        <template v-slot:footer>
            <div v-if="!isDeleteConfirmVisible" class="flex justify-between">
                <NavButton title="Delete" @clicked="isDeleteConfirmVisible = true"/>
                <NavButton title="Cancel" @clicked="close"/>
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
        saveCard() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return
            }
            this.$store.dispatch('UPDATE_CARD', {
                id: this.cardId,
                deck_id: this.deckId,
                front: this.frontText,
                frontImage: this.frontImage,
                rear: this.rearText,
                rearImage: this.rearImage
            })
        },
        deleteCard() {
            this.$store.dispatch('DELETE_CARD', {
                deck_id: this.deckId,
                card_id: this.cardId
            })
        },
        close() {
            this.$store.commit('clearError')
            this.$store.commit('hideCardModal')
            this.$v.$reset()
        }
    }
}
</script>
