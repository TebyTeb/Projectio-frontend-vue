import { ref } from 'vue'
import { defineStore } from 'pinia'
import projectsAPI from '../Services/projectsService'

export const useProjectStore = defineStore('project', () => {
  const projectList = ref(null)

  const getProjects = async () => {
    const projects = await projectsAPI.getProjects()
    projectList.value = projects
  }

  const createProject = async (projectData) => {
    const response = await projectsAPI.createProject(projectData)
    if (response.error) return alert('Ups! Something went sideways...')
    await getProjects()
    alert('Proyecto creado correctamente')
  }
  const editProject = async (id, projectData) => {
    console.log('Editando un proyecto desde el Dialog', projectData)
    const response = await projectsAPI.editProject(id, projectData)
    if (response.error) return alert('Ups! Something went sideways...')
    await getProjects()
    alert('Proyecto editado correctamente')
  }
  const deleteProject = async (id) => {
    if (confirm('Do you really want to delete this project?')) {
      const response = await projectsAPI.deleteProject(id)
      if (response.error) return alert('Ups! Something went sideways...')
      await getProjects()
      alert('Proyecto eliminado correctamente')
    }
  }

  return {
    projectList,
    getProjects,
    createProject,
    editProject,
    deleteProject
  }
})