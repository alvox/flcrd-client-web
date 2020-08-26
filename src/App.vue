<template>
    <div id="app" class="min-h-screen max-w-5xl mx-auto flex bg-background-primary" :class="theme">
        <Navbar/>
        <div class="w-3/4">
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
