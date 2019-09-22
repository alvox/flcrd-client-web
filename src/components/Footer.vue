<template>
    <div class="mx-auto max-w-2xl text-center">
        <div class="flex items-center mt-10 mb-5 text-gray-700 text-sm font-thin tracking-wide">
            <p>
                <span class="text-base">🚧</span>WIP by
                <a class="text-blue-700" href="https://github.com/alvox" target="_blank" rel="noopener">@alvox</a>
            </p>
            <p class="px-3 text-base">•</p>
            <div>
                <router-link :to="{name: 'Terms'}">
                    <p class="underline">Terms and Privacy</p>
                </router-link>
            </div>
            <p class="px-3 text-base">•</p>
            <p>
                <a href="mailto:al@alvox.net">
                    <svg class="inline-block fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"/>
                    </svg>
                    <span class="pl-1 underline">Contact me</span>
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style></style>