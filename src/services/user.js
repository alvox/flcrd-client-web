import ApiService from './api'
import {TokenService} from './token'

const EMAIL_KEY = 'user_email';
const NAME_KEY = 'user_name';

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode
    }
}

const UserService = {

    getUserName() {
        return localStorage.getItem(NAME_KEY);
    },

    getUserEmail() {
        return localStorage.getItem(EMAIL_KEY);
    },

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
                this.saveCredentials(result.data.email, result.data.name);
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
                this.saveCredentials(result.data.email, result.data.name);
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
        this.removeCredentials()
        // ApiService.unmount401Interceptor()
    },

    saveCredentials(email, name) {
        localStorage.setItem(EMAIL_KEY, email);
        localStorage.setItem(NAME_KEY, name);
    },

    removeCredentials() {
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(NAME_KEY);
    }

};

export default UserService
export {UserService, AuthenticationError}