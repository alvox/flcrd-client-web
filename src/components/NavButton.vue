<template>
    <div class="fl-button">
        <button class="w-full h-10 px-4 bg-white border-2 border-purple-600 text-purple-900 text-xl
                       appearance-none outline-none focus:outline-none"
                @click="$emit('clicked')">
            {{ title }}
        </button>
        <div class="fl-button-shadow w-full h-10"></div>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: ["title"]
}
</script>

<style>
.fl-button:hover button {
    margin-left: 0.25rem;
    margin-top: 0.25rem;
}
.fl-button:hover .fl-button-shadow {
    margin-top: -2.25rem;
}
.fl-button-shadow {
    background: rgba(128, 90, 213, 0.3);
    margin-left: 0.5rem;
    margin-top: -2rem;
}
</style>