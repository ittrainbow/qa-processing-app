import { observer } from 'mobx-react'

import { usersStore } from '../../mobx'
import { Login, Dashboard } from '..'

export const UserPage = observer(() => {
  const { token } = usersStore
  return token ? <Dashboard /> : <Login />
})
