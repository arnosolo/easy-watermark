<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { setLanguage } from '/@/locales/i18n';
import WatermarkDeployer from "/@/components/WatermarkDeployer.vue";

const { params } = useRoute()

onMounted(() => {
  setLanguage(params.countryCode ? params.countryCode : 'us')
})
</script>

<template>
  <div class="py-6">
    <WatermarkDeployer />
  </div>
</template>

<style scoped>
</style>
