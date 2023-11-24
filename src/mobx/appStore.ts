import { makeObservable, observable, action } from 'mobx'

import { TAxiosError } from '../types/types'

export class AppStoreClass {
  headerOpen: boolean = true
  loading: boolean = true

  constructor() {
    makeObservable(this, {
      headerOpen: observable,
      setHeaderOpen: action,
      loading: observable,
      setLoading: action,
      handleError: action
    })
  }

  setHeaderOpen: (value: boolean) => void = (value) => (this.headerOpen = value)

  setLoading: (value: boolean) => void = (value) => (this.loading = value)

  handleError = (error: TAxiosError) => {
    console.error(error)
    const { data, status } = error.response
    alert(`Error: ${data} (status code ${status})`)
  }
}

export const appStore = new AppStoreClass()
