<template>
    <div id="app" class="min-h-screen flex flex-col">
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
        }
    }
</script>

<style></style>
