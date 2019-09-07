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

    register(name, email, password) {
        let requestData = {
            name: name,
            email: email,
            password: password
        };
        return ApiService.post("users/register", requestData)
            .then(result => {
                TokenService.saveAccessToken(result.data.token.access_token);
                TokenService.saveRefreshToken(result.data.token.refresh_token);
                ApiService.setHeader();
                this.saveCredentials(result.data.email, result.data.name);
                ApiService.mount401Interceptor();
                return {
                    userName: result.data.name,
                    userEmail: result.data.email,
                }
            })
    },

    login(email, password) {
        let requestData = {
            email: email,
            password: password
        };
        return ApiService.post("users/login", requestData)
            .then(result => {
                TokenService.saveAccessToken(result.data.token.access_token);
                TokenService.saveRefreshToken(result.data.token.refresh_token);
                ApiService.setHeader();
                this.saveCredentials(result.data.email, result.data.name);
                ApiService.mount401Interceptor();
                return {
                    userName: result.data.name,
                    userEmail: result.data.email,
                }
            })
    },

    refreshToken(accessToken, refreshToken) {
        let requestData = {
            access_token: accessToken,
            refresh_token: refreshToken
        };
        return ApiService.post("/users/refresh", requestData)
            .then(result => {
                TokenService.saveAccessToken(result.data.access_token);
                TokenService.saveRefreshToken(result.data.refresh_token);
                ApiService.setHeader();
            })
    },

    logout() {
        TokenService.removeAccessToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        this.removeCredentials();
        ApiService.unmount401Interceptor()
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