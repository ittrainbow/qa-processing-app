import { useEffect } from 'react'
import { observer } from 'mobx-react'

import { projectsStore, usersStore, ticketsStore } from './mobx'
import { Header } from './pages'

export const App = observer(() => {
  const { getTickets } = ticketsStore
  const { hasProjects } = projectsStore
  const { hasUsers } = usersStore

  const { pathname } = window.location

  useEffect(() => {
    if (pathname.includes('/projects/') && hasUsers) {
      const path: string =
        pathname
          .split('/')
          .filter((el: string) => el.length)
          .at(-1) || ''
      getTickets(path)
    } // eslint-disable-next-line
  }, [hasProjects, hasUsers])

  return <Header />
})
