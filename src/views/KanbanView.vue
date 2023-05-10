<script setup>
// import { onMounted } from 'vue'
import ListComponent from '@/components/KanbanComponents/ListComponent.vue'
import { storeToRefs } from 'pinia'
// Draggable //
import Draggable from 'vuedraggable'

// Stores //
import { useSummaryStore } from '../stores/summaryStore'
const summaryStore = useSummaryStore()
// States //
const { projectColumns } = storeToRefs(summaryStore)
</script>

<template>
  <div class="d-flex flex-nowrap overflow-x-auto overflow-y-hidden fill-height align-center">
    <Draggable
      v-model="projectColumns"
      group="columns"
      item-key="_id"
      class="d-flex"
    >
    <template #item="list">
      <ListComponent :list="list" />
    </template>
    </Draggable>
  </div>
</template>

<style scoped></style>
