<template>
    <div>
<!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex flex-row items-center my-4 cursor-pointer text-gray-700 hover:text-purple-700" @click="goBack">
                <svg class="fill-current inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
                </svg>
                <p class="font-thin ml-2">Back</p>
            </div>
        </div>
<!--HEADER-->
        <div class="mx-auto max-w-2xl min-w-2xl rounded-lg mt-10 md:mt-0">
            <div class="md:flex justify-between items-center border-2 rounded-t-lg border-gray-400 bg-white">
                <p class="section-header">{{ deck.name }}</p>
                <div class="flex m-2 mr-4 items-center justify-between">
                    <router-link :to="{name: 'PracticeMode'}">
                        <p class="rounded border border-gray-700 text-gray-700 font-extrabold text-sm hover:bg-gray-700 hover:text-white py-1 px-3 cursor-pointer mr-4">
                            Practice!
                        </p>
                    </router-link>
                    <div v-if="deckBelongsToUser">
                        <router-link :to="{name: 'AddDeck', params: {deck_id: this.$route.params.deck_id}}">
                            <p class="mr-4 cursor-pointer inline-block" title="Edit collection">
                                <svg class="fill-current text-gray-700 inline-block h-5 w-5 hover:text-purple-500"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
                                </svg>
                            </p>
                        </router-link>
                        <p class="cursor-pointer inline-block" title="Add new card" @click="focusOnTextarea">
                            <svg class="fill-current text-gray-700 inline-block h-6 w-6 hover:text-purple-500"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
<!--CARDS-->
            <div v-if="deck.cards != null && deck.cards.length > 0">
                <div class="sm:block border-2 border-t-0 border-gray-400 pt-4 pl-4 bg-white"
                     :class="{'rounded-b-lg': !deckBelongsToUser}">
                    <div v-for="flashcard in sortedCards" :key="flashcard.id">
                        <router-link :to="{name: 'EditFlashcard', params: {deck_id: deck.id, card_id: flashcard.id}}">
                            <div class="md:flex text-gray-800 mb-4 mr-4">
                                <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-t-lg md:rounded-l-lg md:rounded-r-none px-4 py-2 cursor-pointer">
                                    <p class="text-base break-all">{{ flashcard.front }}</p>
                                </div>
                                <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-b-lg border-t-0 md:border-t-2 md:border-l-0 md:rounded-r-lg md:rounded-l-none px-4 py-2 cursor-pointer">
                                    <p class="text-base break-all">{{ flashcard.rear }}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
<!--EMPTY STATE-->
            <div v-else>
                <div class="sm:block md:flex flex-wrap items-stretch border-2 border-t-0 border-gray-400 pt-4 pl-4 bg-white"
                     :class="{'rounded-b-lg': !deckBelongsToUser}">
                    <div class="md:flex sm:block self-stretch items-center">
                        <img class="mx-auto object-fit md:ml-10 mt-10 md:mb-16"
                             src="../assets/img/undraw_add_cards.svg" width="250px" height="250px"/>
                        <div class="m-10 text-gray-800 text-base leading-relaxed">
                            <p class="mt-5">Cool, now add some flashcards!<br/> Use form below <span class="text-2xl">👇</span></p>
                        </div>
                    </div>
                </div>
            </div>
<!--CREATE CARD FORM-->
            <form v-if="deckBelongsToUser"
                  class="border-2 rounded-b-lg border-t-0 border-gray-400 bg-white"
                  @submit.prevent="saveCard">
                <p class="pl-5 pt-4 text-xs text-gray-700 font-bold">ADD NEW CARD:</p>
                <div class="md:flex">
                    <div class="flex-1 m-2 mx-4 md:mr-2">
                        <label class="block text-gray-500 text-sm font-bold hidden" for="front">Front side</label>
                        <textarea
                                class="front appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                                id="front" placeholder="Front..." rows="4" v-model.trim.lazy="$v.front.$model"
                                :class="{ 'border-red-400': $v.front.$error }"></textarea>
                        <p class="error-msg" v-if="$v.front.$error && !$v.front.required">Card should have
                            something on the front side.</p>
                        <p class="error-msg" v-if="!$v.front.maxLength">Card side should be 250 characters
                            maximum.</p>
                    </div>
                    <div class="flex-1 m-2 mx-4 md:ml-2">
                        <label class="block text-gray-500 text-sm font-bold hidden" for="rear">Rear side</label>
                        <textarea
                                class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                                id="rear" placeholder="Rear..." rows="4" v-model.trim.lazy="$v.rear.$model"
                                :class="{ 'border-red-400': $v.rear.$error }"></textarea>
                        <p class="error-msg" v-if="$v.rear.$error && !$v.rear.required">Rear side should be
                            in place too.</p>
                        <p class="error-msg" v-if="!$v.rear.maxLength">Card side should be 250 characters
                            maximum.</p>
                    </div>
                </div>
                <div class="flex justify-end content-center pr-4 pb-4">
                    <button class="border rounded-lg py-2 px-6 text-gray-700 text-sm font-bold hover:text-purple-600 hover:border-purple-600"
                            title="Create card">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "FlashcardsList",
        data() {
            return {
                front: "",
                rear: ""
            }
        },
        props: ['is_private'],
        methods: {
            deleteCard(id) {
                this.$store.dispatch('DELETE_CARD', {deck_id: this.deck.id, card_id: id})
            },
            saveCard() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return
                }
                this.$store.dispatch('CREATE_CARD', {
                    deck_id: this.$route.params.deck_id,
                    front: this.front,
                    rear: this.rear
                });
                this.front = "";
                this.rear = "";
                this.$v.$reset()
            },
            focusOnTextarea() {
                document.getElementById('front').focus()
            },
            goBack() {
                if (this.isPrivate) {
                    this.$router.push({name: 'Decks'});
                } else {
                    this.$router.push({name: 'Index'});
                }
            }
        },
        computed: {
            deck() {
                return this.$store.getters.deck(this.$route.params.deck_id)
            },
            sortedCards() {
                let c = this.deck.cards;
                return c.sort((f, s) => {
                    return s.created - f.created
                })
            },
            deckBelongsToUser() {
                return this.$store.getters.userId === this.deck.created_by
            },
            isPrivate() {
                return this.$route.params.visibility === 'private'
            }
        },
        validations: {
            front: {required, maxLength: maxLength(250)},
            rear: {required, maxLength: maxLength(250)}
        },
        created() {
            if (!this.deck) {
                console.log('page been refreshed');
                this.$store.dispatch('REFRESH_DATA', {
                    is_private: this.isPrivate,
                    deck_id: this.$route.params.deck_id
                });
            } else {
                if (this.deck.cards == null) {
                    if (this.deckBelongsToUser) {
                        this.$store.dispatch('GET_CARDS_FOR_DECK', {
                            deck_id: this.deck.id
                        })
                    } else {
                        this.$store.dispatch('GET_CARDS_FOR_PUBLIC_DECK', {
                            deck_id: this.deck.id
                        })
                    }
                }
            }
        }
    }
</script>

<style></style>