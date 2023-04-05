<template>
  <pre>
    {{ projectList }}
  </pre>
</template>

<script>
import API from '../Services/projectsService'
export default {
  data() {
    return {
      projectList: []
    }
  },
async beforeCreate() {
  const projects = await API.getProjects()
  this.projectList = projects
}
}
</script>

<style scoped></style>
