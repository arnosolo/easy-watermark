<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavigationBar from './components/NavigationBar.vue'
import { useRoute, useRouter } from 'vue-router';
import { provide, reactive, toRef, toRefs } from 'vue';

let selectedFiles = reactive<Array<File>>([])
const setSelectedFile = (newFiles: Array<File>) => {
  selectedFiles.length = 0
  selectedFiles.push(...newFiles)
}
provide('selectedFiles', selectedFiles)
provide('setSelectedFile', setSelectedFile)

</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- <NavigationBar></NavigationBar> -->
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
