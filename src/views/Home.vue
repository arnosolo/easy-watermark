<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { setLanguage } from '/@/locales/i18n';

const { params } = useRoute()

onMounted(() => {
  setLanguage(params.countryCode ? params.countryCode : 'us')
})
</script>

<template>
  <h1>Home page</h1>
</template>

<style scoped>
</style>
