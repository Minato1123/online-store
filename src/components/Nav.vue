<script setup lang="ts">
</script>

<template>
  <div class="nav-container">
    <a class="store-title" href="/">
      <img class="store-logo" src="../assets/images/pochacco-logo.png" alt="pochacco online store's logo">
      <div class="store-name">
        帕恰購物
      </div>
    </a>
    <div class="search-bar">
      <input type="text" placeholder="Search...">
      <button><icon-ic-baseline-search /></button>
    </div>
    <div class="nav-btns">
      <icon-mdi-bell-outline />
      <icon-teenyicons-user-circle-solid />
      <icon-ph-shopping-cart-simple-bold />
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-container {
  background-color: var(--main-color);
  height: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .store-title {
    display: flex;
    text-decoration: none;

    img {
      width: 3.2rem;

    }
    .store-name {
      margin-left: 0.6rem;
      color: var(--white-color);
      font-family: 'Noto Sans TC', sans-serif;
      font-weight: 500;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.search-bar {
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 30rem;
  height: 2rem;
  padding: 0.2rem 0.2rem 0.2rem 1rem;
  border-radius: 5rem;

  input {
    border: none;
    outline: none;
    height: 100%;
    flex-grow: 1;
  }

  button {
    background-color: var(--match-color);
    border: none;
    outline: none;
    width: 3rem;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 5rem 5rem 0;

    &:hover {
      background-color: var(--main-product-color);
    }

    .svg-icon {
      width: 1.5rem;
      height: 1.5rem;

    }
  }
}
.nav-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;

  .svg-icon:hover {
    cursor: pointer;
    color: var(--selected-color);
  }

}
.svg-icon {
  color: var(--white-color);
  width: 2rem;
  height: 2rem;
}
</style>
