import { CheckCircleOutline, NewReleases } from '@mui/icons-material'
import { Stack } from '@mui/material'

import { TTicket } from '../types/types'

export const iconHelper: (severity: string, status: string) => JSX.Element = (severity, status) => {
  const color = status === 'done' ? 'grey' : severity === 'high' ? 'red' : severity === 'avg' ? 'orange' : 'khaki'

  const icon = status === 'done' ? <CheckCircleOutline fontSize="large" /> : <NewReleases fontSize="large" />

  return <Stack color={color}>{icon}</Stack>
}

export const textHelper: (status: string) => string = (status) => {
  return status === 'totest' ? 'Ready for test' : status.charAt(0).toUpperCase() + status.substring(1)
}

export const sortHelper: (queue: TTicket[], style: string) => TTicket[] = (queue, style) => {
  const newTickets = [...queue].sort((a: TTicket, b: TTicket) => {
    switch (style) {
      case 'updateasc':
        return a.updated - b.updated
      case 'updatedesc':
        return b.updated - a.updated
      case 'createasc':
        return a.created - b.created
      case 'createdesc':
        return b.created - a.created
      default:
        return 0
    }
  })

  return newTickets
}
