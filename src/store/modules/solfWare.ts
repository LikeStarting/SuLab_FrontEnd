import { callAlgorithmApi, getAlgorithmFileExample } from '@/api/algorithm'
import { createStorage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { PREDICT_RESULTS } from '@/store/mutation-types'
import { callAlgorithmApi } from '@/api/algorithm'
import { useUserStore } from '@/store/modules/user'

const Storage = createStorage({ storage: localStorage })
const userStore = useUserStore()

interface PredictResult {
  cell_name: String
  drua_name: string
  drub_name: string
  druga_svg_list: string
  drugb_svg_list: string
  pred_score: number
}

interface ISolfWareState {
  predictResults: Array<PredictResult>
}

export const useSolfWareStore = defineStore({
  id: 'app-algorithm',
  state: (): ISolfWareState => ({
    predictResults: []
  }),
  getters: {
    getPredictResults(): Array<PredictResult> {
      if (this.predictResults.length !== 0) {
        return this.predictResults
      }
      return Storage.get(PREDICT_RESULTS, '') || []
    }
  },
  actions: {
    setPredictResults(results: Array<PredictResult> | []) {
      this.predictResults = results
      Storage.set(PREDICT_RESULTS, results)
    },

    async GetAlgorithmResults(params: FormData) {
      return new Promise((resolve, reject) => {
        callAlgorithmApi(params, userStore.getToken)
          .then((res) => {
            this.setPredictResults(res)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // async GetAlgorithmResults(params: FormData) {
    //   try {
    //     const response = await callAlgorithmApi(params, userStore.getToken)
    //     console.log('response==', response)
    //     this.setPredictResults(response)
    //     return Promise.resolve(response)
    //   }
    //   catch (error) {
    //     return Promise.reject(error)
    //   }
    // },
  },
})