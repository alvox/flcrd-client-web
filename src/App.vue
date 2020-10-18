<template>
    <div id="app" class="min-h-screen max-w-2xl lg:max-w-5xl mx-auto flex bg-background-primary" :class="theme">
        <Navbar class="hidden lg:flex"/>
        <div class="w-full lg:w-3/4 lg:pl-32 mx-2 lg:mx-0">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar"
    export default {
        components: {
            Navbar
        },
        computed: {
            theme() {
                return this.$store.getters.theme
            }
        }
    }
</script>
