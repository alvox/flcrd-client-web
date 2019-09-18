import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddDeck from "@/components/AddDeck"
import Decks from "@/components/Decks"
import FlashcardsList from "@/components/FlashcardsList";
import EditFlashcard from "@/components/EditFlashcard"
import Registration from "@/components/Registration"

import Login from "@/components/Login"
import {TokenService} from "./services/token"
import PracticeMode from "./components/PracticeMode";

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
            path: '/add-deck/:deck_id',
            name: 'AddDeck',
            component: AddDeck
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
            props: true
        },
        {
            path: '/:deck_id/practice',
            name: 'PracticeMode',
            component: PracticeMode,
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