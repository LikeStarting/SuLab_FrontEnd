<template>
  <div v-bind:class="['title-card', { 'login-bg': isLogin }]">
    <h2>
      {{ title }}
    </h2>
  </div>
</template>

<script setup>
  import emitter from '@/utils/mitt'
  import { LoginStateEnum, useLoginState } from './userLogin'
  const { getLoginState } = useLoginState()

  const isLogin = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  const title = ref('Log In')
  emitter.on('change-title', (value) => {
    title.value = value
  })
</script>



<style lang="scss" scoped>

.title-card {
  border-radius: 8px;
  background: url(../../assets/images/login-bg2.png) no-repeat center / cover;
  &.login-bg {
    background: url(../../assets/images/login-bg1.png) no-repeat center / cover;
  }
  h2 {
    margin-bottom: 0;
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    font-family:  'Helvetica', 'Roboto', sans-serif;
    line-height: 70px;
    color: #548DD4;
  }
}
</style>