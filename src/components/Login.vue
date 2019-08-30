<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">Log in</p>
        </div>
        <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none" @submit.prevent="LoginUser">
            <div class="mb-6 p-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input class="outline-none border-gray-400 border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Your email" v-model="email">
            </div>
            <div class="mb-6 p-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input class="outline-none border-gray-400 border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="And password" v-model="password">
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="mr-4 cursor-pointer py-2" title="Cancel" @click="GoBack">Cancel</p>
                <button class="border rounded-lg py-2 px-6" title="Create">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null
            }
        },
        methods: {
            LoginUser() {
                this.$store.dispatch('LOGIN_USER', {
                    email: this.email,
                    password: this.password
                });
            },
            GoBack() {
                this.$router.back()
            }
        }
    }
</script>

<style></style>