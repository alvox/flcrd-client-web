<template>
    <nav class="w-1/4 pt-4 flex flex-col max-h-screen sidebar">

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
            <NavButton title="Login" @clicked="$store.commit('showLoginModal')"/>
            <NavButton title="Register" class="mt-4" @clicked="$router.push({name: 'Registration'})"/>
        </div>

        <!--conditional navigation-->
        <div class="mt-6 px-4">
            <NavButton v-if="shouldShowPracticeButton" title="Practice" @clicked="$router.push({name: 'PracticeMode'})" class="mb-4"/>
            <div v-if="loggedIn && $route.path.endsWith('cards')">
                <NavButton title="Add card" @clicked="focusOnTextarea" class="mb-4"/>
                <NavButton title="Edit deck" @clicked="$router.push({name: 'EditDeck'})"/>
            </div>
            <div v-if="loggedIn && $route.path.endsWith('decks')">
                <NavButton title="Create new deck" @clicked="$router.push({name: 'AddDeck'})"/>
            </div>

        </div>

        <div class="flex-grow"></div>

        <!--profile/logout buttons-->
        <div v-if="loggedIn" class="mb-16 px-4">
            <NavButton title="Your profile"  @clicked="$router.push({name: 'User'})"/>
            <NavButton title="Logout" class="mt-4" @clicked="logoutUser"/>
        </div>

        <Footer/>

        <LoginModal v-show="loginModalVisible"/>
    </nav>
</template>

<script>
import Footer from "@/components/Footer"
import NavButton from "@/components/NavButton"
import LangSelect from "@/components/LangSelect"
import ThemeSwitch from "@/components/ThemeSwitch"
import LoginModal from "@/components/LoginModal"

export default {
    name: "Navbar",
    components: {Footer, NavButton, LangSelect, ThemeSwitch, LoginModal},
    data() {
        return {
            open: false
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
        },
        loginModalVisible() {
            return this.$store.getters.isLoginModalVisible
        },
        shouldShowPracticeButton() {
            if (!this.$route.path.endsWith('cards')) {
                return false
            }
            let currentDeckId = this.$store.getters.currentDeckId
            if (currentDeckId == null) {
                return false
            }
            let deck = this.$store.getters.deck(currentDeckId)
            if (deck == null) {
                return false
            }
            return deck.cards != null && deck.cards.length > 0
        }
    },
    methods: {
        logoutUser() {
            this.$store.dispatch('LOGOUT_USER')
        },
        logoImg() {
            return this.theme === 'theme-light'
                ? require('../assets/img/logo-light.svg')
                : require('../assets/img/logo-dark.svg')
        },
        focusOnTextarea() {
            document.getElementById('front').focus()
        }
    }
}
</script>
