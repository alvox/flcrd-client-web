<template>
    <nav class="w-1/4 pt-8 flex flex-col max-h-screen sidebar">

        <!--logo-->
        <router-link v-if="loggedIn" :to="{name: 'Decks'}">
            <img class="object-fit w-full h-12" :src="logoImg()" alt="logo"/>
        </router-link>
        <router-link v-else :to="{name: 'Index'}">
            <img class="object-fit w-full h-12" :src="logoImg()" alt="logo"/>
        </router-link>

        <div class="mt-16 px-4 flex justify-between">
            <ThemeSwitch/>
            <LangSelect/>
        </div>

        <!--login/register buttons-->
        <div v-if="!loggedIn" class="mt-6 px-4">
            <NavButton title="Login" @clicked="$router.push({name: 'Login'})"/>
            <NavButton title="Register" class="mt-4" @clicked="$router.push({name: 'Registration'})"/>
        </div>

        <div class="flex-grow"></div>

        <!--profile/logout buttons-->
        <div v-if="loggedIn" class="mb-16 px-4">
            <NavButton title="Your profile"  @clicked="$router.push({name: 'User'})"/>
            <NavButton title="Logout" class="mt-4" @clicked="logoutUser"/>
        </div>

        <Footer/>
    </nav>
</template>

<script>
import Footer from "@/components/Footer"
import NavButton from "@/components/NavButton"
import LangSelect from "@/components/LangSelect"
import ThemeSwitch from "@/components/ThemeSwitch"

export default {
    name: "Navbar",
    components: {Footer, NavButton, LangSelect, ThemeSwitch},
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
        },
        theme() {
            return this.$store.getters.theme
        }
    },
    methods: {
        logoutUser() {
            this.$store.dispatch('LOGOUT_USER')
        },
        logoImg() {
            return this.theme === 'theme-light'
                ? require('../assets/img/logo-light.svg')
                : require('../assets/img/logo-dark.svg');
        }
    }
}
</script>
