<script setup>
// IMPORTS //
// -> Dependencies
import { ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// Props //
const props = defineProps(['project', 'btnTitle'])
const emit = defineEmits(['createProject', 'editProject', 'deleteProject'])
// Validations //
const rules = {
  title: { required },
  description: { required }
}
// Default data //
const initialData = {
  title: '',
  description:''
}
// States //
const dialog = ref(false)
const project = reactive({
  title: props.project ? props.project.title : '',
  description: props.project ? props.project.description : ''
})

const v$ = useVuelidate(rules, project)
// Handlers //
const handleEmit = () => {
  if (v$.value.$invalid) return alert('Form incomplete. Please check your inputs')
  switch (props.btnTitle) {
    case 'create':
      emit('createProject', project)
      dialog.value = false
      Object.assign(project, initialData)
      break
    case 'edit':
      emit('editProject', project)
      dialog.value = false
      break
  }
  v$.value.$reset()
}
const handleCancel = () => {
  v$.value.$reset()
  dialog.value = false
}
</script>

<template>
  <v-dialog v-model="dialog" activator="parent" width="auto">
    <v-card width="400" class="mx-auto">
      <v-card-item>
        <v-card-title v-if="props.project">Edit Project</v-card-title>
        <v-card-title v-else>Create New Project</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field
            v-model="project.title"
            :error-messages="v$.title.$errors.map((e) => e.$message)"
            required
            @blur="v$.title.$touch"
            label="Project title"
            :value="project.title"
          />
          <v-textarea
            v-model="project.description"
            :error-messages="v$.description.$errors.map((e) => e.$message)"
            required
            @blur="v$.description.$touch"
            label="Project description"
            :value="project.description"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="handleCancel">Cancel</v-btn>
        <v-spacer />
        <v-btn color="warning" @click="handleEmit">{{ props.btnTitle }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
