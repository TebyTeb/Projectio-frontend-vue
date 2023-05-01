<script setup>
// IMPORTS //
// -> Dependencies
import { ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// Props //
const props = defineProps(['sprint', 'btnTitle'])
const emit = defineEmits(['createSprint', 'editSprint'])
// Validations //
const rules = {
  title: { required },
  endDate: { required }
}
// Default data //
const initialData = {
  title: '',
  startDate: Date.now(),
  endDate: ''
}
// States //
const dialog = ref(false)
const sprint = reactive({
  title: props.sprint ? props.sprint.title : '',
  startDate: props.sprint ? props.sprint.startDate : Date.now(),
  endDate: props.sprint ? props.sprint.endDate : ''
})

const v$ = useVuelidate(rules, sprint)
// Handlers //
const handleEmit = () => {
  if (v$.value.$invalid) return alert('Form incomplete. Please check your inputs')
  switch (props.btnTitle) {
    case 'create':
      emit('createSprint', sprint)
      dialog.value = false
      Object.assign(sprint, initialData)
      break
    case 'edit':
      emit('editSprint', sprint)
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
    <v-card width="400" class="mx-auto overflow-visible">
      <v-card-item>
        <v-card-title v-if="props.sprint">Edit Sprint</v-card-title>
        <v-card-title v-else>Create New Sprint</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field
            v-model="sprint.title"
            :error-messages="v$.title.$errors.map((e) => e.$message)"
            required
            @blur="v$.title.$touch"
            label="Sprint title"
            :value="sprint.title"
          />
          <v-card-text class="d-flex px-0">
            <div>
              <label>Start Date</label>
              <VueDatePicker
                :dark="true"
                format="dd-MM-yyyy"
                :enable-time-picker="false"
                v-model="sprint.startDate"
                :error-messages="v$.endDate.$errors.map((e) => e.$message)"
                type="date"
                required
                @blur="v$.endDate.$touch"
                :value="sprint.startDate"
              />
            </div>
            <div>
              <label>End Date</label>
              <VueDatePicker
                :dark="true"
                format="dd-MM-yyyy"
                :enable-time-picker="false"
                v-model="sprint.endDate"
                :error-messages="v$.endDate.$errors.map((e) => e.$message)"
                type="date"
                required
                @blur="v$.endDate.$touch"
                :value="sprint.endDate"
              />
            </div>
          </v-card-text>
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
