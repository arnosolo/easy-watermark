<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center gap-5 px-8 py-16 w-full">
    <h1 class="text-4xl font-bold text-gray-600">
      {{ $t('notFoundPage.title') }}
    </h1>
    <router-link to="/">
      <button class="text-2xl text-gray-600 underline">
        {{ $t('notFoundPage.goHome') }}
      </button>
    </router-link>
  </div>
</template>
