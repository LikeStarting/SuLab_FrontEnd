import type { Rule } from 'ant-design-vue/es/form'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  REGISTER_SUCCESS
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormRules(formData?: Record) {
  const getPasswordFormRule = computed(() => createRule('Please input the password!'))
  const getEmailVerificationCodeRule = computed(() => createRule('Please input the Verification Code!'))


  const validateUserName = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject('Please input user name or mobile number or email address!')
    } else {
      const nameRegex = /^[a-zA-Z0-9]+$/
      const phoneRegex = /^\d{10,11}$/
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (!(nameRegex.test(value) || phoneRegex.test(value) || emailRegex.test(value))) {
        return Promise.reject('The format is incorrect!')
      } else {
        return Promise.resolve(true)
      }
    }
  }

  const validateRegisterUserName = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject('Please input user name!')
    } else {
      const nameRegex = /^[a-zA-Z0-9]{6,32}$/
      if (!nameRegex.test(value)) {
        return Promise.reject('Username: 6-32 chars, letters & numbers only!')
      } else {
        return Promise.resolve(true)
      }
    }
  }

  const validateRegisterEmail = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject('Please input user name!')
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (!emailRegex.test(value)) {
        return Promise.reject('Please enter the correct email format!')
      } else {
        return Promise.resolve(true)
      }
    }
  }

  const validateVerificationCode = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject('Please input the Verification Code!')
    } else {
      const codeRegex = /^[a-zA-Z0-9]{4}$/
      if (!codeRegex.test(value)) {
        return Promise.reject('The format is incorrect!')
      } else {
        return Promise.resolve(true)
      }
    }
  }

  // const validatePolicy = async (value: any, _: Rule) => {
  //   return !value ? Promise.resolve('勾选后才能注册') : Promise.resolve(true)
  // }

  const validatePassword = async (_rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject('Please input the password!')
    } else {
      const passwordRegex = /^[a-zA-Z0-9]{6}$/
      if (!passwordRegex.test(value)) {
        return Promise.reject('Password: at least 6 chars, letters or numbers only!')
      } else {
        return Promise.resolve(true)
      }
    }
  }

  const validateConfirmPassword = (password: string) => {
    return async (_rule: Rule, value: string) => {
      if (!value) {
        return Promise.reject('Please enter your confirmation password!')
      }
      if (value !== password) {
        return Promise.reject('The passwords entered do not match!')
      }
      return Promise.resolve(true)
    }
  }

  const getFormRules = computed((): { [k: string]: Rule[] } => {
    // const usernameFormRule = unref(getUsernameFormRule)
    const passwordFormRule = unref(getPasswordFormRule)
    const emailVerificationCodeRule = unref(getEmailVerificationCodeRule)

    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          username: [
            { validator: validateRegisterUserName, trigger: 'change' }
          ],
          email: [
            { validator: validateRegisterEmail, trigger: 'change' }
          ],
          password: [
            { validator: validatePassword, trigger: 'change' }
          ],
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
          verificationCode: emailVerificationCodeRule
          // policy: [{ validator: validatePolicy, trigger: 'change' }]
        }

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          username: [
            { validator: validateUserName, trigger: 'change' }
          ],
        }

      // login form rules
      default:
        return {
          username: [
            { validator: validateUserName, trigger: 'change' }
          ],
          password: passwordFormRule,
          verificationCode: [
            { validator: validateVerificationCode, trigger: 'blur' }
          ],
        }
    }
  })
  return { getFormRules }
}

function createRule(message: string): Rule[] {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ]
}