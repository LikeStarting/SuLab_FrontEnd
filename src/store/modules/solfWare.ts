import { callAlgorithmApi, getAlgorithmFileExample, callAlgorithmWithSc, callAlgorithmWithSC } from '@/api/algorithm'
import { createStorage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { PREDICT_RESULTS, PREDICT_RESULTS_SC } from '@/store/mutation-types'
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

export interface PredictSCResult {
  Disease_Name: string
  Pred: number
  DrugB_Name: string
  DrugB_Svg: string
  Pred_Score: number
}

export  interface SCResults {
  Disease_Name: string
  Pred: number
  result: Array<PredictSCResult>
}

interface ISolfWareState {
  predictResults: Array<PredictResult>
}

interface ISolfWareSCState {
  predictSCResults: Array<SCResults>
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


export const useSolfWareSCStore = defineStore({
  id: 'app-algorithmSC',
  state: (): ISolfWareSCState => ({
    predictSCResults: []
  }),
  getters: {
    getPredictSCResults(): Array<SCResults> {
      if (this.predictSCResults.length !== 0) {
        return this.predictSCResults
      }
      return Storage.get(PREDICT_RESULTS_SC, '') || []
    }
  },
  actions: {
    setPredictSCResults(results: Array<SCResults> | []) {
      this.predictSCResults = results
      Storage.set(PREDICT_RESULTS_SC, results)
    },

    async GetAlgorithmResults(params: FormData) {
      return new Promise((resolve, reject) => {
        callAlgorithmWithSC(params)
          .then((res) => {
            const { data } = res
            console.log('data===', data)
            this.setPredictSCResults(data)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})