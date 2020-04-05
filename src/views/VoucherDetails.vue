<template>
    <section class="page-wrap voucher-section">
        <div class="container">
            <div class="columns">
                <div class="column is-1 is-offset-5">
                    <div class="logo">
                        <img src="../assets/path-logo.svg" alt />
                    </div>
                </div>
            </div>
            <div class="columns">
                <div
                    class="column is-half is-offset-one-quarter is-full-mobile"
                >
                    <div class="voucher-details">
                        <h2 class="text-center title">
                            This voucher is assigned to:
                        </h2>
                        <div class="columns">
                            <div class="column is-full">
                                <span
                                    class="has-text-weight-bold label is-inline-block"
                                    >Name:</span
                                >
                                <span>User Name</span>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-half">
                                <span
                                    class="has-text-weight-bold label is-inline-block"
                                    >Gender:</span
                                >
                                <span>M / F</span>
                            </div>
                            <div class="column is-half">
                                <span
                                    class="has-text-weight-bold label is-inline-block"
                                    >Age:</span
                                >
                                <span>25</span>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-full">
                                <span
                                    class="has-text-weight-bold label is-inline-block"
                                    >Document:</span
                                >
                                <span>Aadhaar Card</span>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-full">
                                <span
                                    class="has-text-weight-bold label is-inline-block"
                                    >Last 4 digits:</span
                                >
                                <span>1234</span>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-half">
                                <b-button type="is-primary">Redeem</b-button>
                            </div>
                            <div class="column is-half has-text-right">
                                <b-button>Cancel</b-button>
                            </div>
                        </div>
                    </div>
                    <div
                        class="voucher-details invalid-voucher has-text-centered"
                        v-if="false"
                    >
                        <h2>Oops!</h2>
                        <p>Looks like this is an invalid / used voucher</p>
                        <a class="button">Go back</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {}
};
</script>

<style lang="scss" scoped>
.label {
    margin-right: 1rem;
}
</style>
