<template>
    <section class="page-wrap">
        <div class="content-wrap">
            <div class="logo">
                <img src="../assets/path-logo.svg" alt />
            </div>
            <form class="log-in-form">
                <h2 class="text-center">Enter the Voucher id to redeem it</h2>
                <b-field label="Voucher id" :label-position="labelPosition">
                    <b-input></b-input>
                </b-field>

                <b-button type="is-primary">Verify</b-button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {}
};
</script>

<style lang="scss" scoped></style>
