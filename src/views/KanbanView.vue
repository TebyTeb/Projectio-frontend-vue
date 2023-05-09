<script setup>
// import { onMounted } from 'vue'
import ListComponent from '@/components/KanbanComponents/ListComponent.vue'
import { storeToRefs } from 'pinia'
// Draggable //
import { VueDraggableNext } from 'vue-draggable-next'
const draggable = VueDraggableNext

// Stores //
import { useSummaryStore } from '../stores/summaryStore'
const summaryStore = useSummaryStore()
// States //
const { projectColumns } = storeToRefs(summaryStore)
</script>

<template>
  <draggable :options="{ group: projectColumns }" group="projectColumns">
    <div class="d-flex flex-nowrap overflow-x-auto overflow-y-hidden fill-height align-center">
      <ListComponent v-for="(list, idx) in projectColumns" :key="idx" :list="list" />
    </div>
  </draggable>
</template>

<style scoped></style>
