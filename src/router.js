import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import User from "./views/User"
import Terms from "./views/Terms"
import VerifyEmail from "./views/VerifyEmail"
import Decks from "./views/Decks"
import FlashcardsList from "./views/FlashcardsList"
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
            path: '/profile',
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
    const isPublic = to.matched.some(record => record.meta.public)
    const loggedIn = !!TokenService.getAccessToken()

    if (!isPublic && !loggedIn) {
        return next("/")
    }
    if (loggedIn && to.name === "Index") {
        return next("/decks")
    }
    next()
})

export default router