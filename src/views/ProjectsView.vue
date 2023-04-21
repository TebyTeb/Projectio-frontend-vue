<script setup>
// IMPORTS //
// -> Dependencies
import { ref, onBeforeMount } from 'vue'
import API from '../Services/projectsService'
// -> Components
import ProjectCard from '@/components/ProjectComponents/ProjectCard.vue'
import ProjectDialog from '@/components/ProjectComponents/ProjectDialog.vue'
// States //
const projectList = ref([])
// Handlers //
const getProjects = async () => {
  const projects = await API.getProjects()
  projectList.value = projects
}
const createProject = async (projectData) => {
  const response = await API.createProject(projectData)
  if (response.error) return alert('Ups! Something went sideways...')
  await getProjects()
  alert('Proyecto creado correctamente')
}

const editProject = async (id, projectData) => {
  console.log('Editando un proyecto desde el Dialog', projectData)
  const response = await API.editProject(id, projectData)
  if (response.error) return alert('Ups! Something went sideways...')
  await getProjects()
  alert('Proyecto editado correctamente')
}
const deleteProject = async (id) => {
  if (confirm('Do you really want to delete this project?')) {
    const response = await API.deleteProject(id)
    if (response.error) return alert('Ups! Something went sideways...')
    await getProjects()
    alert('Proyecto eliminado correctamente')
  }
}
// Directive Hooks //
onBeforeMount(async () => {
  await getProjects()
})
</script>

<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-card link ripple class="contenedor d-flex ma-3" height="250px">
        <v-card-text class="d-flex flex-column text-center align-center justify-center">
          <v-icon icon="mdi-plus" size="50" class="ma-4" />
          <span class="text-h6">CREATE NEW PROJECT</span>
        </v-card-text>
        <ProjectDialog btnTitle="create" @createProject="createProject" />
      </v-card>
    </v-col>
    <v-col v-for="(project, idx) in projectList" :key="idx" cols="4" lg="3">
      <ProjectCard
        :key="$route.params.projectId"
        :project="project"
        @editProject="editProject"
        @deleteProject="deleteProject"
      />
    </v-col>
  </v-row>
</template>

<style scoped></style>
