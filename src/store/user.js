import {UserService} from "@/services/user"
import router from "../router"
import ApiService from "../services/api"
import {TokenService} from "@/services/token"

export const UserState = {
    state: {
        userId: UserService.getUserId(),
        userName: UserService.getUserName(),
        user: null,
        accessToken: TokenService.getAccessToken(),
        refreshTokenPromise: null
    },
    getters: {
        loggedIn: (state) => {
            return !!state.userName && !!state.userId
        },
        userId: (state) => {
            return state.userId
        },
        userName: (state) => {
            return state.userName
        },
        user: (state) => {
            return state.user
        }
    },
    mutations: {
        authSuccess(state, payload) {
            state.userName = payload.userName
            state.userId = payload.userId
        },
        logoutSuccess(state) {
            state.accessToken = null
            state.userName = null
            state.userId = null
        },
        refreshTokenPromise(state, promise) {
            state.refreshTokenPromise = promise
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        REGISTER_USER: (context, payload) => {
            UserService.register(payload.name, payload.email, payload.password)
                .then(result => {
                    context.commit('authSuccess', result)
                    context.commit('clearError', null, {root: true})
                    context.commit('hideRegistrationModal', {root: true})
                    router.push({name: 'VerifyEmail', params: {code: 'email'}})
                })
                .catch(err => {
                    let r = err.response
                    if (r.status === 400 || r.status === 500) {
                        context.commit('apiError', {
                            errorCode: r.data.code,
                            errorMessage: r.data.message
                        }, {root: true})
                    }
                })
        },
        LOGIN_USER: (context, payload) => {
            UserService.login(payload.email, payload.password)
                .then(result => {
                    context.commit('authSuccess', result)
                    context.commit('clearError', null, {root: true})
                    context.commit('hideLoginModal', {root: true})
                    router.push({name: 'Decks'})
                })
                .catch(err => {
                    let r = err.response
                    if (r.status === 401 || r.status === 400 || r.status === 500) {
                        context.commit('apiError', {
                            errorCode: r.data.code,
                            errorMessage: r.data.message
                        }, {root: true})
                    }
                })
        },
        REFRESH_TOKEN: (context, payload) => {
            // If this is the first time the refreshToken has been called, make a request
            // otherwise return the same promise to the caller
            if (!context.state.refreshTokenPromise) {
                let p = UserService.refreshToken(payload.accessToken, payload.refreshToken)
                context.commit('refreshTokenPromise', p)
                // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
                // Clear the promise on error as well.
                p.then(result => {
                    context.commit('refreshTokenPromise', null)
                }).catch(err => {
                    console.log(err)
                    context.commit('refreshTokenPromise', null)
                })
            }
            return context.state.refreshTokenPromise
        },
        LOGOUT_USER: (context) => {
            UserService.logout()
            context.commit('logoutSuccess')
            router.push('/')
        },
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
                    context.commit('setUser', result.data)
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
                    UserService.logout()
                    context.commit('setUser', null)
                    context.commit('logoutSuccess')
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