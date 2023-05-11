<template>
  <v-app>
    <SystemBar />
    <Drawer :key="$route.params" />
    <v-main class="overflow-y-hiddden">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import SystemBar from '../components/navigation/SystemBar.vue'
import Drawer from '../components/navigation/Drawer.vue'
</script>

<style scoped>

</style>