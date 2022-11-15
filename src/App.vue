<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink class="tab" to="/">Home</RouterLink>
    <RouterLink class="tab" to="/about">About</RouterLink>
    <RouterLink class="tab" to="/demos/element">Demos</RouterLink>
  </nav>

  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  
</template>

<style lang="scss" scoped>
.tab {
  margin: 5px;
}
</style>
