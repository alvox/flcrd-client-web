<template>
    <div class="font-sans antialiased">
        <nav class="flex items-center justify-between flex-wrap bg-white py-2 px-4 mx-auto max-w-2xl min-w-2xl border-2 border-t-0 rounded-b-lg border-gray-400">
            <div class="flex items-center flex-no-shrink text-gray-800 mr-6">
                <svg class="fill-current h-12 w-12 mr-2" width="134" height="114" viewBox="0 0 134 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.67387" y="47.2078" width="101.694" height="63.8602" rx="8" transform="rotate(-25.9714 2.67387 47.2078)" fill="#D6D6D6" stroke="#656565" stroke-width="4"/>
                    <rect x="14.8437" y="42.6084" width="101.694" height="63.8602" rx="8" transform="rotate(-14.3257 14.8437 42.6084)" fill="#F1F1F1" stroke="#656565" stroke-width="4"/>
                    <rect x="30.0249" y="41.0346" width="101.694" height="63.8602" rx="8" fill="white" stroke="#656565" stroke-width="4"/>
                    <path d="M70.9062 57.625C77.3229 56.0208 83.9375 54.8021 90.75 53.9688L92.0312 61.4062L78.5312 62.875L78.9062 72.8438L90.375 72.3438L90.0625 79.7812L79.0312 79.4375L78.5312 95L71.8125 95.5625L70.9062 57.625Z" fill="#383838"/>
                </svg>
                <router-link v-if="loggedIn" :to="{name: 'Decks'}">
                    <span class="font-extrabold text-2xl text-gray-800 tracking-tight">FLCRD</span>
                </router-link>
                <router-link v-else :to="{name: 'Index'}">
                    <span class="font-extrabold text-2xl text-gray-800 tracking-tight">FLCRD</span>
                </router-link>
            </div>
            <div class="block sm:hidden">
                <button @click="toggle" class="appearance-none outline-none flex items-center px-3 py-2 text-gray-700 border rounded hover:text-gray-600 hover:border-gray-600">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div :class="open ? 'block py-4' : 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-sm sm:flex-grow">
<!--                    <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">-->
<!--                        Public-->
<!--                    </a>-->
<!--                    <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">-->
<!--                        Popular-->
<!--                    </a>-->
<!--                    <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white">-->
<!--                        Curated-->
<!--                    </a>-->
                </div>
                <div v-if="loggedIn" class="flex items-center">
                    <p class="mr-4 text-sm text-gray-800">Hi {{ userName }}!</p>
                    <p class="secondary-btn hover:text-gray-600 hover:border-gray-600" @click="logoutUser">Log out</p>
                </div>
                <div v-else>
                    <router-link :to="{name: 'Login'}">
                        <a href="#" class="tertiary-btn hover:text-gray-600 mr-4">Log in</a>
                    </router-link>
                    <router-link :to="{name: 'Registration'}">
                        <a href="" class="primary-btn-outline hover:text-white hover:bg-gray-700">Register</a>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                open: false,
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            },
            userName() {
                return this.$store.getters.userName
            }
        },
        methods: {
            logoutUser() {
                this.$store.dispatch('LOGOUT_USER')
            },
            toggle() {
                this.open = !this.open
            }
        }
    }
</script>

<style></style>