<template>
    <Modal modalWidth="max-w-sm" @closeModal="close">
        <template v-slot:header>Edit profile</template>
        <template v-slot:body>
            <div v-if="isDeleteConfirmVisible">
                <p>Are you sure you want to delete your account and all your decks and cards?</p>
            </div>
            <div v-else>
                <div class="mt-6 block">
                    <label for="profile-name" class="block font-thin text-lg">Name</label>
                    <input type="text" id="profile-name" name="profile-name" :placeholder="$t('name_placeholder')"
                           class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                           v-model.trim.lazy="$v.name.$model"
                           :class="{ 'border-red-400': $v.name.$error }">
                    <p class="error-msg" v-if="$v.name.$error">{{ $t('invalid_name') }}</p>
                </div>
                <div class="mt-6 block">
                    <label for="profile-email" class="block font-thin text-lg">Email</label>
                    <input type="text" id="profile-email" name="profile-email" :placeholder="$t('email_placeholder')"
                           class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                           v-model.trim.lazy="$v.email.$model"
                           :class="{ 'border-red-400': $v.email.$error }">
                    <p class="error-msg" v-if="$v.email.$error || !$v.email.email">{{ $t('invalid_email') }}</p>
                </div>

                <div v-if="errorMessage !== ''">
                    <p class="error-msg text-center mt-2"> {{ errorMessage | capitalize }} </p>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div v-if="!isDeleteConfirmVisible" class="flex justify-between">
                <NavButton title="Delete my account" @clicked="isDeleteConfirmVisible = true"/>
                <NavButton title="Save" @clicked="updateUser"/>
            </div>
            <div v-else class="flex justify-between">
                <NavButton title="Cancel" @clicked="isDeleteConfirmVisible = false"/>
                <NavButton title="Delete" @clicked="deleteUser"/>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/Modal"
import NavButton from "@/components/NavButton"
import {email, maxLength, required} from "vuelidate/lib/validators";

export default {
    name: "EditProfileModal",
    components: {Modal, NavButton},
    props: ["user"],
    data() {
        return {
            name: this.user.name,
            email: this.user.email,
            isDeleteConfirmVisible: false
        }
    },
    computed: {
        errorMessage() {
            return this.$store.getters.errorMessage
        }
    },
    methods: {
        updateUser() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return
            }
            this.$store.dispatch('UPDATE_USER', {
                name: this.name,
                email: this.email
            });
        },
        deleteUser() {
            this.$store.dispatch('DELETE_USER')
            this.$store.commit('saveDecks', [])
        },
        close() {
            this.$store.commit("hideProfileModal")
        }
    },
    validations: {
        name: {required, maxLength: maxLength(50)},
        email: {required, email, maxLength: maxLength(120)},
    }
}
</script>
