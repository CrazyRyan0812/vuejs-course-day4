<script setup>
import { ref, onMounted } from 'vue';
import { useSearchStore } from './stores/SearchStore';
import SearchItem from './SearchItem.vue';

const store = useSearchStore();

const shopInput = ref('');
const showFavorites = ref(false);

const toggleFavoritesDisplay = () => {
  showFavorites.value = !showFavorites.value;
}

const onSearchShop = () => {
  const content = shopInput.value;
  if (content.trim() !== '') {
    store.searchShop(content);
    shopInput.value = ""
  }
};

onMounted(() => {
  store.getShops();
  store.loadFavorites();
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
      <button @click="toggleFavoritesDisplay" class="btn btn-success">
        {{ showFavorites ? '隱藏收藏' : '展開收藏' }}
      </button>
    </div>

    <div v-if="showFavorites" class="my-2 p-2 border border-gray-300 rounded bg-gray-50">
      <h3 class="font-bold mb-2">收藏站點</h3>
      <div v-if="store.favoriteShops.length === 0">尚未收藏任何站點</div>
      <div v-else>
        <SearchItem
          v-for="shop in store.favoriteShops"
          :key="shop.sno"
          :shop="shop"
          :isFavorite="store.isFavorite(shop)"
          @toggle-favorite="store.toggleFavorite"
        />
      </div>
    </div>

    <div class="divider"></div>

    <section>
      <SearchItem
        v-for="shop in store.filteredShops"
        :key="shop.sno"
        :shop="shop"
        :isFavorite="store.isFavorite(shop)"
        @toggle-favorite="store.toggleFavorite"
      />
    </section>
  </section>
</template>
