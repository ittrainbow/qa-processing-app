import { useNavigate } from 'react-router-dom'
import * as Icons from 'react-icons/md'
import { observer } from 'mobx-react'

import { appStore, usersStore } from '../mobx'

export const Header = observer(() => {
  const { headerOpen, setHeaderOpen } = appStore
  const { token, logoutUser } = usersStore
  const navigate = useNavigate()

  const onClickHandler = (id: string): void => {
    setHeaderOpen(false)

    switch (id) {
      case 'toggler':
        !headerOpen && setHeaderOpen(true)
        break

      case 'userpage':
        token ? navigate('/userpage') : navigate('/login')
        break

      case 'projects':
        navigate('/projects')
        break

      case 'logout':
        logoutUser()
        break

      default:
        break
    }
  }

  const icons = [
    { id: 'toggler', icon: headerOpen ? <Icons.MdHighlightOff /> : <Icons.MdOpenWith /> },
    { id: 'userpage', icon: headerOpen ? <Icons.MdAccountCircle /> : null },
    { id: 'projects', icon: headerOpen ? <Icons.MdFormatListNumbered /> : null }
  ]

  const iconsAuth = [{ id: 'logout', icon: headerOpen ? <Icons.MdLogout /> : null }]

  const array = token ? icons.concat(iconsAuth) : icons

  return (
    <>
      <div className={headerOpen ? 'header header__show' : 'header'}></div>
      <div>
        {array.map((el, index) => {
          const { id, icon } = el
          return (
            <div
              key={id}
              id={id}
              style={{ left: `calc(5px + ${index * 60}px)` }}
              className="header__icon"
              onClick={() => onClickHandler(id)}
            >
              {icon}
            </div>
          )
        })}
      </div>
    </>
  )
})
