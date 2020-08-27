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

import {TokenService} from "./services/token"

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
            component: User
        },
        {
            path: '/confirm/:code',
            name: 'VerifyEmail',
            component: VerifyEmail
        },
        {
            path: '/decks',
            name: 'Decks',
            component: Decks
        },
        {
            path: '/add-deck/:deck_id',
            name: 'AddDeck',
            component: AddDeck
        },
        {
            path: '/cards',
            name: 'FlashcardsList',
            component: FlashcardsList,
            props: true,
            meta: {
                public: true
            }
        },
        {
            path: '/:deck_id/edit-flashcard',
            name: 'EditFlashcard',
            component: EditFlashcard,
            props: true
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

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = !!TokenService.getAccessToken();

    if (!isPublic && !loggedIn) {
        return next({
            path: '/login',
            query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
        });
    }
    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next('/')
    }
    next();
});

export default router;