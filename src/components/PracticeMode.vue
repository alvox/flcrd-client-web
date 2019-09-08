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
        </div>
    <div class="mx-auto max-w-2xl rounded-lg mt-4">
        <div class="flex justify-between border-2 rounded-lg border-b-0 rounded-b-none border-gray-400 bg-white">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800"><span class="font-thin">Practice</span> {{ deck.name }}</p>
        </div>
        <div class="block border-2 border-gray-400 rounded-lg rounded-t-none bg-white">
            <div class="text-center mt-10">{{currentIdx+1}} of {{deck.cards.length}}</div>
            <div class="flex justify-between">
                <div class="w-1/4"></div>
                <div class="flex-1 bg-gray-100 border-2 border-gray-400 rounded-lg mt-10 mb-10 p-4">
                    <p class="break-all">{{ side === 'front' ? currentCard.front : currentCard.rear }}</p>
                </div>
                <div class="w-1/4"></div>
            </div>
            <div class="flex justify-between">
                <div class="w-1/4"></div>
                <div class="flex-1" >
                    <div class="block">
                            <p class="text-center text-gray-700 font-semibold  border border-gray-400 hover:text-purple-600 hover:border-purple-600 rounded-lg mt-10 p-2 cursor-pointer" @click="flip">Flip</p>
                        <div class="flex justify-between mt-10 mb-10">
                            <p class="flex-1 text-center text-green-900 bg-green-100 border border-green-400 hover:bg-green-200 hover:border-green-500 rounded-lg p-2 mr-4 cursor-pointer" @click="next(true)">
                                <span class="text-2xl">😁</span><br>I was right!
                            </p>
                            <p class="flex-1 text-center text-red-900 bg-red-100 border border-red-400 hover:bg-red-200 hover:border-red-500 rounded-lg p-2 ml-4 cursor-pointer" @click="next(false)">
                                <span class="text-2xl">😧</span><br>I was wrong...
                            </p>
                        </div>
                    </div>

                </div>
                <div class="w-1/4"></div>
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
                side: "front",
                currentIdx: 0,
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
                if (this.currentIdx+1 === this.deck.cards.length) {
                    //we're done
                    return
                }
                this.currentIdx++;
                this.side = "front"
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
                return this.deck.cards[this.currentIdx]
            },
        },
    }
</script>

<style>

</style>