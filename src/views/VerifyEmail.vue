<template>
    <div class="mt-6">
        <div v-if="code === 'email'">
            <p class="text-3xl">Please, confirm your email</p>
            <div class="sm:block text-copy-primary leading-relaxed">
                <p class="font-bold text-lg mt-10 mb-5">Hi {{ userName }}, thank you for joining!</p>
                <p class="font-thin">
                    I've just sent you a confirmation link.<br/>
                    Please, check your email and click 'Confirm Email Address' button.
                </p>
                <p class="py-5 font-bold text-sm">Cheers, Alex.</p>
            </div>
        </div>
        <div v-else-if="code === 'error'">
            <p class="text-3xl">Please, confirm your email</p>
            <div class="sm:block text-copy-primary leading-relaxed">
                <p class="font-bold text-lg mt-10 mb-5">Some error happened (ugh, internet...)</p>
                <p class="font-thin">
                    Please, <a class="text-blue-600 underline" href="" @click.prevent="resend">click here to resend
                    confirmation email</a> and try again.<br/>
                    Sorry about that...
                </p>
                <p class="py-5 font-bold text-sm">Cheers, Alex.</p>
            </div>
        </div>
        <div v-else>
            <p class="text-3xl">Confirming...</p>
            <div class="sm:block text-copy-primary leading-relaxed">
                <p class="font-bold text-lg mt-10 mb-5">Confirming...</p>
                <Spinner/>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/Spinner"

export default {
    name: "VerifyEmail",
    components: {Spinner},
    computed: {
        userName() {
            return this.$store.getters.userName
        },
        code() {
            return this.$route.params.code
        }
    },
    methods: {
        goBack() {
            this.$router.push({name: 'Decks'})
        },
        resend() {
            this.$store.dispatch('RESEND_CONFIRMATION')
        }
    },
    created() {
        if (this.code === 'email' || this.code === 'error') {
            return
        }
        this.$store.dispatch('CONFIRM_EMAIL', {
            code: this.code
        });
    }
}
</script>
