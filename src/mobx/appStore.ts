import { makeObservable, observable, action } from 'mobx'

import { TAxiosError } from '../types/types'

export class AppStoreClass {
  headerOpen: boolean = true
  loading: boolean = true

  constructor() {
    makeObservable(this, {
      headerOpen: observable,
      loading: observable,
      setHeaderOpen: action,
      setLoading: action,
      handleError: action
    })
  }

  setHeaderOpen: (value: boolean) => void = (value) => (this.headerOpen = value)

  setLoading: (value: boolean) => void = (value) => (this.loading = value)

  handleError = (error: TAxiosError) =>
    console.error(`ERROR: ${error?.response?.data} (status code ${error?.response?.status})`)
}

export const appStore = new AppStoreClass()
