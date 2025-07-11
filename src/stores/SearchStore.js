import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"

const useSearchStore = defineStore("shops", () => {
  const shops = ref([]) //站點
  const filteredShops = ref([]) //已篩選出的搜尋後站點
  const searchKeyword = ref("")
  const favoriteSnos = ref(new Set()); //用Set來儲存站點資訊

  const favoriteShops = computed(() => {
    return shops.value.filter(shop => favoriteSnos.value.has(shop.sno));
  });

  const loadFavorites = () => {
    const favs = localStorage.getItem('favoriteShops');
    if (favs) {
      favoriteSnos.value = new Set(JSON.parse(favs));
    }
  }
  
  const saveFavorites = () => {
    localStorage.setItem('favoriteShops', JSON.stringify([...favoriteSnos.value])); // 將Set轉換成陣列在轉換成json字串
    console.log('存入localStorage:', localStorage.getItem('favoriteShops'));
  }

  const getShops = async () => {
    const { data } = await axios.get("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json")
    shops.value = data
  }

  const searchShop = (keyword) => {
    searchKeyword.value = keyword
    filteredShops.value = shops.value.filter(shop =>
      shop.sna.includes(keyword)
    )
  }

  const toggleFavorite = (shop) => {
    console.log('before:', [...favoriteSnos.value]);
    if (favoriteSnos.value.has(shop.sno)) {
      favoriteSnos.value.delete(shop.sno);
      console.log('刪除:', shop.sna);
    } else {
      favoriteSnos.value.add(shop.sno);
      console.log('加入:', shop.sna);
    }
    saveFavorites();
    console.log('after:', [...favoriteSnos.value]);
  }

  const isFavorite = (shop) => {
    return favoriteSnos.value.has(shop.sno);
  }

  return {
    shops,
    filteredShops,
    searchKeyword,
    favoriteSnos,
    favoriteShops,
    loadFavorites,
    getShops,
    searchShop,
    toggleFavorite,
    isFavorite
  }
})

export { useSearchStore }