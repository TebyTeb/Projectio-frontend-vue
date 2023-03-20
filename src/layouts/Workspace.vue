<template>
  <v-app>
    <SystemBar />
    <Drawer />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import SystemBar from '../components/navigation/SystemBar.vue'
import Drawer from '../components/navigation/Drawer.vue'
</script>