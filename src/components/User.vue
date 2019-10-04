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
                <p class="font-thin ml-2">{{$t('back')}}</p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl min-w-2xl mt-10 md:mt-0">
            <div class="flex justify-between items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                <p class="section-header">Profile</p>
                <p v-if="!editing" class="cursor-pointer inline-block mr-4" title="Edit profile" @click="edit">
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
                <div v-else-if="editing" class="flex justify-center">
                    <div class="max-w-sm flex-grow">
                        <div class="p-4 pt-6">
                            <label class="form-label" for="name">NAME</label>
                            <input class="form-field focus:outline-none focus:border-purple-400"
                                   id="name" type="text" placeholder="How you want us to call you" v-model.trim.lazy="$v.name.$model" :class="{ 'border-red-400': $v.name.$error }">
                            <p class="error-msg" v-if="$v.name.$error && !$v.name.required">Please, enter your name.</p>
                            <p class="error-msg" v-if="!$v.name.maxLength">Name should be 50 characters maximum.</p>
                        </div>
                        <div class="p-4 pt-6">
                            <label class="form-label" for="email">EMAIL</label>
                            <input class="form-field focus:outline-none focus:border-purple-400"
                                   id="email" type="text" placeholder="Your email" v-model.trim.lazy="$v.email.$model" :class="{ 'border-red-400': $v.email.$error }">
                            <p class="error-msg" v-if="$v.email.$error || !$v.email.email">Please, enter valid email
                                address.</p>
                        </div>
                        <div class="flex justify-between items-center px-4 pt-8 pb-4">
                            <p class="ml-1 tertiary-btn hover:text-gray-600" @click="showModal">
                                Delete my account
                            </p>
                            <div class="flex justify-end p-4 content-center">
                                <p class="secondary-btn mr-4 hover:border-border-s-btn-hover" title="Cancel"
                                    @click="editing = !editing">Cancel
                                </p>
                                <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                                    title="Save" @click="updateUser">Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <ConfirmationModal v-show="is_confirm_visible" @close="closeModal" @confirm="deleteUser">
                        <template v-slot:header>Delete Account</template>
                        <template v-slot:body>
                            Are you sure you want to delete your account and all your decks?</template>
                    </ConfirmationModal>
                </div>
                <div v-else>
                    <div class="block md:flex justify-around items-center my-10 md:my-20">
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
                    <div v-if="user.status === 'PENDING'" class="flex items-center justify-center">
                        <svg class="text-purple-500 fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/>
                        </svg>
                        <p class="font-thin">
                            Please, confirm your email. Click <a href="" class="underline text-blue-500" @click.prevent="resend">here</a> if you didn't get verification link.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from "./Spinner";
    import {required, email, maxLength} from 'vuelidate/lib/validators'
    import ConfirmationModal from './ConfirmationModal'
    export default {
        name: "User",
        components: {
            Spinner, ConfirmationModal
        },
        data() {
            return {
                editing: false,
                name: "",
                email: "",
                is_confirm_visible: false
            }
        },
        methods: {
            goBack() {
                this.$router.back()
            },
            showModal() {
                this.is_confirm_visible = true;
            },
            closeModal() {
                this.is_confirm_visible = false;
            },
            edit() {
                this.name = this.user.name;
                this.email = this.user.email;
                this.editing = !this.editing
            },
            updateUser() {
                this.$v.$touch();
                if(this.$v.$invalid) {
                    return
                }
                this.$store.dispatch('UPDATE_USER', {
                    name: this.name,
                    email: this.email
                });
                this.editing = !this.editing
            },
            deleteUser() {
                this.$store.dispatch('DELETE_USER')
            },
            resend() {
                this.$store.dispatch('RESEND_CONFIRMATION')
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
        },
        validations: {
            name: {required, maxLength: maxLength(50)},
            email: {required, email, maxLength: maxLength(120)},
        }
    }
</script>
