<script setup>
const props = defineProps(['taskData'])
</script>

<template>
  <v-card color="grey-darken-3" class="ma-1">
    <v-card-item>
      <v-card-title>{{ props.taskData.title }}</v-card-title>
      <v-card-subtitle>{{ props.taskData.content }}</v-card-subtitle>
    </v-card-item>
    <v-card-text>Sprint: {{ props.taskData.sprintId?.title || 'none' }}</v-card-text>
  </v-card>
</template>