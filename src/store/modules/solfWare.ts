import { callAlgorithmApi, getAlgorithmFileExample } from '@/api/algorithm'
import { createStorage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { PREDICT_RESULTS } from '@/store/mutation-types'
import { callAlgorithmApi } from '@/api/algorithm'
import { useUserStore } from '@/store/modules/user'

const Storage = createStorage({ storage: localStorage })
const userStore = useUserStore()

export interface PredictResult {
  Cell_Name: string
  DrugA_Name: string
  DrugB_Name: string
  DrugA_Svg: string
  DrugB_Svg: string
  Pred_Score: number
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
        callAlgorithmApi(params)
          .then((res) => {
            const { data } = res
            this.setPredictResults(data)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})