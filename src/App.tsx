import { useEffect } from 'react'
import { runInAction, toJS } from 'mobx'
import { observer } from 'mobx-react'

import { projectsStore, usersStore, appStore, ticketsStore } from './mobx'
import { Header } from './pages'

export const App = observer(() => {
  const { projects, getProjects } = projectsStore
  const { users, getUsers, authUser } = usersStore
  const { getTickets } = ticketsStore
  const { setLoading } = appStore

  const { pathname } = window.location

  useEffect(() => {
    runInAction(() => getProjects())
    runInAction(() => getUsers()) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('qaToken')
    token && authUser(token) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (pathname === '/' || pathname === '/projects') {
      toJS(projects).length && setLoading(false)
    } else if (pathname.includes('/projects/') && toJS(users).length) {
      const path: string =
        pathname
          .split('/')
          .filter((el: string) => el.length)
          .at(-1) || ''
      getTickets(path)
    } // eslint-disable-next-line
  }, [projects, users])

  return <Header />
})
