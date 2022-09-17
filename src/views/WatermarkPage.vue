<script setup lang="ts">
import { inject, reactive, ref } from 'vue'

let selectedFiles = inject("selectedFiles", reactive([])) as Array<File>
let setSelectedFile = inject("setSelectedFile", () => {}) as (newFiles: Array<File>) => void

</script>

<template>
  <div>
  </div>
</template>

<style scoped>

</style>
