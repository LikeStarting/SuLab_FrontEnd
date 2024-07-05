<template>
  <a-form
    class="register-form"
    v-if="getShow" 
    ref="formRef"
    :model="registerForm"
    label-width="0"
  >
    <TransitionGroup
      appear
      mode="out-in"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <a-form-item class="mt-2" :data-delay="1" :rules="[
          {
            required: true,
            message: 'User Name or Mobile Number or Email address',
            trigger: 'blur'
          }
        ]"
      >
        <a-input v-model="registerForm.username" placeholder="User Name or Mobile Number or Email address">
          <template #prefix>
            <SvgIcon iconName="icon-denglu-copy" className="icon-account"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item class="mt" :data-delay="2" :rules="[
          {
            required: true,
            message: 'Password',
            trigger: 'blur'
          }
        ]"
      >
        <a-input
          v-model="registerForm.password"
          placeholder="Password"
          type="password"
        >
          <template #prefix>
            <SvgIcon iconName="icon-mima1" className="icon-pwd" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="mt" :data-delay="2" :rules="[
          {
            required: true,
            message: 'Password',
            trigger: 'blur'
          }
        ]"
      >
        <a-input
          v-model="registerForm.verificationCode"
          placeholder="Verification Code"
          type="text"
        >
          <template #prefix>
            <SvgIcon iconName="icon-yanzhengma" className="icon-code" />
          </template>

          <template #suffix>
            <div class="code" @click="getVierificationCode">
              <img v-show="codeImgSrc != ''" :src="codeImgSrc" />
            </div>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item :data-delay="3">
        <a-button type="primary" class="register-btn" size="large" >Sign Up</a-button>
      </a-form-item>

      <div class="bottom-box">
        Already have an account?
        <span @click="() => toggleModalTabs('register')">
          Login!
        </span>
      </div>
    </TransitionGroup>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import emitter from '@/utils/mitt'
  import { getVierificationCodeApi } from '@/api/user'

  import { LoginStateEnum, useFormRules, useLoginState } from './userLogin'

  // const { handleBackLogin, getLoginState } = useLoginState()
  const { setLoginState, handleBackLogin, getLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

  const codeImgSrc = ref('')
  const registerForm = reactive({
    username: '',
    phone: '',
    email: '',
    password: '',
    code: '',
    verificationCode: '',
  })

  const toggleModalTabs = (value: string) => {
    emitter.emit('change-title', 'Log In')
    setLoginState(LoginStateEnum.LOGIN)
  }


  const getVierificationCode = () => {
    getVierificationCodeApi({
    }).then((res) => {
      codeImgSrc.value = res.data;
      // userInfo.UUID = x.uuid;
    });
  };
  getVierificationCode();

</script>


<style lang="scss" scoped>


  :global(.register-form) {
    height: 460px;

  }
  :global(.ant-form-item.remember-box .ant-form-item-control-input-content) {
    display: flex;
    justify-content: space-between;
  }
  :global(.register-form .ant-form-item-control-input-content) {
    text-align: center;

  }
    
  :global(.register-form .ant-input-affix-wrapper) {
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 16px;
  }
  
  :global(.register-form .ant-input-prefix) {
    color: #222;
  }

  .register-form {
    .register-btn {
      width: 100%;
    }
    .bottom-box {
      text-align: center;
      span {
        cursor: pointer;
        color: $theme-color;
      }
    }
  } 
</style>