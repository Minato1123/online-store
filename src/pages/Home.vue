<script setup lang="ts">
import _ from 'lodash-es'
import type { Component } from 'vue'
import Slides from '../components/Slides.vue'
import ProductBox from '../components/ProductBox.vue'
import IconShoppingBagBold from '~icons/ph/shopping-bag-bold'
import IconFoundationMakeup from '~icons/icon-park-outline/foundation-makeup'
import IconBookOpenBlankVariant from '~icons/mdi/book-open-blank-variant'
import IconTeddyBear from '~icons/fluent-emoji-high-contrast/teddy-bear'

// 商品
export interface Product {
  id: number
  name: string
  categoryId: number
  subCategoryId: number
  price: number
  description: string[]
  images: string[]
  specifications: string[]
  details: {
    size: string | null
    wrapSize: string | null
    origin: string | null
    material: string | null
    content: string | null
    weight: string | null
  }
}

const products = ref<Product[]>([
  {
    id: 1,
    name: '帕恰狗日製迷你便條本（悠閒生活）',
    categoryId: 3,
    subCategoryId: 1,
    price: 50,
    description: ['日本製造 Sanrio 文具雜貨', '2 款彩色內頁的迷你便條本', '留言記事便利又可愛'],
    images: [
      '/images/products/product-1-1.jpeg',
    ],
    specifications: ['小', '中', '大'],
    details: {
      size: '6.8 * 8.8 cm',
      wrapSize: '7 * 1 * 9 cm',
      origin: '日本',
      material: '紙',
      content: '兩款圖案、各 50 枚，共 100 枚',
      weight: '45 g',
    },
  },
  {
    id: 2,
    name: '帕恰狗 10mm 紙膠帶（快樂下午茶）',
    categoryId: 3,
    subCategoryId: 2,
    price: 75,
    description: ['Sanrio 文具雜貨', '圖案豐富，寬度10mm細版紙膠帶', '好撕貼，細小範圍也能漂亮黏貼'],
    images: [
      '/images/products/product-2-1.jpeg',
    ],
    specifications: [],
    details: {
      size: '膠帶尺寸 ─ 寬 1 cm * 長 10 m',
      wrapSize: '5 * 1.5 * 6.5 cm',
      origin: '中國大陸',
      material: '紙',
      content: null,
      weight: '10 g',
    },
  },
  {
    id: 3,
    name: '帕恰狗 15mm 紙膠帶（悠閒生活）',
    categoryId: 3,
    subCategoryId: 2,
    price: 95,
    description: ['Sanrio 文具雜貨', '圖案豐富的 15mm 標準寬度紙膠帶', '好撕貼，隨處裝飾都可愛'],
    images: [
      '/images/products/product-3-1.jpeg',
    ],
    specifications: [],
    details: {
      size: '膠帶尺寸─寬 1.5 cm * 長 10 m',
      wrapSize: '5.5 * 2*7 cm',
      origin: '中國大陸',
      material: '紙',
      content: null,
      weight: '14 g',
    },
  },
  {
    id: 4,
    name: '帕恰狗 PU皮革迷你斜背提包（俏皮姿態）',
    categoryId: 1,
    subCategoryId: 1,
    price: 890,
    description: ['Sanrio 生活雜貨', 'PU 皮革材質的斜背小提包', '外出手機卡片現金攜帶好方便'],
    images: [
      '/images/products/product-4-1.jpeg',
    ],
    specifications: [],
    details: {
      size: '17 * 10 * 15.5 cm - 不含提把長 34 cm、可調式背帶長 70 ~ 132 cm',
      wrapSize: '20 * 12 * 18 cm',
      origin: '中國大陸',
      material: 'PU 皮革',
      content: '內部收納格、外側收納格（開口為拉鍊式）',
      weight: '172 g',
    },
  },
  {
    id: 5,
    name: '帕恰狗鉛筆風原子筆組（永遠在一起）',
    categoryId: 3,
    subCategoryId: 3,
    price: 280,
    description: ['Sanrio 文具雜貨', '復古鉛筆外型的黑色 & 紅色原子筆組', '書寫筆記、重點標示都清晰便利'],
    images: [
      '/images/products/product-5-1.jpeg',
    ],
    specifications: [],
    details: {
      size: '單支直徑約 0.8 * 16.5 cm、收納袋約 4 * 0.9 * 17.9 cm',
      wrapSize: '4.5 * 1 * 18.3 cm',
      origin: '中國大陸',
      material: '塑膠 - ABS, PVC',
      content: '1 組 2 支入（0.5 mm 黑色、0.5 mm 紅色）',
      weight: '18 g',
    },
  },
  {
    id: 6,
    name: '帕恰狗與好朋友絨毛娃娃組（盎然春意）',
    categoryId: 4,
    subCategoryId: 1,
    price: 1850,
    description: ['Sanrio 生活雜貨', '內含帕恰狗與好朋友的 3 入 1 組絨毛娃娃', '附透明收納盒，展示也方便不染灰塵'],
    images: [
      '/images/products/product-6-1.jpeg',
    ],
    specifications: [],
    details: {
      size: '帕恰狗：約 19 * 14 * 20cm；ピーちゃん：約 9 * 6.5 * 7.5 cm；兔兔：約 8 * 8 * 15 cm',
      wrapSize: '25 * 14.7 * 22.2 cm',
      origin: '中國大陸',
      material: '棉、丙烯酸',
      content: null,
      weight: '314 g',
    },
  },
])

// 視窗寬度
const windowWidth = ref(window.innerWidth)

function getWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() =>
  window.addEventListener('resize', getWidth),
)

onUnmounted(() =>
  window.removeEventListener('resize', getWidth),
)

// 每行商品數量
const numOfProductLine = ref(0)
if (windowWidth.value >= 785)
  numOfProductLine.value = 3
else if (windowWidth.value < 785 && windowWidth.value >= 500)
  numOfProductLine.value = 2
else
  numOfProductLine.value = 1

watch(windowWidth, () => {
  if (windowWidth.value >= 785)
    numOfProductLine.value = 3
  else if (windowWidth.value < 785 && windowWidth.value >= 500)
    numOfProductLine.value = 2
  else
    numOfProductLine.value = 1
})

const lineOfProducts = computed(() => _.chunk(products.value, numOfProductLine.value))

// 商品總數
const numOfProducts = computed(() => products.value.length)

// 商品種類
interface Catrgory {
  id: number
  name: string
  path: string
  icon?: Component
  isOpen?: boolean
  subCategories?: Catrgory[]
}

const categories = ref<Catrgory[]>([
  {
    id: 1,
    name: '包包、時尚小物',
    path: '/bags-fashion',
    icon: shallowRef(IconShoppingBagBold),
    isOpen: false,
    subCategories: [
      {
        id: 1,
        name: '合成皮革包袋',
        path: '/synthetic-leather-bags',
      },
      {
        id: 2,
        name: '托特包、手提包',
        path: '/tote-bags',
      },
      {
        id: 3,
        name: '肩包、斜背包',
        path: '/shoulder-bags',
      },
    ],
  },
  {
    id: 2,
    name: '個人、美妝用品',
    path: '/personal-beauty',
    icon: shallowRef(IconFoundationMakeup),
    isOpen: false,
    subCategories: [
      {
        id: 1,
        name: '化妝品',
        path: '/makeup',
      },
      {
        id: 2,
        name: '身體乳、護手霜、護唇膏',
        path: '/body-lotion',
      },
      {
        id: 3,
        name: '鏡子、梳子',
        path: '/mirror-brush',
      },
    ],
  },
  {
    id: 3,
    name: '文具',
    path: '/stationery',
    icon: shallowRef(IconBookOpenBlankVariant),
    isOpen: false,
    subCategories: [
      {
        id: 1,
        name: '便條紙、信紙',
        path: '/note-paper',
      },
      {
        id: 2,
        name: '貼紙、紙膠帶',
        path: '/sticker-tape',
      },
      {
        id: 3,
        name: '筆類',
        path: '/pens',
      },
    ],
  },
  {
    id: 4,
    name: '絨毛、趣味玩具',
    path: '/toys',
    icon: shallowRef(IconTeddyBear),
    isOpen: false,
    subCategories: [
      {
        id: 1,
        name: '絨毛娃娃',
        path: '/plush-toys',
      },
      {
        id: 2,
        name: '玩偶、吊鏈',
        path: '/dolls',
      },
      {
        id: 3,
        name: '紓壓小物',
        path: '/stress-relief',
      },
    ],
  },
])
</script>

<template>
  <Slides />
  <div class="products-block">
    <div class="products-header">
      <div class="produts-intro-title">
        <button>
          <span>商品分類</span>
          <icon-ri-arrow-drop-down-line />
        </button>
      </div>
      <div class="num-total-products">
        <div class="center-num-total-products">
          <icon-gridicons-product />
          共 {{ numOfProducts }} 件商品
        </div>
      </div>

      <select name="products">
        <option value="">
          商品排序
        </option>
        <option value="sales-volume-high">
          銷售量最高
        </option>
        <option value="sales-volume-low">
          銷售量最低
        </option>
        <option value="price-high">
          價格最高
        </option>
        <option value="price-low">
          價格最低
        </option>
        <option value="release-recently">
          最新上架
        </option>
        <option value="release-long-ago">
          最久遠上架
        </option>
      </select>
    </div>
    <div class="products-content">
      <ul class="categories-block">
        <li v-for="category in categories" :key="`category-${category.id}`" class="categories-list">
          <div class="categories-title">
            <Component :is="category.icon" />
            <div>{{ category.name }}</div>
            <span v-show="!category.isOpen" class="open-subcategories-btn" @click="category.isOpen = true">
              <icon-ic-outline-keyboard-arrow-right />
            </span>
            <span v-show="category.isOpen" class="open-subcategories-btn" @click="category.isOpen = false">
              <icon-ic-baseline-keyboard-arrow-down />
            </span>
          </div>
          <ul v-show="category.isOpen" class="subCategory-block">
            <li v-for="subCategory in category.subCategories" :key="`subCategory-${subCategory.id}`" class="subCategories-list">
              <div> {{ subCategory.name }} </div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="products-list-container">
        <div v-for="(produntLine, i) in lineOfProducts" :key="`product-line-${i}`" class="products-list">
          <ProductBox v-for="product in produntLine" :key="`product-${product.id}`" class="products" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
}
.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--main-product-color);
  height: 2.2rem;
  width: 100%;
  color: var(--white-color);
  border-radius: 5rem;

  .produts-intro-title {

    width: 24%;
    display: flex;
    justify-content: start;

    button {
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      white-space: nowrap;

      span {
        margin-right: 0.5rem;
      }
    }
  }

  .center-num-total-products {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  select {
    margin-left: auto;
    border: none;
    background-color: var(--white-color);
    color: var(--main-product-color);
    width: 7.5rem;
    border-radius: 0 5rem 5rem 0;
    outline: none;
    line-height: 1.5rem;
  }
}

.products-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;

  .categories-block {
    width: 22%;
    min-width: 10rem;
    color: var(--main-product-color);
    flex-shrink: 0;
    .categories-title {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      cursor: pointer;
      &:hover {
        color: var(--match-color);
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .open-subcategories-btn {
        color: var(--match-color);

      }

    }
    .subCategory-block {
      border-bottom: 0.07rem solid var(--main-product-color);
      border-left: 0.07rem solid var(--main-product-color);
      margin-right: 15%;
      margin-bottom: 1rem;

      .subCategories-list {
        margin: 1rem 0;
        margin-left: -1rem;
        cursor: pointer;

        &:hover {
          color: var(--match-color);
        }

      }
    }
  }

  .products-list-container {
    width: 78%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;

    .products-list {
      display: flex;
      justify-content: flex-start;

      .products {
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}

@media screen and (min-width: 1160px) {

  .products-header {
    padding: 0 0.3rem 0 1rem;
  }

  .produts-intro-title {
    button {
      cursor: default;
      background-color: transparent;
      color: var(--white-color);

      .svg-icon {
        display: none;
      }
    }
  }

  .products-list {
    margin-bottom: 2rem;
  }

}

ul, li {
  list-style-type: none;
}

@media screen and (max-width: 1160px) {

  .products-header {
    padding: 0 0.3rem 0 0.3rem;
  }
  .categories-block {
    display: none;
  }

  .produts-intro-title {
    button {
      cursor: pointer;
      background-color: var(--white-color);
      color: var(--main-product-color);
      border-radius: 5rem 0 0 5rem;
      line-height: 1.5rem;
    }
  }

  .products-list {
    margin-bottom: 2rem;
  }

}

@media screen and (min-width: 785px) {
  .products-list {
    gap: 2%;
  }
}

@media screen and (max-width: 785px) {
  // product 換成兩個一組
  .products-list {
    margin-bottom: 1.5rem;
    gap: 4%;
  }
}

// @media screen and (min-width: 500px) {
//   // product 換成兩個一組
//   .products-list {
//     gap: 4%;
//   }
// }

@media screen and (max-width: 500px) {
  .products-list {
    gap: 0;
  }
}

@media screen and (min-width: 575px) {
  .num-total-products {
    display: block;
  }
}

@media screen and (max-width: 575px) {
  // product 換成一個一組
  .products-list {
    margin-bottom: 1rem;
  }
  .num-total-products {
    display: none;
  }
}
</style>
