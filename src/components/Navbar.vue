<template>
        <div class="bg-white shadow">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between py-4">
                    <span class="font-semibold text-2xl text-gray-700 tracking-wide">FLCRD</span>

<!--                    <div class="hidden sm:flex sm:items-center">-->
<!--                        <a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Curated</a>-->
<!--                        <a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Popular</a>-->
<!--                    </div>-->

                    <div class="hidden sm:flex sm:items-center">
                        <a href="#" class="text-gray-700 text-sm font-semibold hover:text-purple-600 mr-4">Log in</a>
                        <a href="#" class="text-gray-700 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600">Register</a>
                    </div>
                </div>

                <div class="block sm:hidden bg-white border-t-2 py-2">
                    <div class="flex flex-col">
<!--                        <a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Curated</a>-->
<!--                        <a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Popular</a>-->
                        <div class="flex justify-between items-center border-t-2 pt-2">
                            <a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Log in</a>
                            <a href="#" class="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style>

</style>