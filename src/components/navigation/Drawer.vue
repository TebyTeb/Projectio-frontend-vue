<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const route = useRoute()
const { projectId } = route.params
const store = useAuthStore()

const drawer = ref(null)
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet color="grey-lighten-1" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

      <div>{{ store.getEmail }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-folder-outline</v-icon>
        </template>
        <router-link :to="{ name: 'projects' }">
          <v-list-item-title>Projects</v-list-item-title>
        </router-link>
      </v-list-item>

      <v-list-item v-if="!projectId" link>
        <template v-slot:prepend>
          <v-icon>mdi-folder-plus-outline</v-icon>
        </template>
        <router-link :to="{ name: 'projects' }">
          <v-list-item-title>New Project</v-list-item-title>
        </router-link>
      </v-list-item>
      <div v-if="projectId">
        <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-book-plus-outline</v-icon>
        </template>
        <router-link :to="{ name: 'projects' }">
          <v-list-item-title>New Sprint</v-list-item-title>
        </router-link>
      </v-list-item>

      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>mdi-file-plus-outline</v-icon>
        </template>
        <router-link :to="{ name: 'projects' }">
          <v-list-item-title>New Task</v-list-item-title>
        </router-link>
      </v-list-item>
      </div>
    
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
