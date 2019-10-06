<template>
    <div class="mx-auto max-w-sm bg-background-secondary rounded-lg mt-10">
        <div class="border-2 border-border-primary rounded-t-lg">
            <p class="section-header">{{$t('login')}}</p>
        </div>
        <form class="border-2 border-border-primary rounded-b-lg border-t-0" @submit.prevent="loginUser">
            <div class="p-4 block">
                <label class="form-label" for="email">{{$t('email')}}</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="email" type="text" :placeholder="$t('email_placeholder')" v-model.trim.lazy="$v.email.$model"
                       :class="{ 'border-red-400': $v.email.$error }">
                <p class="error-msg" v-if="$v.email.$error || !$v.email.email">{{$t('invalid_email')}}</p>
            </div>
            <div class="p-4">
                <label class="form-label" for="password">{{$t('password')}}</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="password" type="password" :placeholder="$t('password_placeholder')" v-model.trim.lazy="$v.password.$model"
                       :class="{ 'border-red-400': $v.password.$error }">
                <p class="error-msg" v-if="$v.password.$error && !$v.password.required">{{$t('invalid_password')}}</p>
            </div>
            <div v-if="errorMessage !== ''">
                <p class="error-msg text-center"> {{ errorMessage | capitalize }} </p>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="secondary-btn mr-4 hover:border-border-s-btn-hover" title="Cancel"
                   @click="goBack">{{$t('cancel')}}</p>
                <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                        title="Login">{{$t('login')}}
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
                this.$router.push({name: 'Index'})
            }
        },
        validations: {
            email: {required, email},
            password: {required}
        },
        beforeDestroy() {
            this.$store.commit('clearError');
        }
    }
</script>

<style></style>