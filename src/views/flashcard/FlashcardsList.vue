<template>
    <div>
        <BackButton @goBack="goBack"></BackButton>
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
                <NewCardForm v-if="!deckIsPacked" :deckId="$route.params.deck_id"></NewCardForm>
                <div v-else class="font-thin text-center text-copy-secondary p-4">
                    <p>Nice, you got 100 cards here! It's a reasonable limit for a deck to keep it learnable.</p>
                    <p>To continue adding cards, <router-link :to="{name: 'AddDeck', params: {deck_id: 'new'}}"><span class="text-blue-500 underline">create a new deck.</span></router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BackButton from "@/components/BackButton"
    import Spinner from "@/components/Spinner"
    import Card from "@/components/elements/Card"
    import NewCardForm from "@/components/elements/NewCardForm"

    export default {
        name: "FlashcardsList",
        components: {
            NewCardForm, BackButton, Spinner, Card
        },
        data() {
            return {}
        },
        methods: {
            deleteCard(id) {
                this.$store.dispatch('DELETE_CARD', {deck_id: this.deck.id, card_id: id})
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
