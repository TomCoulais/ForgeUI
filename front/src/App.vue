<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <UApp>
    <header class="flex flex-row items-start">

      <RouterView class="flex-grow"/>
    </header>
  </UApp>
</template>
