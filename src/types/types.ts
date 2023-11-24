import { SelectChangeEvent } from '@mui/material'

export type TTicket = {
  created: number
  createdAt?: number
  creator: string | number
  description: string
  id?: number
  issue: string
  problem: string
  projectid: string
  severity: string
  status: string
  solution: string
  updated: number
  updatedAt?: number
  updater: string | number
}

export type TProject = {
  id: number
  description: string
  name: string
  projectid: string
}

export type TUser = {
  id: number | null
  admin: boolean
  email: string
  name: string
}

export type TToken = string | null | undefined

export type TAuth = {
  user: TUser
  token: TToken
}

export type TTicketProps = {
  ticket: TTicket
  modalOpen: boolean
  creating: boolean
  onClose: () => void
  setTicket: React.Dispatch<React.SetStateAction<TTicket>>
}

export type TDropdownProps = {
  label: string
  onChange: (e: TChange) => void
  value: string
}

export type TInput = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

export type TChange = TInput | SelectChangeEvent

export type TGridItemProps = {
  ticket: TTicket
  filter: string
  onClick: (value: TTicket) => void
}

export type TList = Array<{ value: string; text: string }>

export type TAxiosError = {
  response: { data: string; status: number }
}
