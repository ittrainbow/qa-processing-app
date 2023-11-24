import { makeObservable, observable, action } from 'mobx'
import axios from 'axios'

import { TAuth, TToken, TUser } from '../types/types'
import { defaultUser } from '../types/initials'
import { appStore } from './appStore'

const { handleError, setLoading } = appStore

class UsersStoreClass {
  users: TUser[] = []
  user: TUser = defaultUser
  token: TToken = null

  constructor() {
    makeObservable(this, {
      users: observable,
      user: observable,
      token: observable,
      setUsers: action,
      setUser: action,
      setAuth: action,
      clearToken: action,
      signupUser: action,
      updateUser: action
    })
  }

  getUsers: () => void = async () => {
    setLoading(true)
    await axios
      .get('http://localhost:5000/api/user/getusers')
      .then((response) => response.data)
      .then((data) => this.setUsers(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  signupUser: (name: string, email: string, password: string) => void = async (name, email, password) => {
    setLoading(true)
    await axios
      .post('http://localhost:5000/api/user/signup', { name, email, password })
      .then((response) => response.data)
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  loginUser: (email: string, password: string) => void = async (email, password) => {
    setLoading(true)
    await axios
      .post('http://localhost:5000/api/user/login', { email, password })
      .then((response) => response.data)
      .then((data) => this.setAuth(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  authUser: (token: string) => void = async (token) => {
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
    await axios
      .get('http://localhost:5000/api/user/auth', { headers })
      .then((response) => response.data)
      .then((data) => this.setAuth(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  updateUser: (user: TUser, name: string) => void = async (user, name) => {
    const { id } = user
    setLoading(true)
    await axios
      .post('http://localhost:5000/api/user/update', { id, name })
      .then(() => this.setUser({ ...this.user, name }))
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

  clearToken = () => {
    this.token = null
    localStorage.removeItem('qaToken')
  }
}

export const usersStore = new UsersStoreClass()
