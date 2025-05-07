<template>
    <div class="w-full flex justify-center">
      <div
        class="bg-white text-black shadow-md transition-all duration-300 border border-gray-300"
        :style="{
          maxWidth: `${maxWidth}px`,
          padding: `${padding}px`,
        }"
      >
        <div class="mt-4 text-sm text-gray-700">
          <p><strong>Max Width:</strong> {{ maxWidth }}px</p>
          <p><strong>Padding:</strong> {{ padding }}px</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      maxWidth: {
        type: Number,
        required: true,
      },
      padding: {
        type: Number,
        required: true,
      },
    },
    watch: {
      maxWidth(newValue) {
        this.$emit('update:maxWidth', newValue);
      },
      padding(newValue) {
        this.$emit('update:padding', newValue);
      },
    },
  };
  </script>
  