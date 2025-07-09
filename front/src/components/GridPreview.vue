<template>
    <div class="grid-preview mt-4 flex items-center justify-center">
      <div
        class="grid"
        :style="{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        }"
      >
        <div
          v-for="i in columns"
          :key="i"
          class=" bg-fuchsia-50/20 border border-dashed p-4 text-center rounded-md"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      columns: {
        type: Number,
        required: true,
      },
      gap: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
      };
    },
    methods: {
    },
  };
  </script>
  
  <style scoped>
  .grid {
    display: grid;
  }
  
  .grid-item {
    background-color: #e2e8f0;
  }
  </style>
  