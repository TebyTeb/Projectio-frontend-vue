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
        :type="passwordFlag ? 'text' : 'password'"
        :append-inner-icon="passwordFlag ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword"
        required
        @input="v$.loginData.password.$touch"
        @blur="v$.loginData.password.$touch"
        @keyup.enter="login"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block> 
        <router-link :to="{name: 'Signup'}"> I want to register an account </router-link>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-btn color="primary" @click.prevent="login" block>
        Login 
      </v-btn>
    </v-card-text>
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
      },
      passwordFlag: false
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
        this.v$.$reset()
        this.$router.push({ name: 'workspace' })
      }
    },
    showPassword() {
      this.passwordFlag = !this.passwordFlag
    }
  }
}
</script>

<style scoped></style>