<template>
  <div>
    <button
      :style="{
        padding: padding + 'px',
        fontSize: fontSize + 'px',
        borderRadius: border.radius + 'px',
        backgroundColor: '#ff00aa',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }"
    >
      <slot>Bouton</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonPreview',
  props: {
    padding: {
      type: Number,
      default: 8,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    border: {
      type: Number,

    },
  },
};
</script>
