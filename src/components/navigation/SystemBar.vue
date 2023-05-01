<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
const store = useAuthStore()
const router = useRouter()

const goToSignup = () => {
  router.push({ name: 'signup' })
}
const goToLogin = () => {
  router.push({ name: 'login' })
}
const logout = () => {
  store.logout()
  router.push({name: 'login'})
}
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-icon class="ml-2">mdi-dip-switch</v-icon>
    <v-app-bar-title>Projectio</v-app-bar-title>
    <v-spacer />
    <div v-if="store.isLoggedIn">
      <v-btn variant="outlined" class="mx-2" @click="logout">logout</v-btn>
    </div>
    <div v-else>
      <v-btn variant="outlined" @click="goToSignup">signup</v-btn>
      <v-btn variant="outlined" class="mx-2" @click="goToLogin">login</v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped></style>
