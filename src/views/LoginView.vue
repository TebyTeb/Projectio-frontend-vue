<template>
  <v-container>
    <p>I'm the login view!!</p>
    <LoginForm />
  </v-container>
</template>

<script>
import LoginForm from '../components/AuthComponents/LoginForm.vue'
export default {
components: {
  LoginForm
}
}
</script>

<style scoped></style>
