<template>
    <div>
        <!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex items-center my-4 cursor-pointer text-copy-secondary hover:text-copy-hover" @click="goBack">
                <svg class="fill-current inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
                </svg>
                <p class="font-thin ml-2">Back</p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl min-w-2xl mt-10 md:mt-0">
            <div class="md:flex items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                <p class="section-header">User</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        methods: {
            goBack() {
                this.$router.back()
            }
        }
    }
</script>
