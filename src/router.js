import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddDeck from "@/components/AddDeck"
import Decks from "@/components/Decks"
import Flashcards from "@/components/Flashcards"
import AddFlashcard from "@/components/AddFlashcard"
import Registration from "@/components/Registration"
import Login from "@/components/Login"

import {TokenService} from "./store/token"

Vue.use(Router);

const router =  new Router({
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
            path: '/decks',
            name: 'Decks',
            component: Decks
        },
        {
            path: '/add-deck',
            name: 'AddDeck',
            component: AddDeck
        },
        {
            path: '/:deck_id/flashcards',
            name: 'Flashcards',
            component: Flashcards,
        },
        {
            path: '/:deck_id/add-flashcard',
            name: 'AddFlashcard',
            component: AddFlashcard
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = !!TokenService.getToken();

    if (!isPublic && !loggedIn) {
        return next({
            path:'/login',
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