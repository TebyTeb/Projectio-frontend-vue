<script setup>
import { computed } from 'vue';
const props = defineProps(['sprintData', 'taskList'])

const numberOfTasks = computed(() => {
  return props.taskList.filter((task)=> task.sprintId?.title === props.sprintData?.title).length
})
</script>

<template>
  <v-card  color="grey-darken-3" class="ma-1">
    <v-card-item>
      <v-card-title>{{ props.sprintData.title }}</v-card-title>
      <v-card-subtitle>{{ props.sprintData.startDate }}</v-card-subtitle>
      <v-card-subtitle>{{ props.sprintData.endDate }}</v-card-subtitle>
    </v-card-item>
    <v-card-text>Tasks: {{ numberOfTasks }} </v-card-text>
  </v-card>
</template>
