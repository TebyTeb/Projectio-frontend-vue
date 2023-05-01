<script setup>
import { computed } from 'vue'
const props = defineProps(['sprintData', 'taskList'])
const emit = defineEmits(['editSprint'])

import SprintDialog from './SprintDialog.vue'

const numberOfTasks = computed(() => {
  return props.taskList.filter((task) => task.sprintId?.title === props.sprintData?.title).length
})
</script>

<template>
  <v-card color="grey-darken-3" class="d-flex justify-space-between ma-1">
    <div>
      <v-card-item>
        <v-card-title>{{ props.sprintData.title }}</v-card-title>
        <v-card-subtitle>From: {{ new Date(props.sprintData.startDate).toDateString() }}</v-card-subtitle>
        <v-card-subtitle>To: {{ new Date(props.sprintData.endDate).toDateString() }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>Tasks: {{ numberOfTasks }} </v-card-text>
    </div>
    <v-spacer />
    <v-card-actions class="mb-0 d-flex flex-column justify-space-between">
      <v-btn :icon="true" color="warning">
        <v-icon>mdi-pencil-outline</v-icon>
        <SprintDialog
          @editSprint="(sprintData) => emit('editSprint', props.sprintData._id, sprintData)"
          btnTitle="edit"
          :sprint="props.sprintData"
        />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
