import {UserService} from "../services/user"
import router from "../router"
import ApiService from "../services/api"

export const UserState = {
    state: {
        user: null,
    },
    getters: {
        user: (state) => {
            return state.user
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        CONFIRM_EMAIL: (context, payload) => {
            UserService.confirmEmail(payload.code)
                .then(result => {
                    router.push({name: 'Decks'})
                })
                .catch(err => {
                    console.log(err)
                    router.push({name: 'VerifyEmail', params: {code: 'error'}})
                })
        },
        RESEND_CONFIRMATION: (context) => {
            UserService.resendConfirmation()
                .then(result => {
                    router.push({name: 'VerifyEmail', params: {code: 'email'}})
                })
        },
        GET_USER: (context) => {
            context.commit('loading', true, {root: true})
            ApiService.get("users")
                .then(result => {
                    context.commit('setUser', result.data)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    context.commit('loading', false, {root: true})
                })
        },
        UPDATE_USER: (context, payload) => {
            context.commit('loading', true, {root: true})
            ApiService.put("users", payload)
                .then(result => {
                    // context.commit('setUser', result.data)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    context.commit('loading', false, {root: true})
                })
        },
        DELETE_USER: (context) => {
            ApiService.delete("users")
                .then(() => {
                    // UserService.logout()
                    // context.commit('setUser', null)
                    // context.commit('logoutSuccess')
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    router.push({name: 'Index'})
                })
        },
        CLEAR_USER: (context) => {
            context.commit('setUser', null)
        }
    }
}