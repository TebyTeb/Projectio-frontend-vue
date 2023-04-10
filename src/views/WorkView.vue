<script setup>
import { ref, onBeforeMount } from 'vue'
import API from '../Services/projectsService'
import ProjectCard from '@/components/ProjectComponents/ProjectCard.vue'

const projectList = ref([])

onBeforeMount(async () => {
  const projects = await API.getProjects()
  projectList.value = projects
})
</script>

<template>
  <v-row no-gutters>
    <v-col v-for="(project, idx) in projectList" :key="idx" cols="3">
      <ProjectCard :project="project" />
    </v-col>
    <v-col cols="3">
      <v-card class="d-flex ma-3" height="250px">
        <v-card-text class="d-flex flex-column text-center align-center justify-center">
          <v-icon icon="mdi-plus" size="50" class="ma-4" />
          <span class="text-h6">CREAR NUEVO ROYECTO</span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped></style>
