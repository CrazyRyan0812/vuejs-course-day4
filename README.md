# 作業功能說明

網站主要由以下元素組成

- Search.vue 主頁面
- SearchItem.vue 每一站點的vue template
- SerachStore.js 集中管理的js function

## Search.vue 主頁面
- const store = useSearchStore(); 用於pinia全局處理儲存狀態
- shopInput showFavorites 對應畫面中的輸入框及收藏按鈕
- toggleFavoritesDisplay 決定該按鈕是否被展開
- onSearchShop 搜尋動作，送出後會被清空
- onMounted 會從localstorage中抓出 已經下載的站點json清單、儲存在本機的收藏內容

對於每個站點出來的結果，這裡偷懶，對於搜尋到的跟儲存到的都使用同一個template

輸入站點名稱搜尋後，每一站點會用

:isFavorite="store.isFavorite(shop)" -> 確認收藏狀態

@toggle-favorite="store.toggleFavorite" -> 如果按下收藏後，會執行的相對動作


## SearchItem.vue 每一站點的vue template

每一站點都會包含 shop isFavorite 的性質，其中會在用toggle-favorite向上傳出是不是要被加入收藏

(其餘功能因都是template相關故略過)

## SerachStore.js 集中管理的js function
- 單一命名介紹(見註解)
- favoriteShops 用於抓取儲存於本地端的sno資料
- loadFavorites 會把本地端的sno資料轉回去parsing出相關站點
- saveFavorites 存入本地端，將Set轉換成陣列在轉換成json字串
- getShops 抓取api上的json
- searchShop 搜尋輸入的內容，對比站點資料的sna，看有沒有符合
- toggleFavorite 加速/刪除 收藏資料的function，都以sno當作唯一值進行儲存
- isFavorite 確認是不是在收藏內