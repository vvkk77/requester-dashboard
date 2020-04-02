import Vue from 'vue';
import Vuex from 'vuex';
import EPassService from '../service/EPassService';
import { showError } from '../utils/toast';

Vue.use(Vuex);

let reqOrderList = localStorage.getItem('reqOrderList');

if (reqOrderList) {
    reqOrderList = JSON.parse(reqOrderList);
}

export default new Vuex.Store({
    state: {
        orderList: reqOrderList || []
    },

    mutations: {
        setOrderList(state, list) {
            state.orderList = list;
        }
    },
    actions: {
        async fetchOrders({ commit }) {
            try {
                const { data } = await EPassService.getOrders();

                commit('setOrderList', data.orders);

                localStorage.setItem(
                    'reqOrderList',
                    JSON.stringify(data.orders)
                );
            } catch (error) {
                showError('Unable to fetch requests');
            }
        }
    }
});
