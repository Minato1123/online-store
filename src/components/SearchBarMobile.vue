<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import type { PropType } from 'vue'
import router from '@/router'

const props = defineProps({
  isOpenSearchBar: {
    type: Boolean,
    required: true,
  },
  searchBtnEl: {
    type: Object as PropType<HTMLElement | null>,
    required: true,
  },
})

const emit = defineEmits(['closeSearchBar'])

function closeSearchBar(event: MouseEvent) {
  if (props.searchBtnEl != null && props.searchBtnEl.contains(event.target as Node))
    return
  emit('closeSearchBar')
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape')
    emit('closeSearchBar')
}, false)

const searchText = ref<string>('')
function handleSearch() {
  router.push({ name: 'search', query: { keyword: searchText.value } })
}
</script>

<template>
  <OnClickOutside
    class="search-bar-block" :class="{
      'visible-menu': isOpenSearchBar,
      'invisible-menu': !isOpenSearchBar,
    }" @trigger="closeSearchBar"
  >
    <div class="search-bar">
      <input v-model="searchText" type="text" placeholder="Search" @keyup.enter="handleSearch">
      <button @click="handleSearch">
        搜尋
      </button>
    </div>
  </OnClickOutside>
</template>

<style scoped lang="scss">
.search-bar-block {
  width: 40%;
  overflow-y: auto;
  background-color: rgba($color: #fff, $alpha: 0.95);
  position: absolute;
  left: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--main-color);
  box-shadow: 0.5px 0.5px 0.2px 0 rgba(0, 0, 0, 0.5);

  &.visible-menu {
    transform: translateY(0%);
    transition: all 0.3s ease 0s;
  }

  &.invisible-menu {
    visibility: hidden;
    transform: translateY(-100%);
    transition: all 0.3s ease 0s;
  }

  .search-bar {
    width: 100%;
    display: flex;
    align-items: center;

    input {
      width: 80%;
      height: 1.5rem;
      outline: none;
      border: 0.1rem solid var(--main-color);
      padding-left: 0.3rem;
    }
    button {
      width: 20%;
      height: 1.85rem;
      background-color: var(--main-color);
      outline: none;
      border: none;
      color: var(--white-color);

      &:hover {
        cursor: pointer;
      }
    }
  }
}

@media screen and (min-width: 1091px) {
  .search-bar-block {
    display: none;
  }
}
@media screen and (max-width: 1090px) {

  .search-bar-block {
    display: block;
    top: 3rem;
  }
}

@media screen and (max-width: 790px) {
  .search-bar-block {
    width: 60%;
  }
}

@media screen and (max-width: 480px) {
  .search-bar-block {
    width: 80%;
  }
}
</style>
