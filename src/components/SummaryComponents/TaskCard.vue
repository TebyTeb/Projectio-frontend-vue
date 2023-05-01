<script setup>
import TaskDialog from './TaskDialog.vue'

const props = defineProps(['taskData'])
const emit = defineEmits(['editTask', 'deleteTask'])
</script>

<template>
  <v-card color="grey-darken-3" class="d-flex justify-space-between ma-1">
    <div>
      <v-card-item>
        <v-card-title>{{ props.taskData.title }}</v-card-title>
        <v-card-subtitle>{{ props.taskData.content }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>Sprint: {{ props.taskData.sprintId?.title || 'none' }}</v-card-text>
    </div>
    <v-spacer />
    <v-card-actions class="mb-0 d-flex flex-column justify-space-between">
      <v-btn :icon="true" color="warning">
        <v-icon>mdi-pencil-outline</v-icon>
        <TaskDialog
          @editTask="(taskData) => emit('editTask', props.taskData._id, taskData)"
          btnTitle="edit"
          :task="props.taskData"
        />
      </v-btn>
      <v-btn
        icon="mdi-delete-outline"
        color="error"
        @click.stop="emit('deleteTask', props.taskData._id)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
