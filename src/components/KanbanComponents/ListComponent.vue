<script setup>
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import TaskComponent from './TaskComponent.vue'
import TaskDialog from '../SummaryComponents/TaskDialog.vue'
// Draggable //
import Draggable from 'vuedraggable'

import { useRoute } from 'vue-router'
const route = useRoute()

import { useSummaryStore } from '@/stores/summaryStore'
const summaryStore = useSummaryStore()

const props = defineProps(['list'])

const { taskList } = storeToRefs(summaryStore)

const columnTasks = ref([])

const assignTasks = () => {
  columnTasks.value = taskList.value.filter(
    (task) => task.sprintId._id === route.params.sprintId && task.listId === props.list.element._id
  )
}

const handleChange = async (evt) => {
  if (evt.added) {
    const listChange = {
      listId: props.list.element._id
    }
    await summaryStore.editTask(evt.added.element._id, listChange)
  }
}

const handleCreateTask = async (taskData) => {
  const newTask = {
    projectId: summaryStore.projectData._id,
    sprintId: route.params.sprintId,
    listId: props.list.element._id,
    ...taskData
  }
  console.log(`list is: ${props.list.element.name}`)
  await summaryStore.createTask(newTask)
  assignTasks()
}

onBeforeMount(() => {
  summaryStore.fetchAllData(route.query.projectId)
  assignTasks()
  // console.log(`project is: ${summaryStore.projectData.title}`)
  // console.log(`sprintId is: ${ route.params.sprintId}`)
  // console.log(`list is: ${props.list.element.name}`)
})
</script>

<template>
  <v-sheet
    class="ma-2 d-flex flex-column flex-nowrap"
    height="90vh"
    min-width="450px"
    max-width="450px"
  >
    <v-card height="30px" class="mb-2 flex-shrink-0"> {{ props.list.element.name }} </v-card>
    <v-sheet class="mb-2 overflow-auto align-self-auto flex-grow-0 flex-srhink-1">
      <Draggable v-model="columnTasks" group="tasks" item-key="_id" @change="handleChange">
        <template #item="{ element }">
          <TaskComponent :task="element" />
        </template>
      </Draggable>
    </v-sheet>
    <v-card color="grey-darken-3" height="60px" class="mt-auto ma-1 flex-shrink-0">
      <v-card-title>Add new Task</v-card-title>
      <TaskDialog
          @createTask="handleCreateTask"
          btnTitle="create"
          :task="props.taskData"
        />
    </v-card>
  </v-sheet>
</template>
