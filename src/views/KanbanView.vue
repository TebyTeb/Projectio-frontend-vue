<template>
  <div class="d-flex flex-nowrap overflow-x-auto fill-height align-center">
    <v-sheet
      v-for="(n, idx) in 4"
      :key="idx"
      :n="n"
      class="ma-2 d-flex flex-column flex-nowrap"
      height="90vh"
      min-width="450px"
      max-width="450px"
    >
      <v-card height="30px" class="mb-2 flex-shrink-0"> List Name </v-card>
      <v-sheet class="mb-2 overflow-auto align-self-auto flex-grow-0 flex-srhink-1">
        <v-card v-for="(n, idx) in 10" :key="idx" :n="n" class="ma-2 pa-2" color="grey-darken-1">
          i'm a card
        </v-card>
      </v-sheet>
      <v-card color="grey-darken-1" height="60px" class="mt-auto ma-1 flex-shrink-0">
        ADD NEW TASK
      </v-card>
    </v-sheet>
  </div>
</template>
