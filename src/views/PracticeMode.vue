<template>
    <div class="mt-6">
        <p class="text-3xl mb-6">Practicing {{ deck.name }}</p>

        <div v-if="!isDone" class="my-10">
            <div class="text-base text-copy-secondary mt-6 mb-10">
                <p>
                    Look at the card and try to remember what was at the rear side.
                    <br/>
                    Then flip the card and check yourself!
                </p>
            </div>

            <div class="h-12"></div>

            <div class="flex justify-center h-40">
                <div v-if="side === 'front'" class="w-2/4 bg-background-ternary shadow-md cursor-pointer" @click="flip">
                    <div v-if="currentCard.front_type === 'IMAGE'" class="h-full">
                        <img class="object-contain h-full w-full" :src="s3 + currentCard.front" alt="front"/>
                    </div>
                    <div v-else class=" h-full p-4 mx-4 md:mx-0 flex items-center justify-center">
                        <p class="text-base text-center">{{ currentCard.front }}</p>
                    </div>
                </div>

                <div v-else class="w-2/4 bg-background-ternary shadow-md cursor-pointer" @click="flip">
                    <div v-if="currentCard.rear_type === 'IMAGE'" class="h-full">
                        <img class="object-contain h-full w-full" :src="s3 + currentCard.rear" alt="front"/>
                    </div>
                    <div v-else class="h-full p-4 mx-4 md:mx-0 flex items-center justify-center">
                        <p class="text-base text-center">{{ currentCard.rear }}</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-10">
                <div class="my-6 w-2/4">
                    <p class="text-center text-lg pt-4 pb-4">
                        Card {{ currentIdx + 1 }} of {{ cardsToPractice.length }}
                    </p>
                    <div class="flex justify-around px-6">
                        <div class="flex flex-col items-center">
                            <p class="text-green-600 text-5xl font-bold">{{ correctAnswers.length }}</p>
                            <NavButton title="+" @clicked="next(true)"/>
                        </div>
                        <p class="text-5xl">:</p>
                        <div class="flex flex-col items-center">
                            <p class="text-red-600 text-5xl font-bold">{{ wrongAnswers.length }}</p>
                            <NavButton title="+" @clicked="next(false)"/>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <!-- RESULTS -->
        <div v-else class="block text-copy-secondary text-center">
            <p class="mt-20 text-4xl font-bold tracking-wide">Done!</p>
            <p v-if="allCorrect" class="text-4xl">👏 🎉 🤓</p>
            <p v-if="allCorrect" class="mt-5">
                You've remembered all cards from this deck!
            </p>
            <p v-else class="text-center mt-5">
                You've remembered {{ correctAnswers.length }} {{ correctAnswers.length === 1 ? 'card' : 'cards' }}
                out of {{ deck.cards.length }}.
            </p>
            <div class="flex flex-col mx-4 md:mx-32 my-10 mb-20">
                <NavButton title="Repeat all cards" @clicked="repeat(false)" class="mb-4"/>
                <NavButton v-if="correctAnswers.length !== 0 && wrongAnswers.length !== 0" title="Repeat only errors"
                           @clicked="repeat(true)"/>
            </div>
        </div>
    </div>
</template>

<script>
import {SettingsService} from "@/services/settings"
import NavButton from "@/components/NavButton"

export default {
    name: "PracticeMode",
    components: {NavButton},
    data() {
        return {
            deckId: "",
            isDone: false,
            side: "front",
            currentIdx: 0,
            cardsToPractice: [],
            correctAnswers: [],
            wrongAnswers: [],
            s3: process.env.VUE_APP_S3_URL
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
                this.cardsToPractice = this.shuffleCards(this.wrongAnswers)
            } else {
                this.cardsToPractice = this.shuffleCards(this.deck.cards)
            }
            this.wrongAnswers = [];
            this.correctAnswers = [];
            this.isDone = false;
            this.side = "front";
            this.currentIdx = 0;
        },
        goBack() {
            this.$router.back()
        },
        shuffleCards(cards) {
            let shuffled = [...cards];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled
        }
    },
    computed: {
        deck() {
            return this.$store.getters.deck(this.deckId)
        },
        currentCard() {
            return this.cardsToPractice[this.currentIdx]
        },
        allCorrect() {
            return this.wrongAnswers.length === 0
        },
    },
    created() {
        this.deckId = SettingsService.getDeckInfo().deckId
        this.cardsToPractice = this.shuffleCards(this.deck.cards)
    }
}
</script>
