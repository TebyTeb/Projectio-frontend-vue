import { ref } from 'vue'
import { defineStore } from 'pinia'
import projectsAPI from '../Services/projectsService'
import sprintsAPI from '../Services/SprintsService'
import tasksAPI from '../Services/TasksService'

export const useSummaryStore = defineStore('summary', () => {
  const projectData = ref(null)
  const sprintList = ref(null)
  const taskList = ref(null)

  const fetchProject = async (projectId) => {
    const data = await projectsAPI.getProjectById(projectId)
    if (data.error) return alert('Something went sideways...', data.error)
    projectData.value = data 
  }

  const fetchSprints = async(projectId) => {
    const sprints = await sprintsAPI.getProjectSprints(projectId)
    if (sprints.error) return alert('Something went sideways...' + sprints.error)
    sprintList.value = sprints
  }
  const createSprint = async (sprintData) => {
    const response = await sprintsAPI.createSprint(sprintData)
    if (response.error) return alert('Ups! Something went sideways...' + response)
    await fetchSprints(projectData.value._id)
  }
  const editSprint = async (sprintId, sprintData) => {
    const response = await sprintsAPI.editSprint(sprintId, sprintData)
    if (response.error) return alert('Something went sideways...' + response.error)
    await fetchSprints(projectData.value._id)
  }

  const fetchTasks = async (projectId) => {
    const taskParams = {project: projectId}
    const tasks = await tasksAPI.getTasks(taskParams)
    if (tasks.error) return alert('Something went sideways...', tasks.error)
    taskList.value = tasks
  }
  const createTask = async (taskData) => {
    const response = await tasksAPI.createTask(taskData)
    console.log(response)
    if (response.error) return alert('Ups! Something went sideways...' + response)
    await fetchTasks(projectData.value._id)
  }

  const fetchAllData = async (projectId) => {
    await fetchProject(projectId)
    await fetchSprints(projectId)
    await fetchTasks(projectId)
  }


  return {
    projectData,
    sprintList,
    taskList,
    fetchAllData,
    createSprint,
    editSprint,
    fetchTasks,
    createTask
  }
})