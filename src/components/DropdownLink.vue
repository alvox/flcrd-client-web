<template>
    <div class="relative">
        <div role="button" class="inline-block select-none" @click="closeDropdown">
            <slot name="link"></slot>
        </div>
        <div class="absolute w-full" v-show="open">
            <slot name="dropdown"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DropdownLink",
        data() {
            return {
                open: false
            }
        },
        methods: {
            closeDropdown() {
                this.open = !this.open
            }
        }
    }
</script>
