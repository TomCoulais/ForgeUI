<template>
  <div class="w-full flex justify-center">
    <div
      class="transition-all duration-300 border border-dashed bg-fuchsia-50/20 border-gray-200 rounded-lg "
      :style="{
        maxWidth: `${maxWidth}px`,
        padding: `${padding}px`,
      }"
    >
      <div class="text-sm text-gray-700 font-medium space-y-2">
        <p class="text-center text-gray-200 mx-3"><strong>Max Width:</strong> {{ maxWidth }}</p>
        <p class="text-center text-gray-200 mx-3"><strong>Padding:</strong> {{ padding }}</p>
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
  
  