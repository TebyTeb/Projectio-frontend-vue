<template>
  <v-card class="d-flex flex-column ma-3" height="250px">
    <v-card-item>
      <v-card-title class="text-h4">
        {{ project.title }}
      </v-card-title>
      <v-divider class="mt-2" />
      <v-card-subtitle>
        <p class="text-overline">Owner: <span class="text-body-2">{{ project.owner.name }}</span></p>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <p class="text-subtitle-1">Description:</p>
      <p class="text-body-1">{{ project.description }}</p>
    </v-card-text>
    <v-card-actions class="mb-0 justify-end">
      <v-btn color="warning">Editar</v-btn>
      <v-spacer />
      <v-btn color="error">Eliminar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    project: Object
  }
}
</script>

<style scoped></style>
