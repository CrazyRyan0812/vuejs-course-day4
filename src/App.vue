<script setup>
import Search from './Search.vue'
import { ref, onMounted } from 'vue';

onMounted(() => {
  // const token = localStorage.getItem(STORAGE_KEY)
  // const token = getToken()
  // if (token) {
  // show.value = "todo"
  // }
});
</script>

<template>
  <Search />
</template>

<style scoped></style>
