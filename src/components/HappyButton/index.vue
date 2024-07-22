<template>
    <div :class="buttonClass">
        <span v-for="i in 15" :key="i" :class="`item item-${i}`">
            
        </span>
        <div class="text">{{ text }}</div>
        <div class="bg"></div>
    </div>
</template>


<script setup lang="ts">
    const props = defineProps<{
        text: string,
        className?: string
    }>()


    const text = computed(() => `${ props.text }`)
    const buttonClass = computed(() => {
        if (props.className) {
            return `happy-button ${ props.className }`
        }
        return 'happy-button'
    })
</script>


<style lang="scss" scoped>
.happy-button {
  display: flex;
  position: relative;
  background: linear-gradient(to bottom, $button, $shadow);
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #003366;
  cursor: pointer;
  .text {
    position: absolute;
    z-index: 1;
    top: -1px;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item {
    display: inline-block;
    position: relative;
    z-index: 2;
    flex-grow: 1;
  }
  .bg {
    position: absolute;
    top: -2px;
    left: -1px;
    height: 100%;
    width: calc(100% + 2px);
    background: $button;
  }
  &:hover {
    .text {
      top: 1px;
    }
    .bg {
      top: -1px;
    }
  }
  @for $i from 1 through $item {
    .item-#{$i}:hover {
      $skew: calc(($i - $item / 2) / $item * 3deg);
      ~ .bg, ~ .text {
        transform: skewY($skew);
      }
    }
  }
}
</style>