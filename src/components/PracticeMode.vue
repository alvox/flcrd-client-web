<template>
    <div>
<!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex items-center my-4 cursor-pointer text-gray-700 hover:text-purple-700" @click="goBack">
                <svg class="fill-current inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
                </svg>
                <p class="font-thin ml-2">Back</p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl rounded-lg mt-10 md:mt-0">
            <div class="flex justify-between border-2 rounded-t-lg border-b-0 border-gray-400 bg-white">
                <p class="section-header">
                    <span>Practicing </span>{{deck.name }}
                </p>
            </div>
            <div v-if="!isDone" class="block border-2 border-gray-400 rounded-b-lg bg-white">
                <div class="text-center text-base font-thin text-gray-800 my-6 mx-10">
                    <p>Look at the card and try to remember what was at the rear side.<br/>Then flip the card and check yourself!</p>
                </div>
                <div class="text-center font-extrabold text-sm text-gray-700">{{currentIdx+1}} of
                    {{cardsToPractice.length}}
                </div>
                <div class="flex justify-between h-64">
                    <div class="w-1/4"></div>
                    <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-lg mt-4 mb-5 p-4 align-middle overflow-auto">
                        <p class="break-words text-gray-800">
                            {{ side === 'front' ? currentCard.front : currentCard.rear }}
                        </p>
                    </div>
                    <div class="w-1/4"></div>
                </div>
                <div class="flex justify-between">
                    <div class="w-1/4"></div>
                    <div class="flex-1">
                        <div class="block">
                            <p class="text-center tracking-wide text-gray-700 font-extrabold  border border-gray-400 hover:text-purple-600 hover:border-purple-600 rounded-lg p-2 cursor-pointer"
                               @click="flip">Flip card</p>
                            <div class="flex justify-around mt-10">
                                <p class="mr-4 font-semibold text-xl text-green-700">{{correctAnswers.length}}</p>
                                <p class="ml-4 font-semibold text-xl text-red-700">{{wrongAnswers.length}}</p>
                            </div>
                            <div class="flex justify-between mt-2 mb-10">
                                <p class="flex-1 text-center text-green-900 bg-green-100 border border-green-400 hover:bg-green-200 hover:border-green-500 rounded-lg p-2 mr-4 cursor-pointer select-none"
                                   @click="next(true)">
                                    <span class="text-2xl">😁</span><br>I was right!
                                </p>
                                <p class="flex-1 text-center text-red-900 bg-red-100 border border-red-400 hover:bg-red-200 hover:border-red-500 rounded-lg p-2 ml-4 cursor-pointer select-none"
                                   @click="next(false)">
                                    <span class="text-2xl">😧</span><br>I was wrong...
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/4"></div>
                </div>
            </div>
            <!-- RESULTS -->
            <div v-else class="block border-2 border-gray-400 rounded-b-lg bg-white">
                <p class="text-center mt-20 text-4xl font-bold tracking-wide text-gray-800">Done! <span v-if="allCorrect">👏😎</span> </p>
                <p v-if="allCorrect" class="text-center mt-5 text-gray-800">You've remembered all cards from this
                    deck!</p>
                <p v-else class="text-center mt-5 text-gray-800">You've remembered {{correctAnswers.length}}
                    {{correctAnswers.length === 1 ? 'card' : 'cards'}} out of {{deck.cards.length}}.</p>
                <div class="flex mx-32 my-10 mb-20">
                    <p class="flex-1 border py-2 mr-10 text-center text-gray-800 rounded-lg cursor-pointer hover:text-purple-600 hover:border-purple-600"
                       :class="{'ml-10' : correctAnswers.length === 0 || wrongAnswers.length === 0}"
                       @click="repeat(false)">Repeat all cards</p>
                    <p v-if="correctAnswers.length !== 0 && wrongAnswers.length !== 0"
                       class="flex-1 border p-2 ml-10 text-center text-gray-800 rounded-lg cursor-pointer hover:text-purple-600 hover:border-purple-600"
                       @click="repeat(true)">
                        Repeat {{wrongAnswers.length}} {{wrongAnswers.length === 1 ? 'card' : 'cards'}}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PracticeMode",
        data() {
            return {
                isDone: false,
                side: "front",
                currentIdx: 0,
                cardsToPractice: [],
                correctAnswers: [],
                wrongAnswers: []
            }
        },
        methods: {
            flip() {
                if (this.side === "front") {
                    this.side = "rear"
                } else {
                    this.side = "front"
                }
            },
            next(isCorrect) {
                if (isCorrect) {
                    this.correctAnswers.push(this.currentCard)
                } else {
                    this.wrongAnswers.push(this.currentCard)
                }
                if (this.currentIdx + 1 === this.cardsToPractice.length) {
                    this.isDone = true;
                    return
                }
                this.currentIdx++;
                this.side = "front"
            },
            repeat(onlyFailed) {
                if (onlyFailed) {
                    this.cardsToPractice = this.wrongAnswers
                } else {
                    this.cardsToPractice = this.deck.cards
                }
                this.wrongAnswers = [];
                this.correctAnswers = [];
                this.isDone = false;
                this.side = "front";
                this.currentIdx = 0;
            },
            goBack() {
                this.$router.back()
            }
        },
        computed: {
            deck() {
                return this.$store.getters.deck(this.$route.params.deck_id)
            },
            currentCard() {
                return this.cardsToPractice[this.currentIdx]
            },
            allCorrect() {
                return this.wrongAnswers.length === 0
            },
        },
        created() {
            this.cardsToPractice = this.deck.cards
        }
    }
</script>

<style></style>