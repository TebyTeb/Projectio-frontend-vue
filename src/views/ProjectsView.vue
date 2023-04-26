<script setup>
// IMPORTS //
// -> Dependencies
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
// -> Components
import ProjectCard from '@/components/ProjectComponents/ProjectCard.vue'
import ProjectDialog from '@/components/ProjectComponents/ProjectDialog.vue'
// Stores //
import { useProjectStore } from '@/stores/projectsStore'
const projectStore = useProjectStore()
// States //
const { projectList } = storeToRefs(projectStore)
// Handlers //
const handleCreateProject = async (projectData) => {
  await projectStore.createProject(projectData)
}
const handleEditProject = async (id, projectData) => {
  await projectStore.editProject(id, projectData)
}
const handleDeleteProject = async (id) => {
  if (confirm('Do you really want to delete this project?')) {
    await projectStore.deleteProject(id)
  }
}
// Directive Hooks //
onBeforeMount(async () => {
  await projectStore.getProjects()
})
</script>

<template>
  <v-container class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="3">
        <v-card link ripple class="contenedor d-flex ma-3" height="250px">
          <v-card-text class="d-flex flex-column text-center align-center justify-center">
            <v-icon icon="mdi-plus" size="50" class="ma-4" />
            <span class="text-h6">CREATE NEW PROJECT</span>
          </v-card-text>
          <ProjectDialog btnTitle="create" @createProject="handleCreateProject" />
        </v-card>
      </v-col>
      <v-col v-for="(project, idx) in projectList" :key="idx" cols="4" lg="3">
        <ProjectCard
          :key="$route.params.projectId"
          :project="project"
          @editProject="handleEditProject"
          @deleteProject="handleDeleteProject"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
