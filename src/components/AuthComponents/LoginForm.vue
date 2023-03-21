<template>
  <v-card variant="tonal" width="400" class="mx-auto">
    <v-card-item>
      <v-card-title>Login</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-form @submit.prevent>
        <v-text-field 
        v-model="loginData.email" 
        :error-messages="v$.loginData.email.$errors.map(e => e.$message)"
        label="Email"
        required
        @input="v$.loginData.email.$touch"
        @blur="v$.loginData.email.$touch"
        />
        <v-text-field 
        v-model="loginData.password" 
        :error-messages="v$.loginData.password.$errors.map(e => e.$message)"
        label="Password"
        required
        @input="v$.loginData.password.$touch"
        @blur="v$.loginData.password.$touch"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn 
      color="primary" 
      block
      @click.prevent="login"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import API from '../../Services/authService'
import { useAuthStore } from '../../stores/authStore'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      store: useAuthStore(),
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  validations () {
    return {
      loginData: {
        email: { required, email },
        password: { required }
      }
    }
  },
  methods: {
    async login() {
      const response = await API.login(this.loginData)
      if (response.error) {
        alert('Wrong username/password')
      } else {
        this.store.login(response.email, response.token)
        this.loginData.email = ''
        this.loginData.password = ''
        this.$router.push({ name: 'workspace' })
      }
    }
  }
}
</script>

<style scoped></style>