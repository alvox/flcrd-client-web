import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import User from "./views/user/User"
import Terms from "./views/Terms"
import VerifyEmail from "./views/user/VerifyEmail"
import Decks from "./views/deck/Decks"
import FlashcardsList from "./views/flashcard/FlashcardsList"
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
            path: '/cards',
            name: 'FlashcardsList',
            component: FlashcardsList,
            props: true,
            meta: {
                public: true
            }
        },
        {
            path: '/practice',
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