<script setup lang="ts">

</script>

<template>
  <RouterView></RouterView>
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade">
        <component :is="Component" />
      </transition>
  </router-view> -->
</template>

<style lang="scss">
@import './styles/index.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
 
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
