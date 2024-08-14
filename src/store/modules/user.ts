import { defineStore } from 'pinia'
import { createStorage } from '@/utils/storage'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { logout, getUserInfo, login } from '@/api/user'
// import { PageEnum } from '@/enums/pageEnum'

const Storage = createStorage({ storage: localStorage })

interface UserInfo {
  // userId: string | number
  userName: string
  avatar: string
}

interface IUserState {
  token?: string
  userInfo: UserInfo | null
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
      return this.userInfo || Storage.get(CURRENT_USER, null) || Storage.getSession(CURRENT_USER, null) ||  null
    },
    getToken(): string {
      return this.token || Storage.get(ACCESS_TOKEN, '') || Storage.getSession(ACCESS_TOKEN, '')
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(token: string | undefined, expire: string, remember: boolean) {
      this.token = token || ''
      if (remember) {
        Storage.set(ACCESS_TOKEN, token, expire)
      } else {
        Storage.setSession(ACCESS_TOKEN, token, expire)
      }
    },
    setUserInfo(info: UserInfo | null, expire: string, remember: boolean) {
      this.userInfo = info || null
      this.lastUpdateTime = new Date().getTime()

      if (remember) {
        Storage.set(CURRENT_USER, info, expire)
      } else {
        Storage.setSession(CURRENT_USER, info, expire)
      }
    },

    removeUserInfo() {
      this.userInfo = null
      Storage.remove(CURRENT_USER)
      Storage.removeSession(CURRENT_USER)
    },

    async Login(params: LoginParams, remember: boolean) {
      try {
        const response = await login(params)
        const { token, expire } = response
        this.setToken(token, expire, remember)
        await this.GetUserInfo(expire, remember)
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async GetUserInfo(expire: string, remember: boolean) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            this.setUserInfo(res, expire, remember)
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
          const response = await logout()

          this.token = ''
          this.userInfo = null
          Storage.remove(ACCESS_TOKEN)
          Storage.removeSession(ACCESS_TOKEN)
          this.removeUserInfo()
          // location.reload()
          return Promise.resolve(response)
        } catch(error) {
          return Promise.reject(error)
        }
      }

      
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}