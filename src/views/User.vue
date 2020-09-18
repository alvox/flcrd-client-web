<template>
    <div class="mt-6">
        <Spinner v-if="isLoading"/>
        <div v-else>
            <div class="flex justify-between mb-6">
                <p class="text-3xl">{{ user.name }}</p>
                <p class="text-3xl">{{ user.email }}</p>
            </div>

            <div class="divider bg-gray-800 mb-6"></div>

            <div class="block md:flex justify-around items-center my-10 md:my-20">
                <div class="text-center mt-10 md:mt-0">
                    <p class="font-thin md:mb-4">You created</p>
                    <div class="flex items-center justify-center">
                        <p class="font-thin"><span class="font-black text-4xl">{{ user.stats.decks_count }}</span>
                            Decks</p>
                        <p class="text-2xl mx-4">/</p>
                        <p class="font-thin"><span class="font-black text-4xl">{{ user.stats.cards_count }}</span>
                            Cards</p>
                    </div>
                </div>
            </div>
            <div v-if="user.status === 'PENDING'" class="flex items-center justify-center">
                <svg class="text-purple-500 fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path
                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/>
                </svg>
                <p class="font-thin">
                    Please, confirm your email.
                    Click <a href="" class="underline text-blue-500" @click.prevent="resend">here</a>
                    if you didn't get verification link.
                </p>
            </div>

            <EditProfileModal v-if="profileModalVisible" :user="user"/>
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/Spinner"
import EditProfileModal from "@/components/EditProfileModal"
import {required, email, maxLength} from "vuelidate/lib/validators"

export default {
    name: "User",
    components: { Spinner, EditProfileModal },
    data() {
        return {

        }
    },
    methods: {
        resend() {
            this.$store.dispatch('RESEND_CONFIRMATION')
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters.isLoading
        },
        user() {
            return this.$store.getters.user
        },
        profileModalVisible() {
            return this.$store.getters.isProfileModalVisible
        }
    },
    created() {
        this.$store.dispatch("GET_USER")
    },
    destroyed() {
        this.$store.dispatch("CLEAR_USER")
    },
    validations: {
        name: {required, maxLength: maxLength(50)},
        email: {required, email, maxLength: maxLength(120)},
    }
}
</script>
<style>
.divider {
    height: 1px;
}
</style>
