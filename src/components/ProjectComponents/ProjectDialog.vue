<script setup>
// IMPORTS //
// -> Dependencies
import { ref } from 'vue'
// Props //
const props = defineProps(['btnTitle'])
const emit = defineEmits(['createProject', 'editProject', 'deleteProject'])

const dialog = ref(false)

const handleEmit = () => {
  switch (props.btnTitle) {
    case 'create':
      emit('createProject')
      dialog.value = false
      break
    case 'edit':
      emit('editProject')
      dialog.value = false
      break
  }
}
</script>

<template>
  <v-dialog v-model="dialog" activator="parent" width="auto">
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="dialog = false">Cancel</v-btn>
        <v-spacer />
        <v-btn color="warning" @click="handleEmit">{{ props.btnTitle }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
