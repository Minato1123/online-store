<script setup lang="ts">
import _ from 'lodash-es'
import { RouterLink } from 'vue-router'
import type { PropType } from 'vue'
import ProductBox from '../components/ProductBox.vue'
import { useCategoriesStore } from '../stores/category'
import type { Product } from '@/types'
import CategoryMenuMobile from '@/components/CategoryMenuMobile.vue'
import { getIconComponent } from '@/utils'
import type { Pagination } from '@/utils/request'

const props = defineProps({
  productList: {
    type: Array as PropType<Product[]>,
    required: true,
  },
  totalNumOfProducts: {
    type: Number,
    required: true,
    default: 0,
  },
  pagination: {
    type: [Object, null] as PropType<Pagination | null>,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  sortBy: {
    type: String,
    required: true,
  },
  orderBy: {
    type: String,
    required: true,
  },
  linkCategoryId: {
    type: Number,
  },
  linkSubCategoryId: {
    type: Number,
  },
})

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'update:sortBy', 'update:orderBy'])

const { currentPage, pageSize, sortBy, orderBy } = useVModels(props, emit)

const isOpenCategoryMenu = ref(false)

const methodOfSort = ref<'default' | 'price-high' | 'price-low'>('default')
watch(methodOfSort, () => {
  if (!sortBy || !orderBy)
    return
  if (methodOfSort.value === 'default') {
    sortBy.value = 'id'
    orderBy.value = 'asc'
  }
  else if (methodOfSort.value === 'price-high') {
    sortBy.value = 'price'
    orderBy.value = 'desc'
  }
  else if (methodOfSort.value === 'price-low') {
    sortBy.value = 'price'
    orderBy.value = 'asc'
  }
})

// 商品種類
const { categories } = storeToRefs(useCategoriesStore())

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
const numOfProductLine = computed(() => {
  if (windowWidth.value >= 785)
    return 3
  else if (windowWidth.value < 785 && windowWidth.value >= 500)
    return 2
  else
    return 1
})

const lineOfProducts = computed(() => _.chunk(props.productList, numOfProductLine.value))

// 總頁數
const numOfPages = computed(() => {
  if (props.pagination == null)
    return 0
  if (props.pagination.last == null)
    return 0
  return props.pagination.last.page
})

// 頁碼
const pageList = computed(() => {
  const list = []
  const minPage = Math.max(currentPage.value - 2, 1)
  const maxPage = Math.min(minPage + 4, numOfPages.value)

  if (minPage > 1) {
    list.push(1)
    if (currentPage.value > 4)
      list.push('...')
  }

  for (let i = minPage; i <= maxPage; i++)
    list.push(i)

  if (maxPage < numOfPages.value) {
    if (currentPage.value < numOfPages.value - 3)
      list.push('...')
    list.push(numOfPages.value)
  }

  return list
})

function handlePrevPage() {
  if (props.pagination?.prev == null)
    return
  currentPage.value = props.pagination.prev.page
}

function handleNextPage() {
  if (props.pagination?.next == null)
    return
  currentPage.value = props.pagination.next.page
}

function handleThePage(page: number) {
  currentPage.value = page
}
</script>

<template>
  <div class="products-block">
    <div class="products-header">
      <div class="produts-intro-title">
        <button @click="isOpenCategoryMenu = !isOpenCategoryMenu">
          <span>商品分類</span>
          <icon-ri-arrow-drop-down-line />
        </button>
      </div>
      <div class="num-total-products">
        <div class="center-num-total-products">
          <icon-gridicons-product />
          共 {{ totalNumOfProducts }} 件商品
        </div>
      </div>

      <select v-model="methodOfSort" name="products">
        <option value="default">
          商品排序
        </option>
        <option value="price-high">
          價格最高
        </option>
        <option value="price-low">
          價格最低
        </option>
      </select>
    </div>
    <div class="products-content">
      <ul class="categories-block">
        <li v-for="category in categories" :key="`category-${category.id}`" class="categories-list">
          <div
            class="categories-title"
          >
            <RouterLink
              class="categories-title-link"
              :class="{
                active: linkCategoryId === category.id && !linkSubCategoryId,
              }"
              :to="{
                name: 'categories',
                params: { categoryId: category.id },
              }"
            >
              <Component :is="getIconComponent(category.icon)" />
              <div>{{ category.name }}</div>
            </RouterLink>
            <span v-show="!category.isOpen" class="open-subcategories-btn" @click="category.isOpen = true">
              <icon-ic-outline-keyboard-arrow-right />
            </span>
            <span v-show="category.isOpen" class="open-subcategories-btn" @click="category.isOpen = false">
              <icon-ic-baseline-keyboard-arrow-down />
            </span>
          </div>
          <ul v-show="category.isOpen" class="subCategory-block">
            <li v-for="subCategory in category.subCategories" :key="`subCategory-${subCategory.id}`" class="subCategories-list">
              <RouterLink
                :class="{
                  active: linkCategoryId === category.id && linkSubCategoryId === subCategory.id,
                }"
                class="subcategories-link"
                :to="{
                  name: 'subCategories',
                  params: {
                    categoryId: category.id,
                    subCategoryId: subCategory.id,
                  },
                }"
              >
                {{ subCategory.name }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
      <div v-if="productList.length > 0" class="products-list-pages">
        <div class="products-list-container">
          <div v-for="(produntLine, i) in lineOfProducts" :key="`product-line-${i}`" class="products-list">
            <ProductBox v-for="product in produntLine" :key="`product-${product.id}`" class="products" :product="product" />
          </div>
        </div>
        <div v-if="pagination != null" class="pages-container">
          <div class="pages">
            <button :disabled="currentPage === 1" class="page-btn icon-btn" @click="handlePrevPage">
              <icon-material-symbols-chevron-left-rounded />
            </button>
            <button
              v-for="(page, i) in pageList" :key="`page-${i}`" class="page-btn" :class="{
                'active-page': currentPage === page,
              }" :disabled="page === '...'" @click="() => {
                if (typeof page === 'number')
                  handleThePage(page)
              }"
            >
              {{ page }}
            </button>
            <button class="page-btn icon-btn" :disabled="currentPage === numOfPages" @click="handleNextPage">
              <icon-material-symbols-chevron-right-rounded />
            </button>
          </div>
        </div>
      </div>
      <div v-else class="no-products">
        目前沒有商品喔～ 去看看其他分類吧！
      </div>
    </div>
  </div>
  <CategoryMenuMobile :is-open-category-menu="isOpenCategoryMenu" @close-category-menu="isOpenCategoryMenu = false" />
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
    padding-left: 0;
    .categories-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      cursor: pointer;
      &:hover {
        color: var(--match-color);
      }

      .categories-title-link {
        color: var(--main-product-color);
        display: flex;
        gap: 0.5rem;
        align-items: center;
        text-decoration: none;

        &.active {
        color: var(--match-color);
      }
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

        .subcategories-link {
          color: var(--main-product-color);
          text-decoration: none;

          &.router-link-active {
            color: var(--match-color);
          }
        }

      }
    }
  }

  .products-list-pages {
    width: 78%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .products-list-container {
      width: 100%;
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

    .pages-container {
      display: flex;
      justify-content: center;
      align-items: center;

      .pages {
        display: flex;
        gap: 0.2rem;

        .page-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem;
          color: var(--main-product-color);
          border: 1px solid var(--match-color);
          background-color: var(--white-color);
          outline: none;
          width: 2rem;
          border-radius: 0.2rem;
          box-shadow: 1px 1px 3px 0px rgba($color: #000000, $alpha: 0.1);

          &.icon-btn {
            padding: 0;
          }

          &.active-page {
            color: var(--white-color);
            background-color: var(--main-product-color);
            border: none;
          }

          &:hover {
            opacity: 0.7;
            cursor: pointer;
          }

          &:disabled, &.ellipsis-page {
            opacity: 0.5;
            cursor: default;
          }
        }
      }
    }
  }

  .no-products {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--text-color);

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
