import { useNavigate } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
import { observer } from 'mobx-react'

import { usersStore } from '../../mobx'

export const Dashboard = observer(() => {
  const { user, logoutUser } = usersStore
  const navigate = useNavigate()

  const profileNavigateHandler = () => navigate('/profile')

  const logoutHandler = () => logoutUser()

  return (
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={220} alignItems="center">
        <Stack>{user ? user.name : '...loading'}</Stack>
        <Stack>{user ? user.email : '...loading'}</Stack>
        <Button variant="contained" color="secondary" fullWidth={true} onClick={profileNavigateHandler}>
          Edit profile
        </Button>
        <Button variant="outlined" fullWidth={true} onClick={logoutHandler}>
          Log Out
        </Button>
      </Stack>
    </Stack>
  )
})
