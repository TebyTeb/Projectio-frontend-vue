<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import TaskComponent from './TaskComponent.vue'
// Draggable //
import { VueDraggableNext } from 'vue-draggable-next'
const draggable = VueDraggableNext

import { useRoute } from 'vue-router'
const route = useRoute()

import { useSummaryStore } from '@/stores/summaryStore'
const summaryStore = useSummaryStore()

const props = defineProps(['list'])

const { taskList } = storeToRefs(summaryStore)

const sprintTasks = computed(() => {
  return taskList.value.filter((task) => task.sprintId._id === route.params.sprintId)
})

const columnTasks = computed(() => {
  return sprintTasks.value.filter((task) => task.listId === props.list._id)
})
</script>

<template>
  <v-sheet
    class="ma-2 d-flex flex-column flex-nowrap"
    height="90vh"
    min-width="450px"
    max-width="450px"
  >
    <v-card height="30px" class="mb-2 flex-shrink-0"> {{ props.list.name }} </v-card>
    <v-sheet class="mb-2 overflow-auto align-self-auto flex-grow-0 flex-srhink-1">
      <draggable
        :options="{ group: columnTasks }"
        group="columnTasks"
      >
        <TaskComponent v-for="task in columnTasks" :key="task._id" :task="task" />
      </draggable>
    </v-sheet>
    <v-card color="grey-darken-3" height="60px" class="mt-auto ma-1 flex-shrink-0">
      ADD NEW TASK
    </v-card>
  </v-sheet>
</template>
