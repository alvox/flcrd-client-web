<template>
    <Modal modalWidth="max-w-sm">
        <template v-slot:header>
            <p v-if="mode === 'edit'">
                {{$t('edit_deck')}}
            </p>
            <p v-else>
                {{$t('create_new_deck')}}
            </p>
        </template>
        <template v-slot:body>
            <div v-if="!isDeleteConfirmVisible">
                <div class="mt-6 block">
                    <label for="deck-name" class="block font-thin text-lg">{{$t('deck_name')}}</label>
                    <input type="text" id="deck-name" name="deck-name" :placeholder="$t('deck_name_placeholder')"
                           class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                           v-model.trim.lazy="$v.name.$model"
                           :class="{ 'border-red-400': $v.name.$error }">
                    <p class="error-msg" v-if="$v.name.$error && !$v.name.required">{{$t('err_deck_name_empty')}}</p>
                    <p class="error-msg" v-if="!$v.name.maxLength">{{$t('err_deck_name_length')}}</p>
                </div>

                <div class="mt-6 block">
                    <label for="deck-desc" class="block font-thin text-lg">{{$t('deck_desc')}}</label>
                    <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border border-gray-500 py-2 px-3 w-full text-copy-secondary leading-tight"
                        id="deck-desc" :placeholder="$t('deck_desc_placeholder')" rows="4"
                        v-model.trim.lazy="$v.description.$model"
                        :class="{ 'border-red-400': $v.description.$error }">
                    </textarea>
                    <p class="error-msg" v-if="!$v.description.maxLength">{{$t('err_deck_desc_length')}}</p>
                </div>

                <div v-if="errorMessage !== ''">
                    <p class="error-msg text-center mt-2"> {{ errorMessage | capitalize }} </p>
                </div>
            </div>
            <div v-else>
                {{$t('delete_deck_confirm')}}
            </div>
        </template>
        <template v-slot:footer>
            <div v-if="!isDeleteConfirmVisible" class="flex justify-between">
                <NavButton title="Delete" @clicked="isDeleteConfirmVisible = true"/>
                <NavButton title="Cancel" @clicked="close"/>
                <NavButton title="Save" @clicked="saveDeck"/>
            </div>
            <div v-else class="flex justify-between">
                <NavButton title="Cancel" @clicked="isDeleteConfirmVisible = false"/>
                <NavButton title="Delete" @clicked="deleteDeck"/>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/Modal"
import NavButton from "@/components/NavButton"
import {required, maxLength} from "vuelidate/lib/validators"

export default {
    name: "DeckModal",
    components: {Modal, NavButton},
    props: ["mode"],
    data() {
        return {
            name: "",
            description: "",
            isDeleteConfirmVisible: false
        }
    },
    methods: {
        saveDeck() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return
            }
            let payload = {
                name: this.name,
                description: this.description
            }
            if (this.mode === "edit") {
                this.$store.dispatch('UPDATE_DECK', {
                    deck_id: this.deck.id,
                    deck: payload,
                })
            } else {
                this.$store.dispatch('CREATE_DECK', payload)
            }
        },
        deleteDeck() {
            this.$store.dispatch('DELETE_DECK', {deck_id: this.deck.id})
        },
        close() {
            this.$store.commit('clearError')
            this.$store.commit('hideDeckModal')
            this.$store.commit('hideDeckEditModal')
            this.$v.$reset()
        }
    },
    computed: {
        deck() {
            return this.$store.getters.deck(this.$store.getters.currentDeckId)
        },
        errorMessage() {
            return this.$store.getters.errorMessage
        }
    },
    validations: {
        name: {required, maxLength: maxLength(50)},
        description: {maxLength: maxLength(250)}
    },
    created() {
        if (this.mode === "edit") {
            if (!this.deck) {
                this.close()
            }
            this.name = this.deck.name
            this.description = this.deck.description
        }
    }
}
</script>
