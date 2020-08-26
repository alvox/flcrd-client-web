<template>
    <div class="mb-4 text-center">
            <p>
                WIP by <a class="underline" href="https://alexanderpopov.me" target="_blank" rel="noopener">Alex Pop</a>
            </p>
            <router-link :to="{name: 'Terms'}">
                <p class="underline">{{$t('terms')}}</p>
            </router-link>
        </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>
