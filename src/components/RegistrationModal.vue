<template>
    <Modal modalWidth="max-w-sm" @closeModal="close">
        <template v-slot:header>REGISTRATION</template>
        <template v-slot:body>

            <div class="mt-6 block">
                <label for="reg-name" class="block font-thin text-lg">Name</label>
                <input type="text" id="reg-name" name="email" :placeholder="$t('name_placeholder')"
                       class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                       v-model.trim.lazy="$v.name.$model"
                       :class="{ 'border-red-400': $v.name.$error }">
                <p class="error-msg" v-if="$v.name.$error && !$v.name.required">Please, enter your name.</p>
                <p class="error-msg" v-if="!$v.name.maxLength">Name should be 50 characters maximum.</p>
            </div>

            <div class="mt-6 block">
                <label for="reg-email" class="block font-thin text-lg">Email</label>
                <input type="text" id="reg-email" name="email" :placeholder="$t('email_placeholder')"
                       class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                       v-model.trim.lazy="$v.email.$model"
                       :class="{ 'border-red-400': $v.email.$error }">
                <p class="error-msg" v-if="$v.email.$error || !$v.email.email">Please, enter valid email address.</p>
            </div>

            <div class="mt-6 block">
                <label for="reg-password" class="block font-thin text-lg">Password</label>
                <input type="password" id="reg-password" name="password" :placeholder="$t('password_placeholder')"
                       class="border border-gray-500 appearance-none outline-none w-full h-10 px-2"
                       v-model.trim.lazy="$v.password.$model"
                       :class="{ 'border-red-400': $v.password.$error }">
                <p class="error-msg" v-if="$v.password.$error && !$v.password.required">Please, enter your password.</p>
                <p class="error-msg" v-if="!$v.password.minLength || !$v.password.maxLength">Password should be 5 to 30 characters long.</p>
            </div>

            <div class="mt-6">
                <label class="block text-copy-secondary font-bold">
                    <input class="mr-2 ml-1 leading-tight" type="checkbox" v-model.lazy="$v.consent.$model">
                    <span class="font-thin">{{$t('consent_1')}} <span class="underline cursor-pointer" @click="goToTerms">{{$t('consent_2')}}</span>.</span>
                </label>
                <p class="error-msg" v-if="$v.consent.$error">Sorry, but you must agree with them.</p>
            </div>

            <div v-if="errorMessage !== ''">
                <p class="error-msg text-center mt-2"> {{ errorMessage | capitalize }} </p>
            </div>
        </template>
        <template v-slot:footer>
            <div class="flex justify-end">
                <NavButton title="Register" @clicked="registerUser"/>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/Modal"
import NavButton from "@/components/NavButton"
import {email, maxLength, minLength, required, sameAs} from "vuelidate/lib/validators"
export default {
    name: "RegistrationModal",
    components: {Modal, NavButton},
    data() {
        return {
            name: "",
            email: "",
            password: "",
            consent: false
        }
    },
    methods: {
        registerUser() {
            this.$v.$touch();
            if(this.$v.$invalid) {
                return
            }
            this.$store.dispatch('REGISTER_USER', {
                name: this.name,
                email: this.email,
                password: this.password
            });
        },
        close() {
            this.name = ""
            this.email = ""
            this.password = ""
            this.consent = false
            this.$store.commit('clearError')
            this.$store.commit('hideRegistrationModal')
            this.$v.$reset()
        },
        goToTerms() {
            this.password = ""
            this.consent = false
            this.$store.commit('hideRegistrationModal')
            this.$v.$reset()
            this.$router.push({name: 'Terms'})
        }
    },
    computed: {
        errorMessage() {
            return this.$store.getters.errorMessage
        },
    },
    validations: {
        name: {required, maxLength: maxLength(50)},
        email: {required, email, maxLength: maxLength(120)},
        password: {required, minLength: minLength(5), maxLength: maxLength(30)},
        consent: {sameAs: sameAs(() => true)}
    }
}
</script>
