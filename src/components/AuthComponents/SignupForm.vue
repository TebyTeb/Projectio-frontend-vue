<template>
  <v-card variant="tonal" width="400" class="mx-auto">
    <v-card-item>
      <v-card-title>Login</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-form @submit.prevent>
        <v-text-field 
        v-model="signupData.email" 
        :error-messages="v$.signupData.email.$errors.map(e => e.$message)"
        label="Email"
        required
        @input="v$.signupData.email.$touch"
        @blur="v$.signupData.email.$touch"
        />
        <v-text-field 
        v-model="signupData.password" 
        :error-messages="v$.signupData.password.$errors.map(e => e.$message)"
        label="Password"
        :type="passwordFlag ? 'text' : 'password'"
        :append-inner-icon="passwordFlag ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword"
        required
        @input="v$.signupData.password.$touch"
        @blur="v$.signupData.password.$touch"
        />
        <v-text-field 
        v-model="signupData.password2" 
        :error-messages="v$.signupData.password2.$errors.map(e => e.$message)"
        label="Password"
        :type="passwordFlag ? 'text' : 'password'"
        :append-inner-icon="passwordFlag ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword"
        required
        @input="v$.signupData.password2.$touch"
        @blur="v$.signupData.password2.$touch"
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
import { required, email,  minLength, sameAs } from '@vuelidate/validators'
import API from '../../Services/authService'
import { useAuthStore } from '../../stores/authStore'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      store: useAuthStore(),
      signupData: {
        name: '',
        surname: '',
        email: '',
        birthdate: '',
        password: '',
        password2: ''
      },
      passwordFlag: false
    }
  },
  validations () {
    return {
      signupData: {
        name: { required },
        surname: { required },
        email: { required, email },
        birthdate: { required },
        password: { required, minLength: minLength(6) },
        password2: { required, sameAsPassword: sameAs(this.signupData.password) }
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
    },
    showPassword() {
      this.passwordFlag = !this.passwordFlag
    }
  }
}
</script>

<style scoped></style>