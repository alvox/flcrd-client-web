import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Registration from "./views/user/Registration"
import Login from "./views/user/Login"
import User from "./views/user/User"
import Terms from "./views/Terms"
import VerifyEmail from "./views/user/VerifyEmail"
import Decks from "./views/deck/Decks"
import AddDeck from "./views/deck/AddDeck"
import FlashcardsList from "./views/flashcard/FlashcardsList"
import EditFlashcard from "./views/flashcard/EditFlashcard"
import PracticeMode from "./views/PracticeMode"

import { authGuard } from "./auth/authGuard"

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            meta: {
                public: true
            }
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration,
            props: true,
            meta: {
                public: true,
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                public: true,
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            beforeEnter: authGuard
        },
        {
            path: '/confirm/:code',
            name: 'VerifyEmail',
            component: VerifyEmail,
            beforeEnter: authGuard
        },
        {
            path: '/decks',
            name: 'Decks',
            component: Decks,
            beforeEnter: authGuard
        },
        {
            path: '/add-deck/:deck_id',
            name: 'AddDeck',
            component: AddDeck,
            beforeEnter: authGuard
        },
        {
            path: '/:deck_id/:visibility/flashcards/list',
            name: 'FlashcardsList',
            component: FlashcardsList,
            meta: {
                public: true
            }
        },
        {
            path: '/:deck_id/edit-flashcard',
            name: 'EditFlashcard',
            component: EditFlashcard,
            props: true,
            beforeEnter: authGuard
        },
        {
            path: '/:deck_id/practice',
            name: 'PracticeMode',
            component: PracticeMode,
            meta: {
                public: true
            }
        },
        {
            path: '/terms',
            name: 'Terms',
            component: Terms,
            props: true,
            meta: {
                public: true
            }
        }
    ]
});

export default router;