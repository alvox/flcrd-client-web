<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-t-lg">
            <p class="section-header">Log in</p>
        </div>
        <form class="border-2 border-gray-400 rounded-b-lg border-t-0" @submit.prevent="loginUser">
            <div class="p-4 pt-6 block">
                <label class="form-label" for="email">EMAIL</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="email" type="text" placeholder="Your email" v-model.trim.lazy="$v.email.$model"
                       :class="{ 'border-red-400': $v.email.$error }">
                <p class="error-msg" v-if="$v.email.$error || !$v.email.email">Please, enter valid email
                    address.</p>
            </div>
            <div class="p-4 pt-6">
                <label class="form-label" for="password">PASSWORD</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="password" type="password" placeholder="And password" v-model.trim.lazy="$v.password.$model"
                       :class="{ 'border-red-400': $v.password.$error }">
                <p class="error-msg" v-if="$v.password.$error && !$v.password.required">Please, enter your
                    password.</p>
            </div>
            <div v-if="errorMessage !== ''">
                <p class="error-msg text-center"> {{ errorMessage | capitalize }} </p>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="secondary-btn mr-4 hover:text-purple-500 hover:border-purple-500" title="Cancel"
                   @click="goBack">Cancel</p>
                <button class="primary-btn hover:bg-purple-700"
                        title="Login">Log in
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, email} from 'vuelidate/lib/validators'

    export default {
        name: "Login",
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
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return
                }
                this.$store.dispatch('LOGIN_USER', {
                    email: this.email,
                    password: this.password
                });
            },
            goBack() {
                this.$store.commit('authCancel');
                this.$router.back()
            }
        },
        validations: {
            email: {required, email},
            password: {required}
        }
    }
</script>

<style></style>