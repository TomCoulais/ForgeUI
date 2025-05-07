<template>
    <div class="grid-preview mt-4">
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
          class="grid-item bg-gray-200 p-4 text-center"
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
  