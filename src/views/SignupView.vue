<template>
  <v-container>
    <p>I'm the signup view!!</p>
    <SignupForm />
  </v-container>
</template>

<script>
import SignupForm from '../components/AuthComponents/SignupForm.vue'
export default {
components: {
  SignupForm
}
}
</script>

<style scoped></style>
