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
        orderList: reqOrderList || [],
        stateMap: {}
    },

    mutations: {
        setOrderList(state, list) {
            state.orderList = list;
        },
        setStateList(store, list) {
            store.stateMap = list;
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
        },
        async fetchStateList({ commit }) {
            const { data: res } = await EPassService.fetchStateList();
            commit('setStateList', res.stateMap);
            localStorage.setItem('stateList', res.stateMap);
        }
    }
});
