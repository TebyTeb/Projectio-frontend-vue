<script>
import {useAuthStore} from '../../stores/authStore'

export default {
  data: () => ({
    store: useAuthStore(),
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Projects', 'home'],
      ['mdi-send', 'Sprints', 'about'],
      ['mdi-delete', 'Profile', 'workspace'],
    ],
  }),
  methods: {
    logout() {
      this.store.logout()
      this.$router.push({name: 'login'})
    }
  }
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

        <router-link :to='{ name: route }'>
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
