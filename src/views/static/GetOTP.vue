<template>
    <section class="page-wrap">
        <div class="content-wrap">
            <div class="logo">
                <img src="../../assets/path-logo.svg" alt="" />
            </div>
            <form class="log-in-form">
                <h2 class="text-center">
                    Enter your Phone Number to get an OTP
                </h2>
                <b-field label="Phone Number" :label-position="labelPosition">
                    <b-input></b-input>
                </b-field>

                <b-button type="is-primary">Get OTP</b-button>

                <p class="text-center"><a href="#">Resend OTP</a></p>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        console.log('add js here');
    }
};
</script>

<style lang="scss" scoped></style>
