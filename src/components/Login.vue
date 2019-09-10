<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">Log in</p>
        </div>
        <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none" @submit.prevent="loginUser">
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input class="appearance-none outline-none border-gray-400 border-2 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-400"
                       id="email" type="text" placeholder="Your email" v-model.trim.lazy="$v.email.$model"
                       :class="{ 'border-red-400': $v.email.$error }">
                <p class="text-sm text-red-400" v-if="$v.email.$error || !$v.email.email">Please, enter valid email
                    address.</p>
            </div>
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input class="appearance-none outline-none border-gray-400 border-2 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-400"
                       id="password" type="password" placeholder="And password" v-model.trim.lazy="$v.password.$model"
                       :class="{ 'border-red-400': $v.password.$error }">
                <p class="text-sm text-red-400" v-if="$v.password.$error && !$v.password.required">Please, enter your
                    password.</p>
            </div>
            <div v-if="errorMessage !== ''">
                <p class="text-sm text-red-400 text-center"> {{ errorMessage | capitalize }} </p>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="mr-4 cursor-pointer py-2 text-gray-600 text-sm hover:text-red-500" title="Cancel"
                   @click="goBack">Cancel</p>
                <button class="border rounded-lg py-2 px-6 text-gray-700 text-sm font-bold hover:text-purple-600 hover:border-purple-600"
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