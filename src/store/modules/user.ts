import { defineStore } from 'pinia'
import { createStorage } from '@/utils/storage'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { logout, getUserInfo, login } from '@/api/user'
// import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'

const Storage = createStorage({ storage: localStorage })

interface UserInfo {
  // userId: string | number
  username: string
  avatar: string
}

interface IUserState {
  token?: string
  userInfo: Nullable<UserInfo>
  lastUpdateTime: number
}

interface LoginParams {
  userName: string
  password: string
  captcha: string
  uuid: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || Storage.get(CURRENT_USER, '') || {}
    },
    getToken(): string {
      return this.token || Storage.get(ACCESS_TOKEN, '')
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      Storage.set(ACCESS_TOKEN, token)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      Storage.set(CURRENT_USER, info)
    },

    async Login(params: LoginParams) {
      try {
        const response = await login(params)
        const { token } = response
        this.setToken(token)
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo({
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjA3OTM5OTEsIjQxIjoiU2ltcGxlWHUifQ.Mv-6_nqHfTKEeKmEqzR3Bqc8yCh30Q4JM0gSAVM8qlM'
        })
          .then((res) => {
            this.setUserInfo(res)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    async Logout() {
      if (this.getToken) {
        try {
          await logout()
        } finally {
          
        }
      }

      this.setToken(undefined)
      this.setUserInfo(null)
      Storage.remove(ACCESS_TOKEN)
      Storage.remove(CURRENT_USER)
      // router.push(PageEnum.BASE_LOGIN)
      location.reload()
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}