<script setup>
// IMPORTS //
// -> Dependencies
import { ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// Props //
const props = defineProps(['task', 'btnTitle'])
const emit = defineEmits(['createTask', 'editTask'])
// Validations //
const rules = {
  title: { required },
  endDate: { required }
}
// Default data //
const initialData = {
  title: '',
  content:'',
  endDate: ''
}
// States //
const dialog = ref(false)
const task = reactive({
  title: props.task ? props.task.title : '',
  content: props.task ? props.task.content : '',
  endDate: props.task ? props.task.endDate : ''
})

const v$ = useVuelidate(rules, task)
// Handlers //
const handleEmit = () => {
  if (v$.value.$invalid) return alert('Form incomplete. Please check your inputs')
  switch (props.btnTitle) {
    case 'create':
      emit('createTask', task)
      dialog.value = false
      Object.assign(task, initialData)
      break
    case 'edit':
      emit('editTask', task)
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
        <v-card-title v-if="props.task">Edit Task</v-card-title>
        <v-card-title v-else>Create New Task</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field
            v-model="task.title"
            :error-messages="v$.title.$errors.map((e) => e.$message)"
            required
            @blur="v$.title.$touch"
            label="Task title"
            :value="task.title"
          />
          <v-text-field
            v-model="task.endDate"
            :error-messages="v$.endDate.$errors.map((e) => e.$message)"
            type="date"
            required
            @blur="v$.endDate.$touch"
            :value="task.endDate"
          />
          <v-textarea
            v-model="task.content"
            label="Task content"
            :value="task.content"
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