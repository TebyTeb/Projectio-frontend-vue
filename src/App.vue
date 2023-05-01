<script setup>
// IMPORTS //
// -> dependencies
import { onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore'
// Router //
const router = useRouter()
// Stores //
const store = useAuthStore()

// Auxiliary functions //
const checkValidUser = async () => {
  const result = await store.checkToken()
  if (!result) {
    store.logout()
    router.push({name: 'login'})
  }
}
// Directive Hooks //
onMounted(async () => {
  checkValidUser()
})
</script>

<template>
  <v-app id="inspire">
    <RouterView />
  </v-app>
</template>

<style scoped>
</style>
