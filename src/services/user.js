import ApiService from './api'
import {TokenService} from './token'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode
    }
}

const UserService = {

    register: async function (name, email, password) {
        let requestData = {
            name: name,
            email: email,
            password: password
        };
        return ApiService.post("users/register", requestData)
            .then(result => {
                TokenService.saveToken(result.data.token.auth_token);
                ApiService.setHeader();
                // ApiService.mount401Interceptor();
                return {
                    userName: result.data.name,
                    userEmail: result.data.email,
                    userToken: result.data.token.auth_token
                }
            })
            .catch(e => {
                console.log(e);
                throw new AuthenticationError(e.response.status, e.response.data.detail)
            })
    },

    login: async function (email, password) {
        let requestData = {
            email: email,
            password: password
        };
        return ApiService.post("users/login", requestData)
            .then(result => {
                TokenService.saveToken(result.data.token.auth_token);
                ApiService.setHeader();
                // ApiService.mount401Interceptor();
                return {
                    userName: result.data.name,
                    userEmail: result.data.email,
                    userToken: result.data.token.auth_token
                }
            })
            .catch(e => {
                console.log(e);
                throw new AuthenticationError(e.response.status, e.response.data.detail)
            })
    },

    logout() {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        // ApiService.unmount401Interceptor()
    }

};

export default UserService
export {UserService, AuthenticationError}