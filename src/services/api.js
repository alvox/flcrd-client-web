import axios from 'axios';
import {TokenService} from "./token";
import {store} from '../store/store'

const ApiService = {

    _401interceptor: null,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getAccessToken()}`
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
     **/
    customRequest(data) {
        return axios(data)
    },

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.request.status === 401) {
                    console.log('401. Refreshing...');
                    if (error.config.url.includes('/refresh')) {
                        // Refresh token has failed. Logout the user.
                        await store.dispatch('LOGOUT_USER');
                        throw error
                    } else {
                        // Refresh the access token
                        try {
                            await store.dispatch('REFRESH_TOKEN', {
                                accessToken: TokenService.getAccessToken(),
                                refreshToken: TokenService.getRefreshToken()
                            });
                            // Retry the original request
                            console.log('Retrying original request...');
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data
                            })
                        } catch (e) {
                            console.log(e);
                            // Refresh has failed - reject the original request
                            throw error
                        }
                    }
                }
                // If error was not 401 just reject as is
                throw error
            }
        )
    },

    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor)
    }

};

export default ApiService