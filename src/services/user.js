import ApiService from './api'
import {TokenService} from './token'

const ID_KEY = 'user_id';
const NAME_KEY = 'user_name';

const UserService = {

    getUserName() {
        return localStorage.getItem(NAME_KEY);
    },

    getUserId() {
        return localStorage.getItem(ID_KEY);
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
                saveCredentials(result.data.id, result.data.name);
                ApiService.mount401Interceptor();
                return {
                    userName: result.data.name,
                    userId: result.data.id,
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
                saveCredentials(result.data.id, result.data.name);
                ApiService.mount401Interceptor();
                return {
                    userName: result.data.name,
                    userId: result.data.id,
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

function saveCredentials(id, name) {
    localStorage.setItem(ID_KEY, id);
    localStorage.setItem(NAME_KEY, name);
}

function removeCredentials() {
    localStorage.removeItem(ID_KEY);
    localStorage.removeItem(NAME_KEY);
}

export {UserService}