<script setup>
// IMPORTS //
// -> Dependencies
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import taskAPI from '@/Services/TasksService'
// -> Components
import SprintCard from '@/components/SummaryComponents/SprintCard.vue'
import TaskCard from '@/components/SummaryComponents/TaskCard.vue'
// Stores //
import { useSummaryStore } from '../stores/summaryStore'
const summaryStore = useSummaryStore()
// Router //
const route = useRoute()
const { projectId } = route.params
// States //
// const { projectData, sprintList, taskList } = storeToRefs(summaryStore)
const { sprintList, taskList, projectLists } = storeToRefs(summaryStore)
// Handlers //
const handleEditSprint = async (id, sprintData) => {
  await summaryStore.editSprint(id, sprintData)
}
const handleEditTask = async (id, taskData) => {
  await summaryStore.editTask(id, taskData)
}
const handleDeleteTask = async (id) => {
  await summaryStore.deleteTask(id)
}
// Directive Hooks //
onMounted(async () => {
  summaryStore.fetchAllData(projectId)
})

const startDrag = (evt, item) => {
  evt.dataTransfer.dropEffect = 'copy'
  evt.dataTransfer.effectAllowed = 'copy'
  evt.dataTransfer.setData('itemID', item._id)
}
const onDrop = async (evt, item) => {
  const itemID = evt.dataTransfer.getData('itemID')
  const assignedSprint = {sprintId: item._id}
  const response = await taskAPI.editTask(itemID, assignedSprint)
  if (response.error) return alert('something went sideways...' + response.error.message)
  await summaryStore.fetchTasks(projectId)

}
</script>

<template>
  <v-container>
    <v-row no-gutters>
      {{ projectLists }}
      <v-col cols="6">
        TASKS
        <v-sheet height="88vh" class="overflow-auto">
          <TaskCard
            v-for="(task, idx) in taskList"
            :key="idx"
            :taskData="task"
            draggable="true"
            @editTask="handleEditTask"
            @deleteTask="handleDeleteTask"
            @dragstart="startDrag($event, task)"
          />
        </v-sheet>
      </v-col>
      <v-col cols="6">
        SPRINTS
        <v-sheet height="88vh" class="overflow-auto">
          <SprintCard
            v-for="(sprint, idx) in sprintList"
            :key="idx"
            :sprintData="sprint"
            :taskList="taskList?.length > 0 ? taskList : []"
            @editSprint="handleEditSprint"
            @drop="onDrop($event, sprint)"
            @dragover.prevent
            @dragenter.prevent
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
