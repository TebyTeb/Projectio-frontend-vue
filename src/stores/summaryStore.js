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
    if (sprints.error) return alert('Something went sideways...', sprints.error)
    sprintList.value = sprints
  }
  const fetchTasks = async (projectId) => {
    const taskParams = {project: projectId}
    const tasks = await tasksAPI.getTasks(taskParams)
    if (tasks.error) return alert('Something went sideways...', tasks.error)
    taskList.value = tasks
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
    fetchAllData
  }
})