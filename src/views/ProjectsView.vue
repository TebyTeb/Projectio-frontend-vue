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
const createProject = async () => {
  console.log('creando un proyecto nuevo desde el dialog')
  /* const project = {
    title: 'Cuarto proyecto',
    description: 'Esta es la descripción del cuarto proyecto'
  }
  const response = await API.createProject(project)
  if (response.error) return alert('Algo ha ido mal')
  await getProjects()
  alert('Proyecto creado correctamente') */
}
const editProject = () => {
  console.log('Editando un proyecto desde el Dialog')
}
const deleteProject = () => {
  console.log('Eliminnando un proyecto desde el dialog')
}
// Directive Hooks //
onBeforeMount(async () => {
  await getProjects()
})
</script>

<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-card ripple hover to class="d-flex ma-3" height="250px">
        <v-card-text class="d-flex flex-column text-center align-center justify-center">
          <v-icon icon="mdi-plus" size="50" class="ma-4" />
          <span class="text-h6">CREAR NUEVO ROYECTO</span>
        </v-card-text>
        <ProjectDialog btnTitle="create" @createProject="createProject" />
      </v-card>
    </v-col>
    <v-col v-for="(project, idx) in projectList" :key="idx" cols="4" lg="3">
      <ProjectCard :project="project" @editProject="editProject" @deleteProject="deleteProject" />
    </v-col>
  </v-row>
</template>

<style scoped></style>
