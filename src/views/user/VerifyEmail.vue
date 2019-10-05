<template>
    <div>
        <!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex items-center my-4 cursor-pointer text-copy-secondary hover:text-copy-hover" @click="goBack">
                <svg class="fill-current inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
                </svg>
                <p class="font-thin ml-2">{{$t('back')}}</p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl min-w-2xl mt-10 md:mt-0">
            <div v-if="code === 'email'">
                <div class="md:flex items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                    <p class="section-header">Please, confirm your email</p>
                </div>
                <div class="sm:block border-2 border-t-0 rounded-b-lg border-border-primary p-5 bg-background-secondary text-copy-primary leading-relaxed">
                    <p class="font-bold text-lg py-5">Hi {{userName}}, thank you for joining!</p>
                    <p class="font-thin">
                        I've just sent you a confirmation link.<br/>
                        Please, check your email and click 'Confirm Email Address' button.
                    </p>
                    <p class="py-5 font-bold text-sm">Cheers, Alex.</p>
                </div>
            </div>
            <div v-else-if="code === 'error'">
                <div class="md:flex items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                    <p class="section-header">Please, confirm your email</p>
                </div>
                <div class="sm:block border-2 border-t-0 rounded-b-lg border-border-primary p-5 bg-background-secondary text-copy-primary leading-relaxed">
                    <p class="font-bold text-lg py-5">Some error happened (ugh, internet...)</p>
                    <p class="font-thin">
                        Please, <a class="text-blue-600 underline" href="" @click.prevent="resend">click here to resend confirmation email</a> and try again.<br/>
                        Sorry about that...
                    </p>
                    <p class="py-5 font-bold text-sm">Cheers, Alex.</p>
                </div>
            </div>
            <div v-else>
                <div class="md:flex items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                    <p class="section-header">Confirming...</p>
                </div>
                <div class="sm:block border-2 border-t-0 rounded-b-lg border-border-primary p-5 bg-background-secondary text-copy-primary leading-relaxed">
                    <p class="font-bold text-lg py-5">Confirming...</p>
                    <Spinner></Spinner>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from '../../components/Spinner'
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
