<template>
  <a-card
    style="width: 100%"
    :tab-list="tabListNoTitle"
    :active-tab-key="tabKey"
    @tabChange="key => onTabChange(key)"
  >
    <a-form
      v-if="tabKey === 'wechat'"
      ref="formRef"
      :model="wechatLoginForm"
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
        <a-form-item v-if="curTabs === 'login'" class="mt-2" :data-delay="1">
          <a-empty>
            <template #description>
              <span>
                Under development...
              </span>
            </template>
          </a-empty>
        </a-form-item>
      </TransitionGroup>
    </a-form>

    <a-form
      v-else-if="tabKey === 'mobile'"
      ref="formRef"
      :model="userInfo"
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
        <a-form-item v-if="curTabs === 'login'" class="mt-2" :data-delay="1" :rules="[
            {
              required: true,
              message: 'User Name or Mobile Number or Email address',
              trigger: 'blur'
            }
          ]"
        >
          <a-input v-model="userInfo.username" placeholder="User Name or Mobile Number or Email address">
            <template #prefix>
              <SvgIcon iconName="icon-denglu-copy" className="icon-account"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item v-if="curTabs === 'login'" class="mt" :data-delay="2" :rules="[
            {
              required: true,
              message: 'Password',
              trigger: 'blur'
            }
          ]"
        >
          <a-input
            v-model="userInfo.password"
            placeholder="Password"
            type="password"
          >
            <template #prefix>
              <SvgIcon iconName="icon-mima1" className="icon-pwd" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-if="curTabs === 'login'" class="mt" :data-delay="2" :rules="[
            {
              required: true,
              message: 'Password',
              trigger: 'blur'
            }
          ]"
        >
          <a-input
            v-model="userInfo.verificationCode"
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

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="userInfo.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>
        <a-form-item v-if="curTabs === 'login'" :data-delay="3">
          <a-button type="primary" class="login-btn" size="large" >Login</a-button>
        </a-form-item>
      </TransitionGroup>
    </a-form>
    <!-- <p v-else>邮箱登录</p> -->
  </a-card>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { getVierificationCodeApi } from '@/api/user'

  const curTabs = ref<string>('login')

  const codeImgSrc = ref('')

  const wechatLoginForm = reactive({
    qr: ''
  })
  const userInfo = reactive({
    username: '',
    phone: '',
    email: '',
    password: '',
    code: '',
    verificationCode: '',
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

  const onTabChange = (value: string) => {
    console.log(value);
    tabKey.value = value;
  };


  const getVierificationCode = () => {
    getVierificationCodeApi({
    }).then((res) => {
      codeImgSrc.value = res.data;
      console.log('res--', res, codeImgSrc.value)
      // userInfo.UUID = x.uuid;
    });
  };
  getVierificationCode();

</script>


<style lang="scss" scoped>
  .ant-card {
    height: 460px;
    .login-btn {
      width: 100%;
    }
  }
  :global(.ant-card .ant-form-item-control-input-content) {
    text-align: center;

  }
    
  :global(.ant-card .ant-input-affix-wrapper) {
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 16px;
  }
  
  :global(.ant-card .ant-input-prefix) {
    color: #222;
  }

  :global(.ant-card .ant-card-body ) {
    margin-top: 20px;
  }
</style>