import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddDeck from "@/components/AddDeck"
import Flashcards from "@/components/Flashcards"

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/add-deck',
            name: 'AddDeck',
            component: AddDeck
        },
        {
            path: '/:deck_id/flashcards',
            name: 'Flashcards',
            component: Flashcards
        }
    ]
})
