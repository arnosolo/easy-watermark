<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import WatermarkDeployer from "../components/WatermarkDeployer.vue";

let selectedFiles = inject("selectedFiles", reactive([])) as Array<File>
let setSelectedFile = inject("setSelectedFile", () => {}) as (newFiles: Array<File>) => void

</script>

<template>
  <div>
    <WatermarkDeployer  :setSelectedFile="setSelectedFile" :selectedFiles="selectedFiles" ></WatermarkDeployer>
  </div>
</template>

<style scoped>

</style>
