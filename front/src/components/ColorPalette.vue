<template>
    <div>
      <!-- Récupérer les couleurs via les slots -->
      <div class="color-circle" :style="{ backgroundColor: darkColor }"></div>
      <div class="color-circle" :style="{ backgroundColor: lightColor }"></div>
      <div class="color-circle" :style="{ backgroundColor: accentColor }"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      darkColor: {
        type: String,
        default: '#333333' 
      },
      lightColor: {
        type: String,
        default: '#eeeeee' 
      },
      accentColor: {
        type: String,
        default: '#ff0000' 
      }
    }
  };
  </script>
  
  <style scoped>
  .color-circle {
    width: 50px; 
    height: 50px; 
    border-radius: 50%;
    margin: 10px 0;
    display: inline-block;
  }
  </style>
  