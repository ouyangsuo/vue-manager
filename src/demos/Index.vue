<template>
  <div>
    <h3 class="title">Demos</h3>

    <div class="tab-wrapper">
      <button class="tab" @click="$router.push('/demos/element')">
        ElementPlus
      </button>
      <button class="tab" @click="$router.push('/demos/vuex')">Vuex</button>
      <button class="tab">Demo3</button>
      <button class="tab">Demo4</button>
    </div>

    <div class="bordered-box">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@assets/variable.scss";
@import "@assets/mixin.scss";

.tab-wrapper {
  @include centeredFlexBox;
  padding: 2px 0;

  .tab {
    flex-grow: 1;
    height: 2rem;
    line-height: 1rem;
    color: $gray6;
    margin: 2px;
  }
}

// .container {
//     min-height: 20rem;
//     border: 1px solid $gray6;
//     padding: 2px;
//     border-radius: 2px;
// }
</style>
