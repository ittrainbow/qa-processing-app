import { useEffect, useState } from 'react'
import { Button, Stack, OutlinedInput } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import { TInput } from '../../types/types'
import { usersStore } from '../../mobx'

export const Signup = observer(() => {
  const navigate = useNavigate()
  const { signupUser, token } = usersStore
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    token && navigate('/projects') // eslint-disable-next-line
  }, [token])

  const nameInputHandler = (e: TInput) => {
    const { value } = e.target
    setName(value)
  }

  const emailInputHandler = (e: TInput) => {
    const { value } = e.target
    setEmail(value)
    const checkEmailValid = /\S+@\S+\.\S+/.test(value)
    setEmailValid(checkEmailValid)
  }

  const passwordInputHandler = (e: TInput) => {
    const { value } = e.target
    setPassword(value)
  }

  const signupHandler = () => signupUser(name, email, password)

  const toLoginHandler = () => navigate('/login')
  
  const toResetHandler = () => navigate('/reset')

  const registerValid = emailValid && name.length && password.length

  return (
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={220} alignItems="center">
        <OutlinedInput type="text" value={name} onChange={nameInputHandler} placeholder="Name" />
        <OutlinedInput type="email" value={email} onChange={emailInputHandler} placeholder="E-mail" />
        <OutlinedInput type="password" value={password} onChange={passwordInputHandler} placeholder="Password" />
        <Button variant="contained" fullWidth={true} disabled={!registerValid} onClick={signupHandler}>
          Signup
        </Button>
        <Button variant="contained" fullWidth={true} onClick={toLoginHandler}>
          To Login
        </Button>
        <Button variant="contained" fullWidth={true} onClick={toResetHandler}>
          Reset password
        </Button>
      </Stack>
    </Stack>
  )
})
