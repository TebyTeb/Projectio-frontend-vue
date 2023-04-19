<script setup>
// IMPORTS //
// -> Dependencies
// -> Components
import ProjectDialog from './ProjectDialog.vue'
// Props //
const props = defineProps(['project'])
// Emits //
const emit = defineEmits(['editProject', 'deleteProject'])
// States //
// Handlers //
const goToProject = () => {
  console.log(`Redirigiendo al proyecto ${props.project.title}`)
}
</script>

<template>
  <v-card v-ripple.stop class="d-flex flex-column ma-3" height="250px" @click="goToProject">
    <v-card-item>
      <v-card-title class="text-h4">
        {{ project.title }}
      </v-card-title>
      <v-divider class="mt-2" />
      <v-card-subtitle>
        <p class="text-overline">
          Owner: <span class="text-body-2">{{ props.project.owner.name }}</span>
        </p>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <p class="text-subtitle-1">Description:</p>
      <p class="text-body-1">{{ props.project.description }}</p>
    </v-card-text>
    <v-card-actions class="mb-0 justify-end">
      <v-btn color="warning">
        Editar
        <ProjectDialog
          @editProject="(projectData) => emit('editProject', props.project._id, projectData)"
          btnTitle="edit"
          :project="props.project"
        />
      </v-btn>
      <v-spacer />
      <v-btn color="error" @click.stop="emit('deleteProject', props.project._id)">Eliminar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
