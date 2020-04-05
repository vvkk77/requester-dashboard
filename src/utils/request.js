import axios from 'axios';
import { SHOW_LOADING, HIDE_LOADING } from '../utils/contants';
import dotprop from 'dot-prop';
import { isProd, isGithub } from '../utils/helpers';
import qs from 'qs';

const BASE_URL = (() => {
    const DEFAULT_API = 'https://viruscorona.co.in';
    const EPASS_API = `${window.location.protocol}//${window.location.hostname}/ecurfew`;

    if (!isProd || isGithub) {
        return DEFAULT_API;
    }

    return EPASS_API;
})();

const service = axios.create({
    baseURL: BASE_URL + '/',
    timeout: 25000,
    paramsSerializer: params => {
        // app.$Progress.start()
        return qs.stringify(params, {
            encode: false,
            arrayFormat: 'brackets'
        });
    }
});

// axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers['Content-Type'] = 'application/json';

const showLoader = () => {
    window.dispatchEvent(new CustomEvent(SHOW_LOADING));
};

const hideLoader = () => {
    window.dispatchEvent(new CustomEvent(HIDE_LOADING));
};

// Add a request interceptor
service.interceptors.request.use(
    function(config) {
        showLoader();
        return config;
    },
    function(error) {
        hideLoader();
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    function(response) {
        hideLoader();
        return response;
    },
    function(error) {
        const message = dotprop.get(error, 'response.data.message');
        if (String(message).indexOf('invalid token') > -1) {
            window.dispatchEvent(new CustomEvent('LOGIN'));
            return Promise.reject();
        }

        hideLoader();
        return Promise.reject(error);
    }
);

export default service;
