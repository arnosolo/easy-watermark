<script setup lang="ts">
</script>

<template>
  <div class="sticky top-0 px-3 shadow-md flex justify-between bg-white z-10">
    <router-link to="/">
      <div class="py-3 flex items-center gap-2 hover:scale-105 duration-300">
        <img src="../assets/logo.svg" alt="logo" class="w-7 h-7">
        <h2 class="text-xl font-semibold text-gray-700">
          {{ $t('common.title') }}
        </h2>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
</style>
