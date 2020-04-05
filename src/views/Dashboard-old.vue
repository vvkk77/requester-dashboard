<template>
    <div>
        <app-header></app-header>
        <div class="app-body">
            <div class="container">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item org-details">
                            <div
                                class="has-text-black is-size-5 has-text-weight-semibold"
                            >
                                {{ totalOrders | formatNumber }} Requests
                            </div>
                            <div class="seperator"></div>
                            <div
                                class="is-block has-text-black has-text-weight-semibold"
                            >
                                <div class="is-size-5">{{ org.name }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <b-button
                                @click="openCreateRequest"
                                type="is-primary"
                                >Create Request</b-button
                            >
                        </div>
                    </div>
                </div>

                <orders-table></orders-table>
            </div>
        </div>
        <create-request
            @close="openCR = false"
            @success="onOrderSuccess"
            v-if="openCR"
        ></create-request>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import CreateRequest from '../components/CreateRequest.vue';
import EPassService from '../service/EPassService';
import OrdersTable from '../components/OrdersTable.vue';
import { showError } from '../utils/toast';

export default {
    name: 'Dashboard',
    components: {
        AppHeader,
        CreateRequest,
        OrdersTable
    },
    data() {
        let org = localStorage.getItem('org');

        if (org) {
            org = JSON.parse(org);
        }

        return {
            openCR: false,
            org: org || {}
        };
    },

    computed: {
        totalOrders() {
            return this.$store.state.orderList.length;
        }
    },
    filters: {
        formatNumber(number) {
            return new Intl.NumberFormat('en-IN').format(number);
        }
    },
    methods: {
        openCreateRequest() {
            this.openCR = true;
        },

        async fetchOrg() {
            try {
                const { data } = await EPassService.getOrganization();

                this.org = data;
                localStorage.setItem('org', JSON.stringify(data));
            } catch (error) {
                showError('Unable to fetch organization');
            }
        },

        onOrderSuccess() {
            this.openCR = false;

            this.$store.dispatch('fetchOrders');
        }
    },

    mounted() {
        this.fetchOrg();
    }
};
</script>

<style lang="scss">
.app-body {
    padding: 40px 80px 0;
    border-top: 1px solid #ededed;
    button {
        height: 40px;
        font-weight: 600;
    }
}

.no-request-image {
    text-align: center;
    padding: 80px 0;
    img {
        width: 50%;
        max-width: 480px;
    }
}

.org-details {
    .seperator {
        height: 3rem;
        width: 0;
        border: 2px solid #ededed;
        margin: 0 1rem;
    }
}

.toast {
    font-weight: 600;
}
</style>
