import { useState, useEffect } from 'react'
import { Button, OutlinedInput, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import { usersStore } from '../../mobx'

export const Profile = observer(() => {
  const navigate = useNavigate()
  const { user, token, updateUser } = usersStore
  const [tempName, setTempName] = useState<string>('')

  useEffect(() => {
    token && setTempName(user.name) // eslint-disable-next-line
  }, [token])

  const submitHandler = () => updateUser(user, tempName)

  const cancelHandler = () => navigate(-1)

  const changes = token && tempName !== '' && user.name !== tempName

  return (
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={220} alignItems="center">
        <Stack>{user ? user.name : '...loading'}</Stack>
        <OutlinedInput
          sx={{ height: '40px' }}
          type={'text'}
          onChange={(e) => setTempName(e.target.value)}
          value={tempName}
        />
        <Button variant="contained" color="secondary" fullWidth={true} disabled={!changes} onClick={submitHandler}>
          Save
        </Button>
        <Button variant="outlined" fullWidth={true} onClick={cancelHandler}>
          {changes ? 'Discard' : 'Back'}
        </Button>
      </Stack>
    </Stack>
  )
})
