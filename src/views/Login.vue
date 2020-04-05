<template>
    <section class="page-wrap">
        <div class="content-wrap">
            <div class="logo">
                <img src="../assets/path-logo.svg" alt />
            </div>
            <form ref="otpForm" class="log-in-form" v-if="otpForm">
                <h2 class="text-center">
                    Enter your Phone Number to get an OTP
                </h2>
                <b-field label="Phone Number">
                    <b-input></b-input>
                </b-field>
                <b-button type="is-primary" @click="requestOtp">
                    Get OTP
                </b-button>
            </form>
            <form
                ref="loginForm"
                class="log-in-form"
                v-else
                @submit.prevent="attemptLogin"
            >
                <h2 class="text-center">Login with your OTP</h2>
                <b-field label="Phone Number">
                    <b-input></b-input>
                </b-field>
                <b-field label="OTP">
                    <b-input></b-input>
                </b-field>
                <b-button type="is-primary">Login</b-button>
                <p class="text-center" @click="$refs.loginForm.submit()">
                    <a href="#">Resend OTP</a>
                </p>
            </form>
        </div>
    </section>
</template>

<script>
import authService from '../service/auth';

export default {
    name: 'Login',
    components: {},
    data() {
        return {
            otpForm: true,
            form: {
                phoneNumber: '',
                otp: ''
            }
        };
    },
    methods: {
        requestOtp() {
            return authService
                .requestOtp(this.phoneNumber)
                .then(() => {
                    this.otpForm = false;
                })
                .catch(() => {
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: `Something's not right. Please try again later.`,
                        type: 'is-danger'
                    });
                });
        },
        attemptLogin() {
            console.log('attempt login');
        }
    }
};
</script>

<style lang="scss" scoped></style>
