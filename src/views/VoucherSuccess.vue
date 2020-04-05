<template>
    <div>
        <app-header />
        <section class="page-wrap voucher-section">
            <div class="container">
                <lab-logo />
                <div class="columns">
                    <div
                        class="column is-half is-offset-one-quarter is-full-mobile"
                    >
                        <div
                            class="voucher-details invalid-voucher has-text-centered"
                        >
                            <h2 class="has-text-primary">Success!</h2>
                            <p class="data">Voucher redeemed successfully!</p>
                            <a class="button">Go back</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import LabLogo from '../components/LabLogo.vue';

export default {
    components: { AppHeader, LabLogo }
};
</script>

<style lang="scss" scoped>
.data {
    margin-bottom: 1rem;
}
</style>
