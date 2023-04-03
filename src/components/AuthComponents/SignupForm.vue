<template>
  <v-card variant="tonal" width="400" class="mx-auto">
    <v-card-item>
      <v-card-title>Login</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-form @submit.prevent>
        <v-text-field
          v-model="signupData.name"
          :error-messages="v$.signupData.name.$errors.map((e) => e.$message)"
          label="Name"
          type="text"
          required
          
          @blur="v$.signupData.name.$touch"
        />
        <v-text-field
          v-model="signupData.surname"
          :error-messages="v$.signupData.surname.$errors.map((e) => e.$message)"
          label="Surname(s)"
          type="text"
          required
          @input="v$.signupData.surname.$touch"
          @blur="v$.signupData.surname.$touch"
        />
        <v-text-field
          v-model="signupData.email"
          :error-messages="v$.signupData.email.$errors.map((e) => e.$message)"
          label="Email"
          type="email"
          required

          @blur="v$.signupData.email.$touch"
        />
        <v-text-field
          v-model="signupData.birthDate"
          :error-messages="v$.signupData.birthDate.$errors.map((e) => e.$message)"
          label="birth date"
          type="date"
          required
          @input="v$.signupData.birthDate.$touch"
          @blur="v$.signupData.birthDate.$touch"
        />
        <v-text-field
          v-model="signupData.password"
          :error-messages="v$.signupData.password.$errors.map((e) => e.$message)"
          label="Password"
          :type="passwordFlag ? 'text' : 'password'"
          :append-inner-icon="passwordFlag ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword"
          required
          @input="v$.signupData.password.$touch"
          @blur="v$.signupData.password.$touch"
          @keyup.enter="signup"
        />
        <v-text-field
          v-model="password2"
          :error-messages="v$.password2.$errors.map((e) => e.$message)"
          label="Password"
          :type="passwordFlag ? 'text' : 'password'"
          :append-inner-icon="passwordFlag ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword"
          required
          @input="v$.password2.$touch"
          @blur="v$.password2.$touch"
          @keyup.enter="signup"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block> 
        <router-link :to="{name: 'login'}"> I'm already a member </router-link>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-btn color="primary" @click.prevent="signup" block>
        Signup 
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
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
        birthDate: '',
        password: ''
      },
      password2: '',
      passwordFlag: false
    }
  },
  validations() {
    return {
      signupData: {
        name: { required },
        surname: { required },
        email: { required, email },
        birthDate: { required },
        password: { required, minLength: minLength(6) }
      },
      password2: { required, sameAsPassword: sameAs(this.signupData.password) }
    }
  },
  methods: {
    async signup() {
      if (this.v$.$invalid) return alert('Form incomplete. Please check your inputs')
      const response = await API.signup(this.signupData)
      if (response.error) {
        alert('Something went wrong')
      } else {
        this.store.login(response.email, response.token)
        Object.assign(this.signupData, {
          name: '',
          surname: '',
          email: '',
          birthDate: '',
          password: '',
          password2: ''
        })
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
