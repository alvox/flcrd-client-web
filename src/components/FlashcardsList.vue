<template>
    <div>
    <div class="mx-auto max-w-2xl min-w-2xl flex items-center justify-between">
        <div class="flex items-center pt-4 cursor-pointer" @click="goBack">
            <svg class="fill-current text-gray-600 inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
            </svg>
            <p class="text-gray-600 font-thin ml-2">Back</p>
        </div>
        <div v-if="deck.cards != null && deck.cards.length > 0" class="pt-4">
            <router-link :to="{name: 'PracticeMode'}">
                <p class="font-thin text-gray-700 underline">Practice</p>
            </router-link>
        </div>
    </div>
    <div class="mx-auto max-w-2xl min-w-2xl rounded-lg mt-4">
        <div class="flex justify-between items-center border-2 rounded-lg border-b-0 rounded-b-none border-gray-400 bg-white">
            <p class="text-base font-semibold m-4 text-gray-800">{{ deck.name }}</p>
            <div class="m-4" v-if="deckBelongsToUser">
<!--                <p class="mr-4 cursor-pointer inline-block" title="Delete collection" @click="deleteDeck">-->
<!--                    <svg class="fill-current text-red-400 inline-block h-8 w-8" xmlns="http://www.w3.org/2000/svg"-->
<!--                         viewBox="0 0 20 20">-->
<!--                        <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"></path>-->
<!--                    </svg>-->
<!--                </p>-->
                <router-link :to="{name: 'AddDeck', params: {deck_id: this.$route.params.deck_id}}">
                    <p class="mr-4 cursor-pointer inline-block" title="Edit collection">
                        <svg class="fill-current text-gray-700 inline-block h-5 w-5 hover:text-purple-500" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
                        </svg>
                    </p>
                </router-link>
                <p class="cursor-pointer inline-block" title="Add new card" @click="focusOnTextarea">
                    <svg class="fill-current text-gray-700 inline-block h-6 w-6 hover:text-purple-500" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
                    </svg>
                </p>
<!--                <a href="" title="Create new flashcard">-->
<!--                    <router-link :to="{name: 'AddFlashcard', params: {deck_id: this.$route.params.deck_id}}">-->
<!--                        <svg class="fill-current text-gray-700 inline-block h-6 w-6 hover:text-purple-500" xmlns="http://www.w3.org/2000/svg"-->
<!--                             viewBox="0 0 20 20">-->
<!--                            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>-->
<!--                        </svg>-->
<!--                    </router-link>-->
<!--                </a>-->
            </div>
        </div>
        <div v-if="deck.cards != null && deck.cards.length > 0">
            <div class="sm:block border-2 border-gray-400 pt-4 pl-4 bg-white" :class="{'rounded-lg rounded-t-none': !deckBelongsToUser}">
                <div class="flex flex-wrap text-gray-700" v-for="flashcard in deck.cards" :key="flashcard.id">
                    <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-lg rounded-r-none px-4 py-2 mb-4 cursor-pointer">
                        <p class="text-base break-all">{{ flashcard.front }}</p>
                    </div>
                    <div class="flex-1 bg-gray-100  border-2 border-l-0 border-gray-400 rounded-lg rounded-l-none px-4 py-2 mb-4 mr-4 cursor-pointer">
                        <p class="text-base break-all">{{ flashcard.rear }}</p>
                    </div>
                        <!--                        <p> {{ flashcard.rear }}</p>-->
                        <!--                        <div class="absolute top-0 right-0 px-2 py-2 font-semibold text-xs">-->
                        <!--                            <div class=" text-red-500 hover:text-red-700 cursor-pointer"-->
                        <!--                                 @click="deleteCard(flashcard.id)">-->
                        <!--                                Delete-->
                        <!--                            </div>-->
                        <!--                            <div class=" text-gray-500 hover:text-gray-700 cursor-pointer">Edit</div>-->
                        <!--                        </div>-->
                </div>
            </div>
        </div>
        <div v-else>
            <div class="sm:block md:flex flex-wrap items-stretch border-2 border-gray-400 pt-4 pl-4 bg-white" :class="{'rounded-lg rounded-t-none': !deckBelongsToUser}">
                <div class="md:flex sm:block self-stretch items-center">
                    <img class="md:object-left sm:object-top object-fit m-10 mb-20"
                         src="../assets/img/undraw_add_cards.svg" width="250px" height="250px"/>
                    <div class="m-10 md:ml-0 sm:ml-10 text-gray-800 text-base leading-relaxed">
                        <p class="font-bold text-lg tracking-wide">Awesome!</p>
                        <p class="mt-5">Now you can start adding flashcards. Use + button on top.</p>
                    </div>
                </div>
            </div>
        </div>
        <form v-if="deckBelongsToUser" class="border-2 rounded-lg border-t-0 rounded-t-none border-gray-400 bg-white" @submit.prevent="saveCard">
            <p class="p-4 pb-0 text-sm text-gray-700 font-light">Add new card:</p>
            <div class="flex flex-wrap">
                <div class="flex-1 m-2 ml-4">
                    <label class="block text-gray-500 text-sm font-bold hidden" for="front">Front side</label>
                    <textarea
                        class="front appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="front" placeholder="Front..." rows="4" v-model.trim.lazy="$v.front.$model" :class="{ 'border-red-400': $v.front.$error }"></textarea>
                    <p class="text-sm text-red-400" v-if="$v.front.$error && !$v.front.required">Card should have something on the front side.</p>
                    <p class="text-sm text-red-400" v-if="!$v.front.maxLength">Card side should be 250 characters maximum.</p>
                </div>
                <div class="flex-1 m-2 mr-4">
                    <label class="block text-gray-500 text-sm font-bold hidden" for="rear">Rear side</label>
                    <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="rear" placeholder="Rear..." rows="4" v-model.trim.lazy="$v.rear.$model" :class="{ 'border-red-400': $v.rear.$error }"></textarea>
                    <p class="text-sm text-red-400" v-if="$v.rear.$error && !$v.rear.required">Rear side should be in place too.</p>
                    <p class="text-sm text-red-400" v-if="!$v.rear.maxLength">Card side should be 250 characters maximum.</p>
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
                this.$router.back()
            }
        },
        computed: {
            deck() {
                return this.$store.getters.deck(this.$route.params.deck_id)
            },
            deckBelongsToUser() {
                return this.$store.getters.userId === this.deck.created_by
            }
        },
        validations: {
            front: {required, maxLength: maxLength(250)},
            rear: {required, maxLength: maxLength(250)}
        },
        mounted() {
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
</script>

<style></style>