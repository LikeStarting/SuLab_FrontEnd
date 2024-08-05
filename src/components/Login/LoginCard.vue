<template>
  <a-card
    class="login-card"
    v-if="getShow"
    style="width: 100%"
    :tab-list="tabListNoTitle"
    :active-tab-key="tabKey"
    @tabChange="key => onTabChange(key)"
  >
    <div class="login-content">
      <a-form
        v-if="tabKey === 'wechat'"
        ref="formRef"
        :model="wechatLoginForm"
        label-width="0"
      >
        <a-form-item class="mt-2" :data-delay="1">
          <a-empty>
            <template #description>
              <span>
                Under development...
              </span>
            </template>
          </a-empty>
        </a-form-item>
      </a-form>

      <a-form
        v-else-if="tabKey === 'mobile'"
        ref="formRef"
        :model="userInfo"
        label-width="0"
        :rules="getFormRules"
      >
        <a-form-item class="mt-2" :data-delay="1" name="username"
        >
          <a-input v-model:value="userInfo.username" placeholder="User Name or Mobile Number or Email address">
            <template #prefix>
              <SvgIcon iconName="icon-denglu-copy" className="icon-account"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item class="mt" :data-delay="2" name="password"
        >
          <a-input
            v-model:value="userInfo.password"
            placeholder="Password"
            type="password"
          >
            <template #prefix>
              <SvgIcon iconName="icon-mima1" className="icon-pwd" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item class="mt" :data-delay="2" name="verificationCode"
        >
          <a-input
            v-model:value="userInfo.verificationCode"
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

        <a-form-item class="remember-box">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="userInfo.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="link-forgot" href="javascript:;">Forgot password</a>
        </a-form-item>
        <a-form-item :data-delay="3">
          <a-button type="primary" class="login-btn" size="large" :loading="isLoading" @click="onSubmit">Login</a-button>
        </a-form-item>

        <div class="bottom-box">
          Don't have account?
          <span @click="() => toggleModalTabs('register')">
            Sign Up!
          </span>
        </div>
      </a-form>
    </div>
    <!-- <p v-else>邮箱登录</p> -->
  </a-card>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { message } from 'ant-design-vue'
  import emitter from '@/utils/mitt'
  import { useRouter } from 'vue-router'
  import { getVierificationCodeApi } from '@/api/user'
  import { LoginStateEnum, useFormRules, useLoginState } from './userLogin'
  import { useUserStore } from '@/store/modules/user'

  const { setLoginState, getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()
  const userStore = useUserStore()

  const router = useRouter()
  const isLoading = ref(false)
  const formRef = ref();
  const codeImgSrc = ref('')
  const wechatLoginForm = reactive({
    qr: ''
  })
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
  const userInfo = reactive({
    username: '',
    password: '',
    verificationCode: '',
    uuid: '',
    remember: false
  })

  const tabListNoTitle = [
    {
      key: 'wechat',
      tab: 'Wechat',
    },
    {
      key: 'mobile',
      tab: 'Password Login',
    }
  ];

  // const key = ref('wechat');
  const tabKey = ref('mobile');

  const toggleModalTabs = (value: string) => {
    emitter.emit('change-title', 'Sign Up')
    setLoginState(LoginStateEnum.REGISTER)
  }

  const onTabChange = (value: string) => {
    tabKey.value = value;
  };

  const emit = defineEmits(['closeEvent'])

  const getVierificationCode = () => {
    getVierificationCodeApi({
    }).then((res) => {
      codeImgSrc.value = res.data;
      userInfo.uuid = res.uuid;
    });
  };
  getVierificationCode();

  const key = 'updatable';
  const onSubmit = () => {
    formRef.value
    ?.validate().then(async () => {
      try {
        isLoading.value = true;
        message.loading({ content: 'Logging in...', key });
        const { remember } = userInfo
        const data = await userStore.Login({
          userName: userInfo.username,
          password: userInfo.password,
          captcha: userInfo.verificationCode,
          uuid: userInfo.uuid
        }, remember)
        emit('closeEvent');
        isLoading.value = false;
        message.success({ content: 'Login successful!', key, duration: 2 });
        getVierificationCode();
        router.replace('/')
      } finally {

      } 
    }).catch(() => {
      isLoading.value = false;
      getVierificationCode();
      message.error({ content: 'Login Failed!', key, duration: 1 });
    })
  }

</script>


<style lang="scss" scoped>
  :global(.login-card) {
    margin-top: 20px;
    height: 470px;
    border: none;
    box-shadow: 0 2px 6px $theme-color;
  }
  :global(.ant-form-item.remember-box .ant-form-item-control-input-content) {
    display: flex;
    justify-content: space-between;
  }
  :global(.login-card .ant-form-item-control-input-content) {
    text-align: center;
  }
    
  :global(.login-card .ant-input-affix-wrapper) {
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 16px;
  }
  
  :global(.login-card .ant-input-prefix) {
    color: #222;
  }

  :global(.login-card .ant-input-suffix .code img) {
    cursor: pointer;
  }

  :global(.login-card .ant-card-body) {
    margin-top: 10px;
    cursor: context-menu !important;
  }

  .login-card {
    :deep(.ant-tabs) {
      line-height: 26px;
      .ant-tabs-tab {
        &.ant-tabs-tab-active {
          .ant-tabs-tab-btn {
            color: $active-color;
          }
        }
        &:hover {
          color: $active-color;
        }
      }
      .ant-tabs-ink-bar {
        background-color: $active-color;
      }
    }
  }


  .login-content {
    .ant-form {
      .ant-form-item {
        &.remember-box {
          :deep(.ant-checkbox-wrapper) {
            &:hover {
              .ant-checkbox-checked:after {
                border-color: $active-color;
              }
              .ant-checkbox-inner {
                border-color: $light-activate-color;
              }
            }
            .ant-checkbox {
              &.ant-checkbox-checked {
                .ant-checkbox-inner {
                  background-color: $active-color;
                  border-color: $active-color;
                }
              }
              &:hover {
                .ant-checkbox-inner {
                  border-color: $light-activate-color;
                }
              }
            }
          }
          .link-forgot {
            color: $active-color;
          }
        }
      }

    }
  } 
</style>