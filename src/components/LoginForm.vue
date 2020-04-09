<template>
    <div class="login-form">
        <div class="title">Login</div>

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
                    :message="error.pass"
                    :type="{ 'is-danger': !!error.pass }"
                    label="Enter Password"
                >
                    <b-input
                        @blur="validatePassword"
                        @focus="error.pass = ''"
                        password-reveal
                        type="password"
                        v-model="user.pass"
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

                <div class="is-size-6" v-if="verifyEmailError">
                    <span class="m-r-8">Verify email?</span>
                    <router-link
                        class="has-text-weight-semibold"
                        to="/verify-otp"
                        >Click here</router-link
                    >
                </div>

                <div class="buttons m-y-48">
                    <b-button
                        :disabled="loading"
                        :loading="loading"
                        @click="login"
                        class="has-text-weight-bold"
                        expanded
                        native-type="submit"
                        type="is-primary"
                        >Login</b-button
                    >
                </div>
            </form>

            <br />
            <div class="is-size-6">
                <span class="m-r-8">Forgot password?</span>
                <router-link
                    class="has-text-weight-semibold"
                    to="/reset-password"
                    >Click here</router-link
                >
            </div>

            <br />

            <div class="is-size-6">
                <span class="m-r-8">New user?</span>
                <router-link class="has-text-weight-semibold" to="/register"
                    >Register Now</router-link
                >
            </div>
        </section>
    </div>
</template>

<script>
import { isValidEmail, getParameterByName } from '../utils/helpers';
import EPassService from '../service/EPassService';
import { saveAuthToken, save } from '../utils/session';
import { getError } from '../utils/error-handler';

export default {
    name: 'LoginForm',
    components: {},
    data() {
        return {
            user: {
                email: '',
                pass: '',
                state: null
            },
            error: {
                email: '',
                pass: '',
                state: ''
            },
            loading: false,

            apiError: null
        };
    },
    computed: {
        verifyEmailError() {
            return (
                this.apiError && this.apiError.indexOf('verify your email') > -1
            );
        },
        stateMap() {
            return this.$store.state.stateMap;
        }
    },

    watch: {
        verifyEmailError() {
            sessionStorage.setItem('email', this.user.email);
        },

        'user.email'(value) {
            if (isValidEmail(value)) {
                sessionStorage.setItem('email', value);
            }
        },
        'user.state'(state) {
            if (state) {
                sessionStorage.setItem('state', state);
            }
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
        validatePassword() {
            this.error.pass = '';
            if (!this.user.pass) {
                this.error.pass = 'Please enter password';
            }
        },

        validateState() {
            this.error.state = '';

            const foundState = Object.keys(this.stateMap).find(
                i => this.stateMap[i] === this.user.state
            );

            if (!foundState) {
                this.user.state = null;
            }

            if (!this.user.state) {
                this.error.state = 'Please select a state';
            }
        },

        isValid() {
            this.validateEmail();
            this.validatePassword();
            this.validateState();

            return !this.error.email && !this.error.pass && !this.error.state;
        },

        async login() {
            this.apiError = null;
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                const { data } = await EPassService.signIn(
                    this.user.email.trim(),
                    this.user.pass.trim(),
                    this.user.state
                );

                this.loading = false;

                const { authToken, accountID } = data;

                saveAuthToken(authToken);
                save('accountID', accountID);

                this.$router.replace('/');
            } catch (error) {
                this.loading = false;
                this.apiError = getError(error);
            }
        }
    },
    created() {
        sessionStorage.clear();

        const state =
            getParameterByName('state') || getParameterByName('stateName');
        if (state) {
            this.user.state = state.toUpperCase();
        }
    }
};
</script>

<style lang="scss">
.login-form {
    section {
        margin-top: 60px;
        button {
            height: 40px;
        }
        .label {
            font-weight: 600;
        }
    }
}
.m-r-8 {
    margin-right: 8px;
}
</style>
