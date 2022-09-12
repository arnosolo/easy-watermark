<script setup lang="ts">
import { ref } from 'vue'
import { ColorOption } from "./ColorOption";

defineProps<{ colorOpt: ColorOption }>()

</script>

<template>
  <div
    class="w-5 h-5 p-0.5 rounded-full flex"
    :class="{'border': colorOpt.hasOutborder}"
    :style="{'background': colorOpt.color}">
    <div class="flex-1 rounded-full"
      :class="{'border-2': colorOpt.isActived}"
      :style="{'border-color': colorOpt.borderColor}">
    </div>
  </div>
</template>

<style scoped>

</style>
