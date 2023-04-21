<script setup>
// IMPORTS //
// -> Dependencies
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
// Stores //
import {useSummaryStore} from '../stores/summaryStore'
const summaryStore = useSummaryStore()
// Router //
const route = useRoute()
const { projectId } = route.params
// States //
const { projectData, sprintList, taskList } = storeToRefs(summaryStore) 
// Directive Hooks //
onMounted(async () => {
  summaryStore.fetchAllData(projectId)
})

</script>

<template>
  <h1>I´m the Project Summary View!!</h1>
  <pre>
    Project: {{ projectData }}
    Sprints: {{ sprintList }}
    Tasks: {{ taskList }}
  </pre>
</template>