<template>
    <Modal modalWidth="max-w-sm" @closeModal="close">
        <template v-slot:header>LOGIN</template>
        <template v-slot:body>
            <div class="mt-6 block">
                <label for="login-email" class="block font-thin text-lg">Email</label>
                <input type="text" id="login-email" name="email" :placeholder="$t('email_placeholder')"
                       class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                       v-model.trim.lazy="$v.email.$model"
                       :class="{ 'border-red-400': $v.email.$error }">
                <p class="error-msg" v-if="$v.email.$error || !$v.email.email">{{$t('invalid_email')}}</p>
            </div>

            <div class="mt-6 block">
                <label for="login-password" class="block font-thin text-lg">Password</label>
                <input type="password" id="login-password" name="password" :placeholder="$t('password_placeholder')"
                       class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                       v-model.trim.lazy="$v.password.$model"
                       :class="{ 'border-red-400': $v.password.$error }">
                <p class="error-msg" v-if="$v.password.$error && !$v.password.required">{{$t('invalid_password')}}</p>
            </div>
            <div v-if="errorMessage !== ''">
                <p class="error-msg text-center mt-2"> {{ errorMessage | capitalize }} </p>
            </div>
        </template>
        <template v-slot:footer>
            <div class="flex justify-end">
                <NavButton title="Login" @clicked="loginUser"/>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/Modal"
import NavButton from "@/components/NavButton"
import {email, required} from "vuelidate/lib/validators"

export default {
    name: "LoginModal",
    components: {Modal, NavButton},
    data() {
        return {
            email: "",
            password: "",
        }
    },
    computed: {
        errorMessage() {
            return this.$store.getters.errorMessage
        },
    },
    methods: {
        loginUser() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return
            }
            this.$store.dispatch('LOGIN_USER', {
                email: this.email,
                password: this.password
            })
        },
        close() {
            this.email = ""
            this.password = ""
            this.$store.commit('clearError')
            this.$store.commit('hideLoginModal')
            this.$v.$reset()
        }
    },
    validations: {
        email: {required, email},
        password: {required}
    }
}
</script>
