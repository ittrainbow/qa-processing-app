import { useState, useEffect } from 'react'
import { Button, OutlinedInput, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import { TInput } from '../../types/types'
import { usersStore } from '../../mobx'

export const Login = observer(() => {
  const { token, loginUser } = usersStore
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    token && navigate('/userpage') // eslint-disable-next-line
  }, [token])

  const emailInputHandler = (e: TInput) => {
    const { value } = e.target
    const checkEmailValid = /\S+@\S+\.\S+/.test(value)
    setEmail(value)
    setEmailValid(checkEmailValid)
  }

  const passwordInputHandler = (e: TInput) => {
    const { value } = e.target
    setPassword(value)
  }

  const loginHandler = () => loginUser(email, password)
  const toSignupHandler = () => navigate('/signup')
  const toResetHandler = () => navigate('/reset')

  const loginValid = emailValid && password.length

  return (
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={220} alignItems="center">
        <OutlinedInput type="text" value={email} onChange={emailInputHandler} placeholder={'E-mail'} />
        <OutlinedInput type="password" value={password} onChange={passwordInputHandler} placeholder={'Password'} />
        <Button variant="contained" fullWidth={true} disabled={!loginValid} onClick={loginHandler}>
          Login
        </Button>
        <Button variant="contained" fullWidth={true} onClick={toSignupHandler}>
          To Signup
        </Button>
        <Button variant="contained" fullWidth={true} onClick={toResetHandler}>
          Reset Password
        </Button>
      </Stack>
    </Stack>
  )
})
