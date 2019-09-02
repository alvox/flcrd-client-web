<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">Register</p>
        </div>
        <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none" autocomplete="off"
              @submit.prevent="RegisterUser">
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nickname</label>
                <input class="appearance-none outline-none border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-400"
                       id="name" type="text" placeholder="How you want us to call you" v-model.trim.lazy="$v.name.$model" :class="{ 'border-red-400': $v.name.$error }">
                <p class="text-sm text-red-400" v-if="$v.name.$error && !$v.name.required">Please, enter your name.</p>
                <p class="text-sm text-red-400" v-if="!$v.name.maxLength">Name should be 50 characters maximum.</p>
            </div>
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input class="appearance-none outline-none border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-400"
                       id="email" type="text" placeholder="Your email" v-model.trim.lazy="$v.email.$model" :class="{ 'border-red-400': $v.email.$error }">
                <p class="text-sm text-red-400" v-if="$v.email.$error || !$v.email.email">Please, enter valid email
                    address.</p>
            </div>
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input class="appearance-none outline-none border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-400"
                       id="password" type="password" placeholder="Create a password" v-model.trim.lazy="$v.password.$model" :class="{ 'border-red-400': $v.password.$error }">
                <p class="text-sm text-red-400" v-if="$v.password.$error && !$v.password.required">Please, enter your
                    password.</p>
                <p class="text-sm text-red-400" v-if="!$v.password.between">Password should be 5 to 30 characters long.</p>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="mr-4 cursor-pointer py-2 text-gray-600 text-sm hover:text-red-500" title="Cancel"
                   @click="GoBack">Cancel</p>
                <button class="border rounded-lg py-2 px-6 text-gray-700 text-sm font-bold hover:text-purple-600 hover:border-purple-600"
                        title="Register">Register
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, email, maxLength, between} from 'vuelidate/lib/validators'

    export default {
        name: "Registration",
        data() {
            return {
                name: "",
                email: "",
                password: ""
            }
        },
        methods: {
            RegisterUser() {
                this.$v.$touch();
                if(this.$v.$invalid) {
                    return
                }
                // this.$store.dispatch('REGISTER_USER', {
                //     name: this.name,
                //     email: this.email,
                //     password: this.password
                // });
                console.log(this.email)
            },
            GoBack() {
                this.$router.back()
            }
        },
        validations: {
            name: {required, maxLength: maxLength(50)},
            email: {required, email, maxLength: maxLength(120)},
            password: {required, between: between(5, 30)}
        }
    }
</script>

<style></style>