<script setup>
import Search from './components/ui/Search';
import { ref, onMounted } from 'vue';
const show = ref('login');

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
