<script setup>
import { ref } from 'vue';
defineEmits(['toggle-favorite']);

const props = defineProps({
  shop: Object,
  isFavorite: Boolean
});

const showDetails = ref(false);
const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<template>
  <div class="select-none card bg-base-100 card-md shadow-sm" @click="toggleDetails">
    <div class="card-body flex justify-between items-center">
      <h2 class="card-title">{{ shop.sna }}</h2>
      <div class="flex space-x-2">

        <button class="btn btn-sm btn-primary" @click.stop="toggleDetails">
          {{ showDetails ? '收合' : '展開' }}
        </button>

        <button class="btn btn-sm" :class="isFavorite ? 'btn-error' : 'btn-success'"
          @click.stop="$emit('toggle-favorite', shop)">
          {{ isFavorite ? '移除' : '收藏' }}
        </button>
      </div>

    </div>
  </div>

  <div v-if="showDetails" class="p-2 border border-gray-300 rounded mb-2">
    <p><strong>站名：</strong> {{ shop.sna }}</p>
    <p><strong>地址：</strong> {{ shop.ar }}</p>
    <p><strong>剩餘車輛數：</strong> {{ shop.available_rent_bikes }}</p>
    <p><strong>可停車格：</strong> {{ shop.Quantity }}</p>
    <p><strong>站點區域：</strong> {{ shop.sarea }}</p>
  </div>
</template>