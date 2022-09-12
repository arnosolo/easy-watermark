<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { WatermarkProcedure } from '../types/WatermarkProcedure';

const props = defineProps<{
  selectedFiles: Array<File>,
  setSelectedFile: (newFiles: Array<File>) => void,
}>()
const filepicker = ref();

function selectFile() {
  filepicker.value.click();
}

async function handleFileChange() {
  const files = filepicker.value.files;
  props.setSelectedFile(files)
}

</script>

<template>
  <div>
    <input @change="handleFileChange" ref="filepicker" type="file" multiple="true" accept="image/*" class="invisible w-0">
    <button @click="selectFile" class="primary-button bg-blue-500 rounded-md py-1.5 px-5">
      <p class="text-[#ffffff] font-semibold text-sm">Choose image</p>
    </button>
  </div>
</template>

<style scoped>
.primary-button:active {
  transform: scale(0.98);
  box-shadow: 0em 0.1em 0.3em rgba(0, 0, 0, 0.24);
}
</style>
