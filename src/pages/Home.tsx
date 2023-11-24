import { observer } from 'mobx-react'

import { ProjectsList, Login } from '.'
import { usersStore } from '../mobx'

export const Home = observer(() => {
  const { token } = usersStore

  return token ? <ProjectsList /> : <Login />
})
