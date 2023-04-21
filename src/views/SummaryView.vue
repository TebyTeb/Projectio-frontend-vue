<script setup>
// IMPORTS //
// -> Dependencies
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import projectsAPI from '../Services/projectsService'
import sprintsAPI from '../Services/SprintsService'
import tasksAPI from '../Services/TasksService'
// Router //
const route = useRoute()
const { projectId } = route.params
// States //
const projectData = ref({})
const sprintList = ref([])
const taskList = ref([])
// Handlers //
const fetchProject = async () => {
  const data = await projectsAPI.getProjectById(projectId)
  if (data.error) return alert('Something went sideways...', data.error)
  projectData.value = data 
  const sprints = await sprintsAPI.getProjectSprints(projectId)
  if (sprints.error) return alert('Something went sideways...', sprints.error)
  sprintList.value = sprints
  const taskParams = {project: projectId}
  const tasks = await tasksAPI.getTasks(taskParams)
  if (tasks.error) return alert('Something went sideways...', tasks.error)
  taskList.value = tasks
}
// Directive Hooks //
onMounted(async () => {
  fetchProject()
})

</script>

<template>
  <h1>I´m the Project Summary View!!</h1>
  <pre>
    Project: {{ projectData }}
    Sprints: {{ sprintList }}
    Tasks: {{ taskList }}
  </pre>
</template>