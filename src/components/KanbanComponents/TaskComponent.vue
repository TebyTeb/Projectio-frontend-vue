<script setup>
const props = defineProps(['task'])
</script>

<template>
  <v-card class="ma-2 pa-2" color="grey-darken-3"> {{props.task.title}} </v-card>
</template>