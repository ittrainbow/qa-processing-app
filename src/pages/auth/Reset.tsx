import { useState } from 'react'
import { Button, Stack, OutlinedInput } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import { TInput } from '../../types/types'

export const Reset = observer(() => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)

  const emailInputHandler = (e: TInput) => {
    const { value } = e.target
    setEmail(value)
    const checkEmailValid = /\S+@\S+\.\S+/.test(value)
    setEmailValid(checkEmailValid)
  }

  const toSignupHandler = () => navigate('/signup')
  
  const toLogInHandler = () => navigate('/login')

  return (
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={220} alignItems="center">
        <OutlinedInput type="email" value={email} onChange={emailInputHandler} placeholder="E-mail" />
        <Button variant="contained" fullWidth={true} disabled={!emailValid} onClick={toSignupHandler}>
          Recover pwd
        </Button>
        <Button variant="contained" fullWidth={true} onClick={toSignupHandler}>
          To Signup
        </Button>
        <Button variant="contained" fullWidth={true} onClick={toLogInHandler}>
          To Login
        </Button>
      </Stack>
    </Stack>
  )
})
