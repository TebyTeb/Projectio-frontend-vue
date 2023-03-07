<template>
  <v-main>
    <MessageBoard />
  </v-main>
</template>

<script>
import MessageBoard from '../components/MessageBoard.vue'
export default {
  components: {
    MessageBoard
  },
  data: () => ({
    cards: ['Today', 'Yesterday']
  })
}
</script>

<style scoped></style>
