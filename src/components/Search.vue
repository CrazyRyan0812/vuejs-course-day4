<script setup>
import { ref, onMounted } from 'vue';
import { useSearchStore } from '../../stores/SearchStore';
import SearchItem from './SearchItem.vue';
import axios from 'axios';

const store = useSearchStore();

const shopInput = ref('');

const onAddShop = () => {
  const content = shopInput.value;
  if (content.trim() !== '') {
    store.addShop(content);
    shopInput.value = '';
  }
};

const onSearchShop = () => {
  const content = shopInput.value;
  if (content.trim() !== '') {
    store.searchShop(content);
    // 不用清空，讓用戶可以連續搜尋
    // shopInput.value = ""
  }
};

onMounted(() => {
  store.getShops();
});
</script>

<template>
  <section class="container mx-auto">
    <h1 class="text-2xl">台北市 Youbike 查詢</h1>
    <div class="my-2">
      <input
        @keyup.enter="onSearchShop"
        v-model.trim="shopInput"
        placeholder="輸入站點名稱"
        class="input"
      />
      <button @click="onSearchShop" class="btn">搜尋</button>
    </div>
    <div class="divider"></div>
    <section>
      <SearchItem
        v-for="shop in store.filteredShops"
        :key="shop.sno"
        :shop="shop"
      />
    </section>
  </section>
</template>
