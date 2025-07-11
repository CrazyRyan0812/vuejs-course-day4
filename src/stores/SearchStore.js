import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

const useSearchStore = defineStore("shops", () => {
  const shops = ref([])               // 所有站點資料
  const filteredShops = ref([])       // 篩選後的資料
  const searchKeyword = ref("")       // 搜尋關鍵字

  // 取得所有站點資料
  const getShops = async () => {
    const { data } = await axios.get("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json")
    shops.value = data
  }

  // 依關鍵字搜尋站點名稱
  const searchShop = (keyword) => {
    searchKeyword.value = keyword
    filteredShops.value = shops.value.filter(shop =>
      shop.sna.includes(keyword)
    )
  }

  // 新增站點（範例，實務中可能用不到）
  const addShop = (content) => {
    // 這裡可以加入新增邏輯
    // 目前範例直接加入到 `shops` 和 `filteredShops`
    const newShop = {
      id: crypto.randomUUID(),
      sna: content,
      // 其他必要屬性可補充
    }
    shops.value.unshift(newShop)
    filteredShops.value.unshift(newShop)
  }

  return {
    shops,
    filteredShops,
    searchShop,
    getShops,
    addShop,
    searchKeyword,
  }
})

export { useSearchStore }