<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const store = useAuthStore()

const drawer = ref(null)
const links = ref([
  ['mdi-inbox-arrow-down', 'Projects', 'workspace'],
  ['mdi-send', 'Sprints', 'about'],
  ['mdi-delete', 'Profile', 'workspace']
])

const logout = () => {
  store.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet color="grey-lighten-1" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

      <div>{{ store.getEmail }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, route] in links" :key="icon" link>
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>

        <router-link :to="{ name: route }">
          <v-list-item-title>{{ text }}</v-list-item-title>
        </router-link>
      </v-list-item>
      <v-list-item @click="logout">
        <template v-slot:prepend>
          <v-icon>mdi-alert-octagon</v-icon>
        </template>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
