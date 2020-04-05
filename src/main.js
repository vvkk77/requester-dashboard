import Vue from 'vue';
import App from './App';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';
import './scss/main.scss';
import './setup-plugins';
import VueAxios from 'vue-axios';
import auth from '@/utils/auth';
import request from './utils/request';

Vue.router = router;
Vue.use(VueAxios, request);
auth();

Vue.config.productionTip = false;

export default new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
