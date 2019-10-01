<template>
    <div>
        <!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex items-center my-4 cursor-pointer text-copy-secondary hover:text-copy-hover"
                 @click="goBack">
                <svg class="fill-current inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
                </svg>
                <p class="font-thin ml-2">Back</p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl min-w-2xl mt-10 md:mt-0">
            <div class="flex justify-between items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                <p class="section-header">Profile</p>
                <p class="cursor-pointer inline-block mr-4" title="Edit profile">
                    <svg class="fill-current text-copy-secondary inline-block h-5 w-5 hover:text-copy-hover"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
                    </svg>
                </p>
            </div>
            <div class="sm:block border-2 border-t-0 rounded-b-lg border-border-primary p-5 bg-background-secondary text-copy-primary leading-relaxed">
                <div v-if="isLoading">
                    <Spinner></Spinner>
                </div>
                <div v-else class="block md:flex justify-around items-center my-10 md:my-20">
                    <div class="text-center">
                        <p class="font-black text-5xl md:mb-2">{{user.name}}</p>
                        <p class="font-thin">{{user.email}}</p>
                    </div>
                    <div class="hidden md:block border-l-2 border-border-primary h-20"></div>
                    <div class="text-center mt-10 md:mt-0">
                        <p class="font-thin md:mb-4">You created</p>
                        <div class="flex items-center justify-center">
                            <p class="font-thin"><span class="font-black text-4xl">7</span> Decks</p>
                            <p class="text-2xl mx-4">/</p>
                            <p class="font-thin"><span class="font-black text-4xl">354</span> Cards</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from "./Spinner";
    export default {
        name: "User",
        components: {
            Spinner
        },
        methods: {
            goBack() {
                this.$router.back()
            }
        },
        computed: {
            isLoading() {
                return this.$store.getters.isLoading
            },
            user() {
                return this.$store.getters.user
            }
        },
        created() {
            this.$store.dispatch("GET_USER")
        },
        destroyed() {
            this.$store.dispatch("CLEAR_USER")
        }
    }
</script>
