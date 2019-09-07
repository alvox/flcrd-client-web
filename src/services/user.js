import ApiService from './api'
import {TokenService} from './token'

const EMAIL_KEY = 'user_email';
const NAME_KEY = 'user_name';

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
                saveTokensAndSetHeader(result.data.token);
                saveCredentials(result.data.email, result.data.name);
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
                saveTokensAndSetHeader(result.data.token);
                saveCredentials(result.data.email, result.data.name);
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
        return ApiService.post("users/refresh", requestData)
            .then(result => {
                saveTokensAndSetHeader(result.data)
            })
    },

    logout() {
        TokenService.removeAccessToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        removeCredentials();
        ApiService.unmount401Interceptor()
    }

};

function saveTokensAndSetHeader(tokens) {
    TokenService.saveAccessToken(tokens.access_token);
    TokenService.saveRefreshToken(tokens.refresh_token);
    ApiService.setHeader();
}

function saveCredentials(email, name) {
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(NAME_KEY, name);
}

function removeCredentials() {
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(NAME_KEY);
}

export {UserService}