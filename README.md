# Pochacco Online Store
Demo：https://minato1123.github.io/online-store/
## 介紹
使用 Figma 規劃網頁設計，實作 SPA 範例電商平台（具備 RWD）。<br>
由於無實際架設 Server，僅開發環境能實際操作存在 JSON 檔案內的資料，線上版本僅能操作假資料。<br>

圖片與資料來源：[Sanrio Gift Gate官方購物網站 | Small Gift Big Smile](https://www.sanriogiftgate.com.tw/)

> ### 🧪 測試登入<br>
> 帳號：`pochacco@example.com`<br>
> 密碼：`pochacco229`

## 動機
最初的目的是藉由一份作品學習到如何打 API 取得資料，因此選擇了常見的主題——電商平台，再加上個人喜好的部分，電商平台主題是帕恰狗。

## 功能
### 主畫面
![image](https://user-images.githubusercontent.com/71639540/223124664-f60113f3-a20d-474b-a86d-c2edb75fc634.png)
### 會員系統
* 登入

![image](https://user-images.githubusercontent.com/71639540/223124807-9ffa20f1-a51b-4b57-bb5e-739a4e73f9b3.png)
* 註冊（具備表單驗證）

![image](https://user-images.githubusercontent.com/71639540/223124924-319ec190-a265-48b4-a7ab-dc83dc6fe557.png)
* 帳戶相關資料與操作

![image](https://user-images.githubusercontent.com/71639540/223124974-26e0abb0-0b5f-45f7-b79c-4d74cd0305d5.png)

### 瀏覽商品清單、各項商品
* 瀏覽全部商品<br>
部分需要的清單類 API 有做 Pagination。

![image](https://user-images.githubusercontent.com/71639540/223125320-7609c99c-5eca-4c08-a417-8d3da66f868f.png)

* 商品詳細

![image](https://i.imgur.com/wE8pSFD.png)

### 購物車
* 未登入狀態會將商品暫存在 LocalStorage（結帳強制登入）。
* 登入後會自動將原本暫存於 LocalStorage 購物車的資料寫入帳號的購物車內。

![](https://i.imgur.com/ro91Zed.png)

### 結帳（具備表單驗證）
* 結帳步驟一（填寫個人資料）

![image](https://user-images.githubusercontent.com/71639540/223125768-b7baec7a-ff5f-49a4-9e0f-908c23c9e004.png)

* 結帳步驟二（填寫付款、收件資料）

![image](https://user-images.githubusercontent.com/71639540/223125737-072aa5ae-6cd4-4f4d-a1d5-24625b991317.png)

* 結帳完成，訂單確認畫面

![image](https://user-images.githubusercontent.com/71639540/223125798-70727a7b-d505-42cc-9ff5-e832ce59a0dd.png)

### 訂單記錄
* 訂單記錄總覽

![image](https://user-images.githubusercontent.com/71639540/223125942-ea74528a-0a90-4c4a-940e-3d1f65e133c3.png)

* 訂單各項內容與詳細

![image](https://user-images.githubusercontent.com/71639540/223125983-0a1ae5e0-bbb1-4d74-93cc-43e329d9b0b5.png)

### 商品名稱搜尋功能
* 單關鍵字搜尋

![](https://i.imgur.com/5CsvtCq.png)

* 配合 FZF 套件模糊搜尋（可多關鍵字）

![](https://i.imgur.com/f77j9kG.png)



## 本地端架設環境的使用方法
1. 下載需要的套件
```sh
pnpm install
```
2. 啟動本地後端
```sh
pnpm dev:server
```
3. 啟動 dev server（系統開發環境）
```sh
pnpm dev
```
註：在開發環境會真的操作到資料喔！

## 技術
### 前端
1. Vue 3
2. Vue-router
3. Pinia
4. Vite
5. TypeScript
6. Scss

### 後端
1. Koa.js

## 套件
1. [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
2. [unplugin-icons](https://github.com/antfu/unplugin-icons)
3. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
4. [VueUse](https://vueuse.org/)
5. [Lodash](https://lodash.com/)
6. [FormKit](https://formkit.com/)
7. [Vee-validation](https://vee-validate.logaretm.com/v4/)
8. [Floating Vue](https://floating-vue.starpad.dev/)
9. [esno](https://github.com/esbuild-kit/esno)
10. [FZF](https://fzf.netlify.app/docs/latest)