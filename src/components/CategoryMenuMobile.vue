<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { useCategoriesStore } from '@/stores/category'

defineProps({
  isOpenCategoryMenu: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['closeCategoryMenu'])

function closeCategoryMenu() {
  emit('closeCategoryMenu')
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    closeCategoryMenu()
}, false)

const { categories } = storeToRefs(useCategoriesStore())
</script>

<template>
  <Teleport to="body">
    <div
      class="mask" :class="{
        'invisible-mask': !isOpenCategoryMenu,
      }"
    >
      <OnClickOutside
        class="category-menu-block" :class="{
          'visible-menu': isOpenCategoryMenu,
          'invisible-menu': !isOpenCategoryMenu,
        }" @trigger="closeCategoryMenu"
      >
        <ul v-for="(category, i) in categories" :key="`category-${i}`" class="category-menu-ul">
          <RouterLink
            :to="{
              name: 'categories',
              params: {
                categoryId: category.id,
              },
            }" class="category-btn" @click="$emit('closeCategoryMenu')"
          >
            <li>{{ category.name }}</li>
          </RouterLink>
          <div class="subcategory-btns">
            <RouterLink
              v-for="(subcategory, j) in category.subCategories" :key="`category-${i}-subcategory-${j}`" :to="{
                name: 'subCategories',
                params: {
                  categoryId: category.id,
                  subCategoryId: subcategory.id,
                },
              }" class="subcategory-btn" @click="$emit('closeCategoryMenu')"
            >
              <li>
                {{ subcategory.name }}
              </li>
            </RouterLink>
          </div>
        </ul>
      </OnClickOutside>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 1;

  &.invisible-mask {
    visibility: hidden;
  }

}
  .category-menu-block {
    width: 100%;
    height: 24rem;
    overflow-y: auto;
    background-color: rgba($color: #fff, $alpha: 0.95);
    position: fixed;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    padding: 1rem;
    border-bottom: 0.1rem solid var(--main-product-color);

    &.visible-menu {
      transform: translateY(0%);
      transition: all 0.3s ease 0s;
    }

    &.invisible-menu {
      visibility: hidden;
      transform: translateY(-100%);
      transition: all 0.3s ease 0s;
    }

    .category-menu-ul {
      display: flex;
      width: 100%;
      gap: 2%;
      padding-bottom: 1rem;
      border-bottom: 0.05rem solid var(--text-color);

      .category-btn {
        width: 40%;
        display: flex;
        align-items: flex-start;
      }

      .subcategory-btns {
        width: 58%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

    }
  }

  ul, li {
    list-style-type: none;
    padding-left: 0;
    color: var(--text-color);
  }

  a {
    transition: all 0.3s;
    text-decoration: none;

    :hover {
      color: var(--main-product-color);
    }
  }
  @media screen and (min-width: 1160px) {
    .mask {
      display: none;
    }
  }

    @media screen and (max-width: 1161px) {
      .mask {
        display: block;
      }
    }

  @media screen and (min-width: 1091px) {
    .mask {
      top: 5rem;
    }
  }
  @media screen and (max-width: 1090px) {

  .mask {
    top: 3rem;
  }
  }
</style>
