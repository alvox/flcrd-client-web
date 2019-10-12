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
<!--HEADER-->
        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="mx-auto max-w-2xl min-w-2xl rounded-lg mt-10 md:mt-0">
            <div class="md:flex justify-between items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                <p class="section-header">{{ deck.name }}</p>
                <div class="flex m-2 mr-4 items-center justify-between">
                    <router-link v-if="deck.cards != null && deck.cards.length > 0" :to="{name: 'PracticeMode'}">
                        <p class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover ml-2">
                            {{$t('practice')}}
                        </p>
                    </router-link>
                    <div v-else></div>
                    <div v-if="deckBelongsToUser" class="ml-4">
                        <router-link :to="{name: 'AddDeck', params: {deck_id: this.$route.params.deck_id}}">
                            <p class="cursor-pointer inline-block" title="Edit collection">
                                <svg class="fill-current text-copy-secondary inline-block h-5 w-5 hover:text-copy-hover"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
                                </svg>
                            </p>
                        </router-link>
                        <p v-if="!deckIsPacked" class="cursor-pointer inline-block ml-4" title="Add new card" @click="focusOnTextarea">
                            <svg class="fill-current text-copy-secondary inline-block h-6 w-6 hover:text-copy-hover"
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
                <div class="sm:block border-2 border-t-0 border-border-primary pt-4 pl-4 bg-background-secondary"
                     :class="{'rounded-b-lg': !deckBelongsToUser}">
                    <div v-for="flashcard in sortedCards" :key="flashcard.id">
                        <div v-if="deckBelongsToUser">
                            <router-link :to="{name: 'EditFlashcard', params: {deck_id: deck.id, card_id: flashcard.id}}">
                                <Card :flashcard=flashcard></Card>
                            </router-link>
                        </div>
                        <div v-else>
                            <Card :flashcard=flashcard :belongs_to_user=deckBelongsToUser></Card>
                        </div>
                    </div>
                </div>
            </div>
<!--EMPTY STATE-->
            <div v-else>
                <div class="sm:block md:flex flex-wrap items-stretch border-2 border-t-0 border-border-primary pt-4 pl-4 bg-background-secondary"
                     :class="{'rounded-b-lg': !deckBelongsToUser}">
                    <div class="md:flex sm:block self-stretch items-center">
                        <img class="mx-auto object-fit md:ml-10 mt-10 md:mb-16"
                             src="../../assets/img/undraw_add_cards.svg" width="250px" height="250px" alt="add flashcards"/>
                        <div class="m-10 text-copy-secondary text-base leading-relaxed">
                            <p class="mt-5">{{$t('cards_copy_p1')}}<br/> {{$t('cards_copy_p2')}} <span class="text-2xl">👇</span></p>
                        </div>
                    </div>
                </div>
            </div>
<!--CREATE CARD FORM-->
            <div v-if="deckBelongsToUser" class="border-2 rounded-b-lg border-t-0 border-border-primary bg-background-secondary">
            <form v-if="!deckIsPacked" @submit.prevent="saveCard">
                <p class="font-bold px-5 pt-4 text-copy-secondary text-xs uppercase">{{$t('add_new_card')}}</p>
                <div class="md:flex">
                    <div class="flex-1 m-2 mx-4 md:mr-2">
                        <label class="block text-gray-500 text-sm font-bold hidden" for="front">Front side</label>
                        <textarea
                                class="front appearance-none outline-none focus:outline-none resize-y border-2 border-border-primary rounded-lg py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight focus:border-purple-400"
                                id="front" :placeholder="$t('front_side')" rows="4" v-model.trim.lazy="$v.front.$model"
                                :class="{ 'border-red-400': $v.front.$error }"></textarea>
                        <p class="error-msg" v-if="$v.front.$error && !$v.front.required">{{$t('err_card_front_empty')}}</p>
                        <p class="error-msg" v-if="!$v.front.maxLength">{{$t('err_card_length')}}</p>
                    </div>
                    <div class="flex-1 m-2 mx-4 md:ml-2">
                        <label class="block text-gray-500 text-sm font-bold hidden" for="rear">Rear side</label>
                        <textarea
                                class="appearance-none outline-none focus:outline-none resize-y border-2 border-border-primary rounded-lg py-2 px-3 w-full bg-background-ternary text-copy-secondary leading-tight focus:border-purple-400"
                                id="rear" :placeholder="$t('rear_side')" rows="4" v-model.trim.lazy="$v.rear.$model"
                                :class="{ 'border-red-400': $v.rear.$error }"></textarea>
                        <p class="error-msg" v-if="$v.rear.$error && !$v.rear.required">{{$t('err_card_rear_empty')}}</p>
                        <p class="error-msg" v-if="!$v.rear.maxLength">{{$t('err_card_length')}}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center pr-4 pl-5 pb-4">
                    <p class="text-sm text-copy-secondary">You can add {{cardsLeft}} more {{cardsLeft === 1 ? 'card' : 'cards'}}.</p>
                    <button class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover"
                            title="Create card">
                        {{$t('save')}}
                    </button>
                </div>
            </form>
                <div v-else class="font-thin text-center text-copy-secondary p-4">
                    <p>Nice, you got 100 cards here! It's a reasonable limit for a deck to keep it learnable.</p>
                    <p>To continue adding cards, <router-link :to="{name: 'AddDeck', params: {deck_id: 'new'}}"><span class="text-blue-500 underline">create a new deck.</span></router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators'
    import Spinner from '../../components/Spinner'
    import Card from '../../components/elements/Card'

    export default {
        name: "FlashcardsList",
        components: {
            Spinner, Card
        },
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
                if (this.isPrivate) {
                    this.$router.push({name: 'Decks'});
                } else {
                    this.$router.push({name: 'Index'});
                }
            }
        },
        computed: {
            isLoading() {
                return this.$store.getters.isLoading
            },
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
                return this.$store.getters.userId === this.deck.created_by.id
            },
            isPrivate() {
                return this.$route.params.visibility === 'private'
            },
            deckIsPacked() {
                return this.cardsLeft <= 0
            },
            cardsLeft() {
                if (!this.deck.cards) {
                    return 100
                }
                return 100 - this.deck.cards.length
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
