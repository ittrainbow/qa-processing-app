import { useNavigate } from 'react-router-dom'
import * as Icons from 'react-icons/md'
import { observer } from 'mobx-react'

import { appStore, usersStore } from '../mobx'

export const Header = observer(() => {
  const { headerOpen, setHeaderOpen } = appStore
  const { token } = usersStore
  const navigate = useNavigate()

  const onClickHandler = (e: HTMLDivElement) => {
    setHeaderOpen(false)

    switch (e.id) {
      case 'toggler':
        return !headerOpen && setHeaderOpen(true)

      case 'userpage':
        return token ? navigate('/userpage') : navigate('/login')

      case 'projects':
        return navigate('/projects')

      default:
        return
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
    <div>
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
              onClick={(e) => onClickHandler(e.currentTarget)}
            >
              {icon}
            </div>
          )
        })}
      </div>
    </div>
  )
})
