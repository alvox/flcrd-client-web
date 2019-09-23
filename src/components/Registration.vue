<template>
    <div class="mx-auto max-w-sm bg-background-secondary rounded-lg mt-10">
        <div class="border-2 border-border-primary rounded-t-lg">
            <p class="section-header">Register</p>
        </div>
        <form class="border-2 border-border-primary rounded-b-lg border-t-0" autocomplete="off"
              @submit.prevent="registerUser">
            <div class="p-4 pt-6">
                <label class="form-label" for="name">NAME</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="name" type="text" placeholder="How you want us to call you" v-model.trim.lazy="$v.name.$model" :class="{ 'border-red-400': $v.name.$error }">
                <p class="error-msg" v-if="$v.name.$error && !$v.name.required">Please, enter your name.</p>
                <p class="error-msg" v-if="!$v.name.maxLength">Name should be 50 characters maximum.</p>
            </div>
            <div class="p-4 pt-6">
                <label class="form-label" for="email">EMAIL</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="email" type="text" placeholder="Your email" v-model.trim.lazy="$v.email.$model" :class="{ 'border-red-400': $v.email.$error }">
                <p class="error-msg" v-if="$v.email.$error || !$v.email.email">Please, enter valid email
                    address.</p>
            </div>
            <div class="p-4 pt-6">
                <label class="form-label" for="password">PASSWORD</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="password" type="password" placeholder="Create a password" v-model.trim.lazy="$v.password.$model" :class="{ 'border-red-400': $v.password.$error }">
                <p class="error-msg" v-if="$v.password.$error && !$v.password.required">Please, enter your
                    password.</p>
                <p class="error-msg" v-if="!$v.password.minLength || !$v.password.maxLength">Password should be 5 to 30 characters long.</p>
            </div>
            <div v-if="errorMessage !== ''">
                <p class="error-msg text-center"> {{ errorMessage | capitalize }} </p>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="secondary-btn mr-4 hover:text-gray-600 hover:border-gray-600" title="Cancel"
                   @click="goBack">Cancel</p>
                <button class="primary-btn-outline hover:text-copy-secondary hover:bg-background-ternary"
                        title="Register">Register
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, email, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "Registration",
        data() {
            return {
                name: "",
                email: "",
                password: ""
            }
        },
        computed: {
            errorMessage() {
                return this.$store.getters.errorMessage
            },
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
            goBack() {
                this.$store.commit('authCancel');
                this.$router.push({name: 'Index'})
            }
        },
        validations: {
            name: {required, maxLength: maxLength(50)},
            email: {required, email, maxLength: maxLength(120)},
            password: {required, minLength: minLength(5), maxLength: maxLength(30)}
        }
    }
</script>

<style></style>