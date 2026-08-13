<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <span class="brand">TaskFlow</span>
      <nav class="nav">
        <RouterLink to="/">Board</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>
