import { makeObservable, observable, action, autorun } from 'mobx'
import axios from 'axios'

import { TAuth, TToken, TUser } from '../types/types'
import { defaultUser } from '../types/initials'
import { appStore } from './appStore'
import { nodeserver } from '../url'

const { handleError, setLoading } = appStore

class UsersStoreClass {
  users: TUser[] = []
  user: TUser = defaultUser
  token: TToken = null
  init: boolean = true

  constructor() {
    makeObservable(this, {
      users: observable,
      user: observable,
      token: observable,
      init: observable,
      setUsers: action,
      setUser: action,
      setAuth: action,
      setAuthFinally: action,
      clearToken: action,
      signupUser: action,
      updateUser: action
    })
    autorun(() => this.getUsers())
    autorun(() => this.authUser())
  }

  get hasUsers() {
    return !!this.users.length
  }

  getUsers: () => void = async () => {
    setLoading(true)
    await axios
      .get(`${nodeserver}/api/users/getall`)
      .then((response) => response.data)
      .then((data) => this.setUsers(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  signupUser: (name: string, email: string, password: string) => void = async (name, email, password) => {
    const url = `${nodeserver}/api/users/signup`
    setLoading(true)
    await axios
      .post(url, { name, email, password })
      .then((response) => response.data)
      .then((data) => this.setAuth(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  loginUser: (email: string, password: string) => void = async (email, password) => {
    setLoading(true)
    await axios
      .post(`${nodeserver}/api/users/login`, { email, password })
      .then((response) => response.data)
      .then((data) => this.setAuth(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  authUser: () => void = async () => {
    setLoading(true)
    const token: string | null = localStorage.getItem('qaToken')
    if (!token) return this.setAuthFinally()
    await axios
      .get(`${nodeserver}/api/users/auth`, {
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${token}`
        }
      })
      .then((response) => response.data)
      .then((data) => this.setAuth(data))
      .catch((error) => handleError(error))
      .finally(this.setAuthFinally)
  }

  updateUser: (user: TUser, name: string) => void = async (user, name) => {
    const { id } = user

    setLoading(true)
    await axios
      .post(`${nodeserver}/api/users/update`, { id, name })
      .then(() => {
        this.setUser({ ...this.user, name })
        this.setUsers(this.users.map((user) => (user.id === id ? { ...user, name } : user)))
      })
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  setUsers = (users: TUser[]) => {
    this.users = users
  }

  setUser = (user: TUser) => (this.user = user)

  logoutUser = () => {
    this.setUser(defaultUser)
    this.clearToken()
  }

  setAuth = ({ user, token }: TAuth) => {
    this.user = user
    if (token) {
      localStorage.setItem('qaToken', token)
      this.token = token
    }
  }

  setAuthFinally = () => {
    setLoading(false)
    this.init = false
  }

  clearToken = () => {
    localStorage.removeItem('qaToken')
    this.token = null
  }
}

export const usersStore = new UsersStoreClass()
