import Vue from 'vue';

export default () => {
    Vue.use(require('@websanova/vue-auth'), {
        auth: {
            request: function(req, token) {
                this.options.http._setHeaders.call(this, req, {
                    Authorization: 'Bearer ' + token
                });
            },
            tokenName: 'token',
            response: function(res) {
                var headers = this.options.http._getHeaders.call(this, res);
                var token = headers.Authorization || headers.authorization;
                token = token || res.data.token;
                return token;
            }
        },
        rolesVar: 'role',
        http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
        router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
        loginData: {
            url: '/auth',
            method: 'POST',
            redirect: '/user',
            fetchUser: true
        },
        logoutData: { redirect: '/login' },
        refreshData: { url: 'auth/refresh', method: 'GET', enabled: false },
        fetchData: { url: '/user/me', method: 'GET', enabled: true },
        parseUserData: function(data) {
            return data;
        }
    });
};
