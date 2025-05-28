<template>
  <div class="w-full flex justify-center">
    <div
      class="transition-all duration-300 border border-gray-200 rounded-lg bg-gradient-to-br from-white via-gray-50 to-gray-100"
      :style="{
        maxWidth: `${maxWidth}px`,
        padding: `${padding}px`,
      }"
    >
      <div class="text-sm text-gray-700 font-medium space-y-2">
        <p class="text-center mx-3"><strong class="text-gray-900">Max Width:</strong> {{ maxWidth }}px</p>
        <p class="text-center mx-3"><strong class="text-gray-900">Padding:</strong> {{ padding }}px</p>
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
  
  