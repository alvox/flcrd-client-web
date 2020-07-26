import axios from 'axios';
import {getInstance} from "../auth/index";

const ApiService = {

    _401interceptor: null,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    async getPublic(resource) {
        return await axios.get(resource)
    },

    async get(resource) {
        const token = await getInstance().getTokenSilently()
        return await axios.get(resource, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    async post(resource, data) {
        const token = await getInstance().getTokenSilently()
        return await axios.post(resource, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    async put(resource, data) {
        const token = getInstance().getTokenSilently()
        return await axios.put(resource, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    async delete(resource) {
        const token = await getInstance().getTokenSilently()
        return await axios.delete(resource, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

};

export default ApiService