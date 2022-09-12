<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

function toWatermark() {
  router.push('/watermark')
}
</script>

<template>
  <section class="grow flex flex-col items-center pt-12 gap-3 bg-bg-gray">
      <div class="flex gap-0.5">
        <h1 class="text-2xl font-bold">I want</h1>
        <select class="bg-bg-gray light-button text-xl">
          <option value="watermark">add watermark</option>
        </select>
      </div>
      <div>
        <button @click="toWatermark" class="primary-button bg-blue rounded-md py-1.5 px-5">
          <p class="text-[#ffffff] font-semibold text-sm">Start</p>
        </button>
      </div>
    </section>
</template>

<style scoped>
.light-button:active {
  transform: scale(0.98);
  /* box-shadow: 0em 0.1em 0.3em rgba(0, 0, 0, 0.24); */
}

.primary-button:active {
  transform: scale(0.98);
  box-shadow: 0em 0.1em 0.3em rgba(0, 0, 0, 0.24);
}
</style>
