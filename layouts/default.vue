<script setup lang="ts">
import Highlight from '../components/Highlight.vue';
</script>

<template>
  <div class="slidev-layout default" :style="style">
    <Highlight />
    <div class="my-auto h-full">
      <slot />
    </div>
  </div>
</template>