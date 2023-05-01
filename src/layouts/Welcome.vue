<template>
  <v-app>
    <SystemBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import SystemBar from '../components/navigation/SystemBar.vue'
</script>