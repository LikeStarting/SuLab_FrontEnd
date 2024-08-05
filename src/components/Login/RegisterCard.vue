<template>
  <a-form
    class="register-form"
    v-if="getShow" 
    ref="formRef"
    :model="registerForm"
    label-width="0"
    :rules="getFormRules"
  >
    <a-form-item  :data-delay="1" name="username"> 
      <a-input v-model:value="registerForm.username" placeholder="Your User Name">
        <template #prefix>
          <SvgIcon iconName="icon-denglu-copy" className="icon-account"/>
        </template>
      </a-input>
    </a-form-item>

    <a-form-item :data-delay="2" name="password">
      <a-input-password
        v-model:value="registerForm.password"
        placeholder="Password"
        type="password"
      >
        <template #prefix>
          <SvgIcon iconName="icon-mima1" className="icon-pwd" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item :data-delay="3" name="confirmPassword">
      <a-input-password
        v-model:value="registerForm.confirmPassword"
        placeholder="Enter your password again"
        type="password"
      >
        <template #prefix>
          <SvgIcon iconName="icon-mima1" className="icon-pwd" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item :data-delay="1" name="email">
      <a-input v-model:value="registerForm.email" @change="handleChangeEmail" placeholder="Your Email address">
        <template #prefix>
          <SvgIcon iconName="icon-message" className="icon-email"/>
        </template>
      </a-input>
    </a-form-item>

    <a-form-item class="key-input-wrapper" :data-delay="4" name="verificationCode">
      <a-input
        class="key-input"
        v-model:value="registerForm.verificationCode"
        placeholder="Verification Code"
        type="text"
      >
        <template #prefix>
          <SvgIcon iconName="icon-miyue" className="icon-code" />
        </template>
      </a-input>
      <div class="code">
        <a-button type="primary" class="key-btn" size="large" :disabled="isDisable" @click="onGetCode">
          <span v-if="!isSendingCode">Send verification email</span>
          <span v-else>
            Obtain after {{ timeCount }} seconds
          </span>
        </a-button>
      </div>
    </a-form-item>
    <a-form-item :data-delay="3">
      <a-button type="primary" class="login-btn" size="large" :loading="isLoading" @click="onSubmit">Sign Up</a-button>
    </a-form-item>

    <div class="bottom-box">
      Already have an account?
      <span @click="() => toggleModalTabs('register')">
        Login!
      </span>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { message } from 'ant-design-vue'
  import emitter from '@/utils/mitt'
  import { getEmailCaptcha, register } from '@/api/user'
  import { LoginStateEnum, useFormRules, useLoginState } from './userLogin'

  const { setLoginState, handleBackLogin, getLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

  const formRef = ref();
  const isLoading = ref(false)
  const isSendingCode = ref(false)
  const isDisable = ref(true)
  const timeCount = ref(60)
  const timer = ref()

  const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    uuid: ''
  })
  const { getFormRules } = useFormRules(registerForm)

  const toggleModalTabs = (value: string) => {
    emitter.emit('change-title', 'Log In')
    setLoginState(LoginStateEnum.LOGIN)
  }

  const handleChangeEmail = async () => {
    formRef.value.validateFields(['email']).then(() => {
      isDisable.value = false
    }).catch(() => {
      isDisable.value = true
    })
  }

  const onGetCode = () => {
    getEmailCaptcha({
      userEmail: registerForm.email
    }).then((res) => {
      registerForm.uuid = res.uuid
      message.success('Send successfully!')
    })

    isSendingCode.value = true
    isDisable.value = true

    timer.value = setInterval(() => {
      if (timeCount.value > 0) {
        timeCount.value--
      } else {
        clearInterval(timer.value)
        timeCount.value = 60
        isSendingCode.value = false
        isDisable.value = false
      }
    }, 1000)
  }

  const key = 'updatable';
  const onSubmit = () => {
    formRef.value
    ?.validate().then(async () => {
      try {
        isLoading.value = true;
        message.loading({ content: 'Registering...', key });
        const { data } = await register({
          userName: registerForm.username,
          userEmail: registerForm.email,
          password: registerForm.password,
          captcha: registerForm.verificationCode,
          uuid: registerForm.uuid
        })
        setLoginState(LoginStateEnum.REGISTER_SUCCESS)
        message.success({ content: 'Register successfully!', key, duration: 2 })
        isLoading.value = false
      } finally {
        isLoading.value = false
      }

    }).catch((e) => {
      message.error({ content: 'Register failed!', key })
    })
  }
</script>


<style lang="scss" scoped>
  :global(.register-form) {
    margin-top: 20px;
    height: 470px;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 6px $theme-color;
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

  :global(.register-form .key-input-wrapper .ant-form-item-control-input-content) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :global(.register-form .key-input-wrapper .ant-form-item-control-input-content .key-input) {
    width: 40%;
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