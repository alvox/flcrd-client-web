import ApiService from './api'

const UserService = {

    confirmEmail(code) {
        return ApiService.post("users/activate/" + code)
    },

    resendConfirmation() {
        return ApiService.post("users/code")
    },

};

export {UserService}