<template>
    <div>
        <transition mode="out-in" name="fade">
            <b-table
                :current-page.sync="currentPage"
                :data="orderList"
                :default-sort-direction="defaultSortDirection"
                :paginated="isPaginated"
                :pagination-position="paginationPosition"
                :per-page="perPage"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                v-if="orderList.length > 0"
            >
                <template slot-scope="props">
                    <b-table-column
                        field="createdAt"
                        label="Raised on"
                        sortable
                    >
                        <div class="has-text-dark is-size-6">
                            {{ props.row.createdAt | formatDate }}
                        </div>
                        <div class="has-text-grey is-size-6">
                            {{ props.row.createdAt | formatTime }}
                        </div>
                    </b-table-column>

                    <b-table-column
                        field="orderType"
                        label="Request Type"
                        sortable
                    >
                        <lozenge
                            :type="
                                props.row.orderType == 'person'
                                    ? 'primary'
                                    : 'warning'
                            "
                            >{{
                                props.row.orderType | formatRequestLabel
                            }}</lozenge
                        >
                    </b-table-column>

                    <b-table-column
                        field="requestCount"
                        label="No. of Passes"
                        sortable
                        >{{ props.row.requestCount }}</b-table-column
                    >

                    <b-table-column field="purpose" label="Purpose" sortable>
                        {{ props.row.purpose }}
                    </b-table-column>

                    <b-table-column field="orderStatus" label="Status" sortable>
                        <span
                            :class="
                                `has-text-${getStatusClass(
                                    props.row.orderStatus
                                )}`
                            "
                            class="has-text-weight-bold is-uppercase"
                            >{{
                                props.row.orderStatus | formatStatusLabel
                            }}</span
                        >
                    </b-table-column>
                    <b-table-column field="zipFileURL" label=" ">
                        <b-button
                            @click="downloadQRCodes(props.row.id)"
                            class="has-text-primary has-text-weight-semibold"
                            icon-left="download"
                            size="is-small"
                            tag="a"
                            type="is-white"
                            v-if="props.row.zipFileURL"
                            >DOWNLOAD QR</b-button
                        >
                    </b-table-column>
                </template>

                <template slot="bottom-left">
                    <span class="is-size-7 has-text-weight-bold m-r-8"
                        >Request per page:</span
                    >
                    <b-select
                        placeholder="Select a character"
                        size="is-small"
                        v-model="perPage"
                    >
                        <option
                            :key="index"
                            :value="item"
                            v-for="(item, index) in [10, 25, 50]"
                            >{{ item }}</option
                        >
                    </b-select>
                </template>
            </b-table>

            <div class="no-request-image" v-else>
                <img alt src="../assets/no-request.png" />
            </div>
        </transition>
    </div>
</template>

<script>
import Lozenge from './Lozenge.vue';
import dayjs from 'dayjs';
import EPassService from '../service/EPassService';
import { showSuccess, showError } from '../utils/toast';

export default {
    name: 'OrdersTable',

    components: {
        Lozenge
    },
    data() {
        return {
            isPaginated: true,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            perPage: 10
        };
    },

    computed: {
        orderList() {
            return this.$store.state.orderList;
        }
    },

    filters: {
        formatDate(date) {
            return dayjs(new Date(date)).format('DD MMM YY');
        },
        formatTime(date) {
            return dayjs(new Date(date)).format('hh:mm A');
        },

        formatRequestLabel(request) {
            return request.toLowerCase() === 'person'
                ? 'Individual'
                : 'Vehicle';
        },

        formatStatusLabel(status) {
            status = status.replace('_', ' ');

            if (status.toLowerCase() === 'created') return 'PENDING';
            if (status.toLowerCase() === 'declined') return 'REJECTED';

            return status;
        }
    },

    methods: {
        fetchOrders() {
            this.$store.dispatch('fetchOrders');
        },

        async downloadQRCodes(orderId) {
            try {
                const { data } = await EPassService.downloadQRCodes(orderId);
                const url = data.processedS3URL;

                const ele = document.createElement('a');
                ele.setAttribute('download', 'download');
                ele.href = url;

                ele.click();

                showSuccess(`QR codes downloaded successfully`);
            } catch (error) {
                showError(`Unable to download QR codes`);
            }
        },
        getStatusClass(status) {
            if (status.match('created|processing')) return 'warning';

            if (status.match('declined|failed|invalid_file')) return 'danger';

            if (status.match('approved')) return 'success';

            return 'primary';
        }
    },
    created() {
        this.fetchOrders();
    }
};
</script>

<style lang="scss"></style>
