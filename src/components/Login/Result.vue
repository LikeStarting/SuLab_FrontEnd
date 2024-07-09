<template>
  <a-result
    class="result-box"
    v-if="getShow"
    status="success"
    :title="props.title"
  >
    <template #extra>
      <a-button class="result-btn" size="large" type="primary" @click="handleLogin">Go Login!</a-button>
    </template>
  </a-result>
</template>


<script lang="ts" setup>

  import { defineProps } from 'vue'
  import emitter from '@/utils/mitt'
  import { LoginStateEnum, useLoginState } from './userLogin'
  const { setLoginState, getLoginState } = useLoginState()

  const props = defineProps({
      title: String
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER_SUCCESS)
  const handleLogin = () => {
    emitter.emit('change-title', 'Log In')
    setLoginState(LoginStateEnum.LOGIN)
  }

</script>

<style lang="scss" scoped>
:global(.ant-result.result-box) {
  padding-bottom: 10px;
}
:global(.ant-result.result-box .ant-result-extra) {
  margin-top: 30px;
}
:global(.ant-result.result-box .ant-btn.result-btn) {
  width: 100%;
}
</style>