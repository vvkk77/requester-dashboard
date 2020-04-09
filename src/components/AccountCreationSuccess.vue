<template>
    <div>
        <div class="acc-success">
            <b-icon icon="account-check" type="is-success"></b-icon>

            <div class="title is-4">Account created successfully</div>
            <div class="subtitle">Please wait for admin approval</div>
        </div>

        <div class="is-size-6">
            <span class="m-r-8">Admin approval done?</span>
            <router-link class="has-text-weight-semibold" to="/login"
                >Login</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountCreationSuccess'
};
</script>

<style lang="scss">
.acc-success {
    text-align: center;
    padding: 80px 0;

    .icon {
        width: 4rem;
        height: 4rem;
        i::before {
            font-size: 64px;
        }
        margin-bottom: 1rem;
    }
}
</style>
