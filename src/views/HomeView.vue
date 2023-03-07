<script>
import Drawer from '../components/navigation/Drawer.vue'
import MessageBoard from '../components/MessageBoard.vue'
import SystemBar from '../components/navigation/SystemBar.vue'
export default {
  components: {
    SystemBar,
    Drawer,
    MessageBoard
  }
}
</script>

<template>
  <SystemBar />
  <Drawer />
    <v-main>
      <MessageBoard />
    </v-main>
</template>

<style></style>