<template>
    <div id="app" class="min-h-screen flex flex-col bg-background-primary content-wrapper" :class="theme">
        <Navbar/>
        <div class="flex-grow">
            <router-view/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import Footer from "@/components/Footer";
    export default {
        components: {
            Navbar,
            Footer
        },
        computed: {
            theme() {
                return this.$store.getters.theme
            }
        }
    }
</script>

<style></style>
