<script setup lang="ts">
import _ from 'lodash-es'
import Slides from '../components/Slides.vue'
import ProductBox from '../components/ProductBox.vue'
import { useProductsStore } from '../stores/product'
import { useCategoriesStore } from '../stores/category'
import { getIconComponent } from '@/utils'

// 商品
const { products } = storeToRefs(useProductsStore())
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
          <div class="categories-title">
            <Component :is="getIconComponent(category.icon)" />
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
