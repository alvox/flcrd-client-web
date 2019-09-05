const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const TokenService = {
    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    },

    saveAccessToken(accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    },

    removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    saveRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
};

export { TokenService }