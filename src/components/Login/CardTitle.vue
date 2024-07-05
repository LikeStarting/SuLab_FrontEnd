<template>
  <div class="title-card">
    <h2>
      {{ title }}
    </h2>
  </div>
</template>

<script setup>
  import emitter from '@/utils/mitt'

  const title = ref('Log In')
  emitter.on('change-title', (value) => {
    title.value = value
  })
</script>



<style lang="scss" scoped>

.title-card {
  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 30px;
  }
}
</style>