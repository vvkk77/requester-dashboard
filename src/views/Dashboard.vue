<template>
    <div class="dashboard-container">
        <app-header />
        <router-view />
    </div>
</template>
<script>
import AppHeader from '../components/AppHeader.vue';

export default {
    components: { AppHeader }
};
</script>
