<template>
  <div :style="computedStyle">
    <slot>
      The quick brown fox jumps over a lazy dog.
    </slot>
  </div>
</template>

<script>
export default {
  name: 'TitlePreview',
  props: {
    font: {
      type: String,
      default: 'Arial, sans-serif',
    },
    size: {
      type: String,
      default: '16px',
    },
    weight: {
      type: [String, Number],
      default: '400',
    },
  },
  computed: {
    computedStyle() {
      const sizeWithPx = this.size.match(/^\d+$/) ? `${this.size}px` : this.size;
      return {
        fontFamily: this.font,
        fontSize: sizeWithPx,
        fontWeight: this.weight,
      };
    },
  },
};
</script>
