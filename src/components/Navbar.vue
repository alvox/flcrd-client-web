<template>
    <div class="font-sans antialiased">
        <nav class="flex items-center justify-between flex-wrap bg-background-secondary py-2 px-4 mx-auto max-w-2xl min-w-2xl border-2 border-t-0 rounded-b-lg border-border-primary">
            <router-link v-if="$auth.isAuthenticated" :to="{name: 'Decks'}">
                <img class="object-fit h-12" :src="logoImg()" alt="logo"/>
            </router-link>
            <router-link v-else :to="{name: 'Index'}">
                <img class="object-fit h-12" :src="logoImg()" alt="logo"/>
            </router-link>
            <div class="block sm:hidden">
                <button @click="toggle" class="appearance-none outline-none flex items-center px-3 py-2 text-gray-700 border rounded hover:text-gray-600 hover:border-gray-600">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div :class="open ? 'block py-4' : 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-sm sm:flex-grow">
                </div>
                <div v-if="!$auth.loading">
                    <div v-if="$auth.isAuthenticated" class="flex items-center">
                        <router-link :to="{name: 'User'}">
                            <p class="mr-4 text-sm text-copy-primary underline">{{ userName }}</p>
                        </router-link>
                        <p class="secondary-btn hover:border-border-s-btn-hover" @click="logoutUser">{{$t('logout')}}</p>
                    </div>
                    <div v-if="!$auth.isAuthenticated">
<!--                        <router-link :to="{name: 'Login'}">-->
<!--                            <a href="#" class="tertiary-btn hover:text-gray-600 mr-4">{{$t('login')}}</a>-->
<!--                        </router-link>-->
                        <p class="secondary-btn hover:border-border-s-btn-hover" @click="loginUser">{{$t('login')}}</p>
<!--                        <router-link :to="{name: 'Registration'}">-->
<!--                            <a href="" class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover">{{$t('register')}}</a>-->
<!--                        </router-link>-->
                    </div>
                </div>
                <div class="flex items-center justify-between mt-4 md:mt-0 md:ml-4">
                    <a href="" class="text-copy-secondary block" @click.prevent="switchTheme">
                        <svg v-if="theme === 'theme-light'" class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M9.57 3.38a8 8 0 0 0 10.4 10.4 1 1 0 0 1 1.31 1.3 10 10 0 1 1-13-13 1 1 0 0 1 1.3 1.3zM7.1 5.04A8 8 0 1 0 18.3 16.27 10 10 0 0 1 7.08 5.04z"/>
                        </svg>
                        <svg v-else class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM9 1a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0V1zm6.65 1.94a1 1 0 1 1 1.41 1.41l-1.4 1.4a1 1 0 1 1-1.41-1.41l1.4-1.4zM18.99 9a1 1 0 1 1 0 2h-1.98a1 1 0 1 1 0-2h1.98zm-1.93 6.65a1 1 0 1 1-1.41 1.41l-1.4-1.4a1 1 0 1 1 1.41-1.41l1.4 1.4zM11 18.99a1 1 0 1 1-2 0v-1.98a1 1 0 1 1 2 0v1.98zm-6.65-1.93a1 1 0 1 1-1.41-1.41l1.4-1.4a1 1 0 1 1 1.41 1.41l-1.4 1.4zM1.01 11a1 1 0 1 1 0-2h1.98a1 1 0 1 1 0 2H1.01zm1.93-6.65a1 1 0 1 1 1.41-1.41l1.4 1.4a1 1 0 1 1-1.41 1.41l-1.4-1.4z"/>
                        </svg>
                    </a>
                    <DropdownLink ref="dropdown">
                        <span slot="link" class="appearance-none flex items-center inline-block text-lg ml-4 text-copy-secondary">
                            <span>{{$t('lang_emoji')}}</span>
                            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </span>
                        <div slot="dropdown" class="shadow rounded border border-border-primary overflow-hidden text-lg">
                            <a href="#" class="no-underline text-center py-1 block border-b border-border-primary bg-background-secondary hover:bg-background-ternary" @click.prevent="selectLang('en')">🇬🇧</a>
                            <a href="#" class="no-underline text-center py-1 block bg-background-secondary hover:bg-background-ternary" @click.prevent="selectLang('ru')">🇷🇺</a>
                        </div>
                    </DropdownLink>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import DropdownLink from './DropdownLink'
    export default {
        name: "Navbar",
        components: {DropdownLink},
        data() {
            return {
                open: false,
            }
        },
        computed: {
            userName() {
                return this.$auth.user.name
            },
            theme() {
                return this.$store.getters.theme
            },
            lang() {
                return this.$store.getters.lang
            }
        },
        methods: {
            loginUser() {
                this.$auth.loginWithRedirect();
            },
            logoutUser() {
                this.$auth.logout({
                    returnTo: window.location.origin
                })
            },
            toggle() {
                this.open = !this.open
            },
            switchTheme() {
                this.$store.dispatch('SWITCH_THEME')
            },
            selectLang(lang) {
                this.$store.dispatch('SELECT_LANG', {lang: lang});
                this.$refs.dropdown.closeDropdown()
            },
            logoImg() {
                return this.theme === 'theme-light'
                    ? require('../assets/img/logo-light.svg')
                    : require('../assets/img/logo-dark.svg');
            }
        }
    }
</script>

<style></style>