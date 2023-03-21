<template>
  <pre>
    {{ store.getEmail }}
    {{ store.getToken }}
  </pre>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  data() {
    return {
      store: useAuthStore()
    }
  }
}
</script>

<style></style>