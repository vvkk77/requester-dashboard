<template>
    <div class="login-form">
        <div class="title">Enter email</div>

        <section>
            <form @submit.prevent.stop>
                <b-field
                    :message="error.email"
                    :type="{ 'is-danger': !!error.email }"
                    label="Email"
                >
                    <b-input
                        @blur="validateEmail"
                        @focus="error.email = ''"
                        type="email"
                        v-model="user.email"
                    ></b-input>
                </b-field>

                <b-field
                    :message="error.state"
                    :type="{ 'is-danger': !!error.state }"
                    label="State"
                >
                    <b-select
                        :disabled="Object.keys(stateMap).length === 0"
                        @change="validateState"
                        @focus="error.state = ''"
                        expanded
                        placeholder="Select a state"
                        v-model="user.state"
                    >
                        <option
                            :key="index"
                            :value="state"
                            v-for="(state, index) in stateMap"
                            >{{ state }}</option
                        >
                    </b-select>
                </b-field>

                <div
                    class="is-size-7 has-text-danger has-text-weight-semibold"
                    v-if="apiError"
                >
                    {{ apiError }}
                </div>

                <div class="buttons m-y-48">
                    <b-button
                        :disabled="loading"
                        :loading="loading"
                        @click="requestOTP"
                        class="has-text-weight-bold"
                        expanded
                        native-type="submit"
                        type="is-primary"
                        >Get OTP</b-button
                    >
                </div>
            </form>

            <br />

            <div class="is-size-6">
                <a @click="$router.go(-1)" class="has-text-weight-semibold"
                    >Go back</a
                >
            </div>
        </section>
    </div>
</template>

<script>
import { isValidEmail } from '../utils/helpers';
import EPassService from '../service/EPassService';
import { getError } from '../utils/error-handler';

export default {
    name: 'LoginForm',
    components: {},
    data() {
        const email = sessionStorage.getItem('email');
        const state = sessionStorage.getItem('state');

        return {
            user: {
                email: email || '',
                state: state || null
            },
            error: {
                email: '',
                state: ''
            },
            loading: false,

            apiError: null
        };
    },

    computed: {
        stateMap() {
            return this.$store.state.stateMap;
        }
    },

    methods: {
        validateEmail() {
            this.error.email = '';
            if (!this.user.email) {
                this.error.email = 'Please enter email id';
            } else if (!isValidEmail(this.user.email.trim())) {
                this.error.email = 'Invalid email address';
            }
        },

        validateState() {
            this.error.state = '';
            if (!this.user.state) {
                this.error.state = 'Please select a state';
            }
        },

        isValid() {
            this.validateEmail();
            this.validateState();

            return !this.error.email && !this.error.state;
        },

        async requestOTP() {
            this.apiError = null;
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                await EPassService.requestOTP(
                    this.user.email.trim(),
                    this.user.state
                );

                this.loading = false;
                sessionStorage.setItem('email', this.user.email.trim());
                this.$router.push('/reset-password/verify-otp');
            } catch (error) {
                this.loading = false;
                this.apiError = getError(error);
            }
        }
    }
};
</script>

<style lang="scss"></style>
