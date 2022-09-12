<template>
  <h1>Page not found</h1>
  <p>You can choose <a @click="router.push('/')">go home</a></p>
</template>

<script lang="ts">
import { reactive, ref} from 'vue'
import { useRouter } from 'vue-router';

export default {
  name: "NotFound",
  props: {
  },
  // @ts-ignore
  setup(props) {
    const router = useRouter()

    function goHome() {
      router.push('/')
    }

    return {
      router,
    }
  }
}
</script>

<style scoped>
</style>