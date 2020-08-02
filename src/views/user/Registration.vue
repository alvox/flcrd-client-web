<template>
    <div class="mx-auto max-w-sm bg-background-secondary rounded-lg mt-10">
        <div class="border-2 border-border-primary rounded-t-lg">
            <p class="section-header">{{$t('register')}}</p>
        </div>
        <form class="border-2 border-border-primary rounded-b-lg border-t-0" autocomplete="off"
              @submit.prevent="registerUser">
            <div class="p-4">
                <label class="form-label" for="name">{{$t('name')}}</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="name" type="text" :placeholder="$t('name_placeholder')" v-model.trim.lazy="$v.name.$model" :class="{ 'border-red-400': $v.name.$error }">
                <p class="error-msg" v-if="$v.name.$error && !$v.name.required">Please, enter your name.</p>
                <p class="error-msg" v-if="!$v.name.maxLength">Name should be 50 characters maximum.</p>
            </div>
            <div class="p-4">
                <label class="form-label" for="email">{{$t('email')}}</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="email" type="text" :placeholder="$t('email_placeholder')" v-model.trim.lazy="$v.email.$model" :class="{ 'border-red-400': $v.email.$error }">
                <p class="error-msg" v-if="$v.email.$error || !$v.email.email">Please, enter valid email
                    address.</p>
            </div>
            <div class="p-4">
                <label class="form-label" for="password">{{$t('password')}}</label>
                <input class="form-field focus:outline-none focus:border-purple-400"
                       id="password" type="password" :placeholder="$t('password_placeholder')" v-model.trim.lazy="$v.password.$model" :class="{ 'border-red-400': $v.password.$error }">
                <p class="error-msg" v-if="$v.password.$error && !$v.password.required">Please, enter your
                    password.</p>
                <p class="error-msg" v-if="!$v.password.minLength || !$v.password.maxLength">Password should be 5 to 30 characters long.</p>
            </div>
            <div class="p-4">
                <label class="block text-copy-secondary font-bold">
                    <input class="mr-2 ml-1 leading-tight" type="checkbox" v-model.lazy="$v.consent.$model">
                    <span class="font-thin">{{$t('consent_1')}} <router-link class="underline" :to="{name: 'Terms', params: {reg_name: name, reg_email: email}}">{{$t('consent_2')}}</router-link>.</span>
                </label>
                <p class="error-msg" v-if="$v.consent.$error">Sorry, but you must agree with them.</p>
            </div>
            <div v-if="errorMessage !== ''">
                <p class="error-msg text-center"> {{ errorMessage | capitalize }} </p>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="secondary-btn mr-4 hover:border-border-s-btn-hover" title="Cancel"
                   @click="goBack">{{$t('cancel')}}</p>
                <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                        title="Register">{{$t('register')}}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, email, minLength, maxLength, sameAs} from "vuelidate/lib/validators"

    export default {
        name: "Registration",
        props: ['reg_name', 'reg_email'],
        data() {
            return {
                name: "",
                email: "",
                password: "",
                consent: false
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
                this.$router.push({name: 'Index'})
            }
        },
        validations: {
            name: {required, maxLength: maxLength(50)},
            email: {required, email, maxLength: maxLength(120)},
            password: {required, minLength: minLength(5), maxLength: maxLength(30)},
            consent: {sameAs: sameAs(() => true)}
        },
        created() {
            this.name = this.reg_name;
            this.email = this.reg_email;
        },
        beforeDestroy() {
            this.$store.commit('clearError');
        }
    }
</script>

<style></style>