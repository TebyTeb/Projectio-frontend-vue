<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useProjectStore } from '../../stores/projectsStore'
import { useSummaryStore } from '../../stores/summaryStore'

import ProjectDialog from '@/components/ProjectComponents/ProjectDialog.vue'
import SprintDialog from '@/components/SummaryComponents/SprintDialog.vue'
import TaskDialog from '@/components/SummaryComponents/TaskDialog.vue'

const route = useRoute()
const { projectId } = route.params
const authStore = useAuthStore()
const projectStore = useProjectStore()
const summaryStore = useSummaryStore()

const drawer = ref(null)

const handleCreateProject = async (projectData) => {
  await projectStore.createProject(projectData)
}
const handleCreateSprint = async (sprintData) => {
  const newSprint = {
    projectId: summaryStore.projectData._id,
    ...sprintData
  }
  await summaryStore.createSprint(newSprint)
}
const handleCreateTask = async (taskData) => {
  await summaryStore.createTask(taskData)
}
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet color="grey-lighten-1" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

      <div>{{ authStore.getEmail }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <router-link :to="{ name: 'projects' }">
        <v-list-item link>
          <template v-slot:prepend>
            <v-icon>mdi-folder-outline</v-icon>
          </template>
          <v-list-item-title>Projects</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-list-item v-if="!projectId" link>
        <template v-slot:prepend>
          <v-icon>mdi-folder-plus-outline</v-icon>
        </template>
        <v-list-item-title>New Project</v-list-item-title>
        <ProjectDialog btnTitle="create" @createProject="handleCreateProject" />
      </v-list-item>
      <div v-if="projectId">
        <v-list-item link>
          <template v-slot:prepend>
            <v-icon>mdi-book-plus-outline</v-icon>
          </template>
          <v-list-item-title>New Sprint</v-list-item-title>
          <SprintDialog btnTitle="create" @createSprint="handleCreateSprint" />
        </v-list-item>

        <v-list-item link>
          <template v-slot:prepend>
            <v-icon>mdi-file-plus-outline</v-icon>
          </template>
          <v-list-item-title>New Task</v-list-item-title>
          <TaskDialog btnTitle="create" @createTask="handleCreateTask" />
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
