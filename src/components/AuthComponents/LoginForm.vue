<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import API from '../../Services/authService'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const store = useAuthStore()

const rules = {
  email: { required, email },
  password: { required }
}

const loginData = reactive({
  email: '',
  password: ''
})
const passwordFlag = ref(false)

const v$ = useVuelidate(rules, loginData)

const goToSignup = () => {
  router.push({ name: 'signup' })
}
const login = async () => {
  const response = await API.login(loginData)
  if (response.error) {
    alert('Wrong username/password')
  } else {
    store.login(response.email, response.token)
    loginData.email = ''
    loginData.password = ''
    v$.value.$reset()
    router.push({ name: 'projects' })
  }
}
const showPassword = () => {
  passwordFlag.value = !passwordFlag.value
}
</script>

<template>
  <div class="login-container">
    <v-card variant="tonal" width="400" class="mx-auto">
      <v-card-item>
        <v-card-title>Login</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field
            v-model="loginData.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            label="Email"
            required
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
          />
          <v-text-field
            v-model="loginData.password"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
            label="Password"
            :type="passwordFlag ? 'text' : 'password'"
            :append-inner-icon="passwordFlag ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword"
            required
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
            @keyup.enter.prevent="login"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="goToSignup"> I want to register an account </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-btn color="primary" @click.prevent="login" block> Login </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
